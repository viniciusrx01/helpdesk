document.addEventListener('DOMContentLoaded', function() {
    // Inicializa Select2
    $('#ticketCategory, #ticketPriority, #ticketClient').select2({
        width: '100%'
    });
    
    // Manipulação de arquivos
    const fileInput = document.getElementById('ticketAttachments');
    const filePreview = document.getElementById('filePreview');
    
    fileInput.addEventListener('change', function() {
        filePreview.innerHTML = '';
        
        if (this.files.length > 0) {
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                const fileItem = document.createElement('div');
                fileItem.className = 'file-preview-item';
                
                fileItem.innerHTML = `
                    <i class="fas fa-file"></i>
                    <span>${file.name}</span>
                    <button type="button" data-index="${i}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                filePreview.appendChild(fileItem);
            }
        }
    });
    
    // Remover arquivo da pré-visualização
    filePreview.addEventListener('click', function(e) {
        if (e.target.closest('button')) {
            const index = parseInt(e.target.closest('button').dataset.index);
            const files = Array.from(fileInput.files);
            files.splice(index, 1);
            
            // Atualiza o input de arquivos
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            fileInput.files = dataTransfer.files;
            
            // Dispara o evento change para atualizar a pré-visualização
            fileInput.dispatchEvent(new Event('change'));
        }
    });
    
    // Cancelar
    document.getElementById('cancelBtn').addEventListener('click', function() {
        if (confirm('Tem certeza que deseja cancelar? As informações não salvas serão perdidas.')) {
            window.location.href = 'chamados.html';
        }
    });
    
    // Enviar formulário
    document.getElementById('ticketForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validação
        const requiredFields = ['ticketTitle', 'ticketDescription', 'ticketCategory', 'ticketPriority', 'ticketClient'];
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--danger)';
                isValid = false;
            } else {
                field.style.borderColor = 'var(--gray-light)';
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // FormData para enviar arquivos
        const formData = new FormData();
        formData.append('title', document.getElementById('ticketTitle').value);
        formData.append('description', document.getElementById('ticketDescription').value);
        formData.append('category', document.getElementById('ticketCategory').value);
        formData.append('priority', document.getElementById('ticketPriority').value);
        formData.append('clientDepartment', document.getElementById('ticketClient').value);
        
        // Adiciona arquivos
        for (let i = 0; i < fileInput.files.length; i++) {
            formData.append('attachments', fileInput.files[i]);
        }
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Usuário não autenticado');
            }
            
            const response = await fetch('/api/tickets', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar chamado');
            }
            
            alert('Chamado criado com sucesso!');
            window.location.href = 'chamados.html';
        } catch (error) {
            console.error('Error:', error);
            alert(`Erro ao criar chamado: ${error.message}`);
        }
    });
});