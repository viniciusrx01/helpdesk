document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get('id');
    
    if (!ticketId) {
        window.location.href = 'chamados.html';
        return;
    }
    
    // Carregar dados do chamado
    async function loadTicketDetails() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Usuário não autenticado');
            }
            
            const response = await fetch(`/api/tickets/${ticketId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Chamado não encontrado');
            }
            
            const ticketData = await response.json();
            
            if (!ticketData.success) {
                throw new Error(ticketData.message);
            }
            
            renderTicketDetails(ticketData.data);
        } catch (error) {
            console.error('Erro ao carregar chamado:', error);
            alert(`Erro: ${error.message}`);
            window.location.href = 'chamados.html';
        }
    }
    
    function renderTicketDetails(ticket) {
        // Converter status para formato legível
        const statusMap = {
            'open': 'Aberto',
            'in_progress': 'Em Andamento',
            'waiting': 'Aguardando',
            'resolved': 'Resolvido',
            'closed': 'Fechado'
        };
        
        // Preencher os dados na página
        document.getElementById('ticketTitle').textContent = ticket.title;
        document.getElementById('ticketId').textContent = `#${ticket.id}`;
        document.getElementById('ticketDescription').innerHTML = ticket.description;
        document.getElementById('ticketStatus').textContent = statusMap[ticket.status] || ticket.status;
        document.getElementById('ticketPriority').textContent = ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1);
        document.getElementById('ticketCreatedAt').textContent = new Date(ticket.createdAt).toLocaleString();
        document.getElementById('ticketUpdatedAt').textContent = new Date(ticket.updatedAt).toLocaleString();
        document.getElementById('ticketClient').textContent = ticket.clientDepartment;
        document.getElementById('ticketCategory').textContent = ticket.category;
        document.getElementById('ticketAssignee').textContent = ticket.assignedTo ? ticket.assignedTo.name : 'Não atribuído';
        
        // Ajustar classes de status e prioridade
        const statusElement = document.getElementById('ticketStatus');
        statusElement.className = 'badge ' + ticket.status.toLowerCase().replace('_', '-');
        
        const priorityElement = document.getElementById('ticketPriority');
        priorityElement.className = 'priority ' + ticket.priority;
        
        // [Restante do código de renderização...]
    }
    
    // [Restante do código permanece similar, mas usando chamadas async/await para a API]
    loadTicketDetails();
});