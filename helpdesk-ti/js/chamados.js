document.addEventListener('DOMContentLoaded', function() {
    // Inicializa DataTable
    const table = $('#ticketsTable').DataTable({
        ajax: {
            url: 'api/chamados',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'titulo' },
            { data: 'cliente' },
            { data: 'categoria' },
            { 
                data: 'prioridade',
                render: function(data, type, row) {
                    const priorityClass = getPriorityClass(data);
                    return `
                        <div class="d-flex align-items-center">
                            <span class="badge-priority ${priorityClass}"></span>
                            ${data.charAt(0).toUpperCase() + data.slice(1)}
                        </div>
                    `;
                }
            },
            { 
                data: 'status',
                render: function(data, type, row) {
                    const statusClass = getStatusClass(data);
                    return `<span class="badge ${statusClass}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            { data: 'data_abertura' },
            { data: 'ultima_atualizacao' },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <div class="actions-cell">
                            <button class="action-btn view" data-id="${row.id}" title="Visualizar">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" data-id="${row.id}" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" data-id="${row.id}" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                },
                orderable: false
            }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
        },
        responsive: true,
        order: [[6, 'desc']]
    });

    // Funções auxiliares
    function getPriorityClass(priority) {
        const priorities = {
            'baixa': 'baixa',
            'media': 'media',
            'alta': 'alta',
            'critica': 'critica'
        };
        return priorities[priority.toLowerCase()] || 'baixa';
    }

    function getStatusClass(status) {
        const statuses = {
            'aberto': 'aberto',
            'em andamento': 'andamento',
            'aguardando': 'aguardando',
            'resolvido': 'resolvido'
        };
        return statuses[status.toLowerCase()] || 'aberto';
    }

    // Filtros
    $('#filterStatus, #filterPriority, #filterDate').on('change', function() {
        table.draw();
    });

    $('#searchInput').on('keyup', function() {
        table.search(this.value).draw();
    });

    $('#resetFilters').on('click', function() {
        $('#filterStatus, #filterPriority, #filterDate').val('');
        table.search('').draw();
    });

    // Ações
    $('#ticketsTable').on('click', '.view', function() {
        const id = $(this).data('id');
        window.location.href = `detalhes.html?id=${id}`;
    });

    $('#ticketsTable').on('click', '.edit', function() {
        const id = $(this).data('id');
        window.location.href = `editar-chamado.html?id=${id}`;
    });

    $('#ticketsTable').on('click', '.delete', function() {
        const id = $(this).data('id');
        const modal = document.getElementById('confirmModal');
        
        modal.classList.add('show');
        
        document.getElementById('confirmAction').onclick = function() {
            // Chamada API para deletar
            fetch(`api/chamados/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    table.ajax.reload();
                    modal.classList.remove('show');
                } else {
                    alert('Erro ao excluir chamado');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao excluir chamado');
            });
        };
        
        document.getElementById('confirmCancel').onclick = function() {
            modal.classList.remove('show');
        };
        
        document.querySelector('.modal-close').onclick = function() {
            modal.classList.remove('show');
        };
    });

    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        const modal = document.getElementById('confirmModal');
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
});