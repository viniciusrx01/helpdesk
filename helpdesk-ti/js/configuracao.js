document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover classe active de todas as tabs
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            // Adicionar classe active à tab clicada
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Inicializar tabela de usuários
    $('#usersTable').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
        }
    });

    // Carregar configurações de SLA
    loadSlaSettings();

    // Carregar categorias
    loadCategories();

    // Eventos do modal de usuário
    setupUserModal();
});

function loadSlaSettings() {
    const slaGrid = document.querySelector('.sla-grid');
    const categories = ['hardware', 'software', 'network', 'email', 'access', 'other'];
    
    categories.forEach(category => {
        // Adicionar linha de categoria
        slaGrid.innerHTML += `
            <div class="sla-item">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
            <div class="sla-item"><input type="number" value="72" min="1" data-category="${category}" data-priority="low"></div>
            <div class="sla-item"><input type="number" value="48" min="1" data-category="${category}" data-priority="medium"></div>
            <div class="sla-item"><input type="number" value="24" min="1" data-category="${category}" data-priority="high"></div>
            <div class="sla-item"><input type="number" value="4" min="1" data-category="${category}" data-priority="critical"></div>
        `;
    });
}

function loadCategories() {
    const categoriesList = document.getElementById('categoriesList');
    const categories = ['Hardware', 'Software', 'Rede', 'E-mail', 'Acesso', 'Outro'];
    
    categoriesList.innerHTML = categories.map(cat => `
        <div class="category-tag">
            ${cat}
            <button type="button" data-category="${cat.toLowerCase()}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function setupUserModal() {
    const modal = document.getElementById('userModal');
    const addBtn = document.getElementById('addUser');
    const cancelBtn = document.getElementById('cancelUser');
    
    addBtn.addEventListener('click', () => {
        document.getElementById('userModalTitle').textContent = 'Adicionar Usuário';
        document.getElementById('userForm').reset();
        document.getElementById('passwordGroup').style.display = 'block';
        modal.style.display = 'flex';
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Editar usuário
    document.querySelectorAll('.btn-icon.edit').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('userModalTitle').textContent = 'Editar Usuário';
            document.getElementById('passwordGroup').style.display = 'none';
            // Preencher com dados do usuário (simulado)
            document.getElementById('userName').value = 'Administrador';
            document.getElementById('userEmail').value = 'admin@admin.com';
            document.getElementById('userDepartment').value = 'TI';
            document.getElementById('userRole').value = 'admin';
            modal.style.display = 'flex';
        });
    });
    
    // Adicionar categoria
    document.getElementById('addCategory').addEventListener('click', () => {
        const newCategory = document.getElementById('newCategory').value.trim();
        if (newCategory) {
            const categoriesList = document.getElementById('categoriesList');
            categoriesList.innerHTML += `
                <div class="category-tag">
                    ${newCategory}
                    <button type="button" data-category="${newCategory.toLowerCase()}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            document.getElementById('newCategory').value = '';
        }
    });
}
