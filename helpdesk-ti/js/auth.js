document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            // Simulação de autenticação
            if (email && senha) {
                // Aqui você faria uma requisição para o backend
                // Vamos simular um login bem-sucedido
                localStorage.setItem('usuarioLogado', 'true');
                localStorage.setItem('usuarioEmail', email);
                
                // Redirecionar para o dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Verificar se o usuário está logado em outras páginas
    if (window.location.pathname !== '/index.html' && !localStorage.getItem('usuarioLogado')) {
        window.location.href = 'index.html';
    }
});