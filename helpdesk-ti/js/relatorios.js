document.addEventListener('DOMContentLoaded', function() {
    // Configurar date range picker
    flatpickr("#dateRange", {
        mode: "range",
        locale: "pt",
        dateFormat: "d/m/Y",
        defaultDate: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]
    });

    // Inicializar gráficos
    initCharts();
    
    // Inicializar tabela
    $('#reportTable').DataTable({
        ajax: {
            url: '/api/reports',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'title' },
            { 
                data: 'status',
                render: function(data) {
                    return `<span class="badge ${data}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            { 
                data: 'priority',
                render: function(data) {
                    return `<span class="priority ${data}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            { data: 'resolutionTime' }
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
        }
    });

    // Evento para gerar relatório
    document.getElementById('generateReport').addEventListener('click', function() {
        const reportType = document.getElementById('reportType').value;
        const dateRange = document.getElementById('dateRange').value;
        
        // Simular geração de relatório
        console.log(`Gerando relatório: ${reportType} para ${dateRange}`);
        alert('Relatório gerado com sucesso!');
    });

    // Eventos de exportação
    document.getElementById('exportPdf').addEventListener('click', exportToPdf);
    document.getElementById('exportExcel').addEventListener('click', exportToExcel);
});

function initCharts() {
    // Gráfico de status
    const statusCtx = document.getElementById('statusChartCanvas').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Aberto', 'Em Andamento', 'Aguardando', 'Resolvido'],
            datasets: [{
                data: [12, 8, 3, 15],
                backgroundColor: [
                    '#4361ee',
                    '#f8961e',
                    '#6c757d',
                    '#4cc9f0'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Gráfico de prioridade
    const priorityCtx = document.getElementById('priorityChartCanvas').getContext('2d');
    new Chart(priorityCtx, {
        type: 'bar',
        data: {
            labels: ['Baixa', 'Média', 'Alta', 'Crítica'],
            datasets: [{
                label: 'Chamados por Prioridade',
                data: [10, 15, 8, 5],
                backgroundColor: [
                    '#4cc9f0',
                    '#4895ef',
                    '#f8961e',
                    '#f72585'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function exportToPdf() {
    alert('Exportando para PDF...');
    // Implementação real usaria biblioteca como jsPDF
}

function exportToExcel() {
    alert('Exportando para Excel...');
    // Implementação real usaria biblioteca como SheetJS
}