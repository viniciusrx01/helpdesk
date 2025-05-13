document.addEventListener('DOMContentLoaded', function() {
    // Mostrar email do usuário logado
    const userEmail = localStorage.getItem('usuarioEmail');
    if (userEmail) {
        const emailElement = document.getElementById('userEmail');
        if (emailElement) {
            emailElement.textContent = userEmail;
        }
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('usuarioEmail');
            window.location.href = 'index.html';
        });
    }
    
    // Simular dados de chamados (será substituído por chamada AJAX)
    if (document.querySelector('.tickets-list')) {
        // Em uma aplicação real, isso viria de uma API
        const tickets = [
            {
                id: 'TICKET-001',
                titulo: 'Servidor principal offline',
                data: '10/06/2023 14:30',
                prioridade: 'critical',
                status: 'Aberto'
            },
            {
                id: 'TICKET-002',
                titulo: 'ERP não está carregando',
                data: '10/06/2023 15:15',
                prioridade: 'high',
                status: 'Em andamento'
            },
            {
                id: 'TICKET-003',
                titulo: 'Problema com impressora',
                data: '10/06/2023 09:45',
                prioridade: 'medium',
                status: 'Aguardando'
            },
            {
                id: 'TICKET-004',
                titulo: 'Acesso ao sistema financeiro',
                data: '09/06/2023 16:20',
                prioridade: 'low',
                status: 'Resolvido'
            }
        ];
        
        const ticketsList = document.querySelector('.tickets-list');
        ticketsList.innerHTML = ''; // Limpa os itens de exemplo
        
        tickets.forEach(ticket => {
            const ticketItem = document.createElement('div');
            ticketItem.className = `ticket-item ${ticket.prioridade}`;
            ticketItem.innerHTML = `
                <div class="ticket-priority"></div>
                <div class="ticket-info">
                    <h4>${ticket.titulo}</h4>
                    <p>#${ticket.id} | Aberto: ${ticket.data}</p>
                </div>
                <div class="ticket-status">
                    <span class="badge ${ticket.prioridade}">${ticket.status}</span>
                </div>
            `;
            
            // Adiciona evento de clique para abrir detalhes
            ticketItem.addEventListener('click', function() {
                window.location.href = `detalhes.html?id=${ticket.id}`;
            });
            
            ticketsList.appendChild(ticketItem);
        });
    }
});