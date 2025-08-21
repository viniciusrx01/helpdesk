// Dados salvos no localStorage
let data = JSON.parse(localStorage.getItem("helpdeskData")) || {
  chamados: [],
  clientes: [],
  estoque: [],
  usuarios: [{nome: "Técnico Padrão", login: "tecnico", senha: "123"}]
};

let currentUser = null;

// Salvar
function saveData() {
  localStorage.setItem("helpdeskData", JSON.stringify(data));
}

// Login
function login() {
  const user = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;

  if (user === "adim" && pass === "admin") {
    currentUser = { role: "admin", nome: "Administrador" };
  } else {
    const tecnico = data.usuarios.find(u => u.login === user && u.senha === pass);
    if (tecnico) currentUser = { role: "tecnico", nome: tecnico.nome };
  }

  if (currentUser) {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("app-container").classList.remove("hidden");
    if (currentUser.role !== "admin") {
      document.getElementById("usuarios-tab").style.display = "none";
      document.getElementById("config-tab").style.display = "none";
    }
    renderAll();
  } else {
    document.getElementById("login-error").textContent = "Credenciais inválidas!";
  }
}

// Logout
function logout() {
  currentUser = null;
  document.getElementById("app-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
}

// Navegação
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// Chamados
function addChamado(event) {
  event.preventDefault();
  const cliente = document.getElementById("chamado-cliente").value;
  const descricao = document.getElementById("chamado-descricao").value;
  const sla = document.getElementById("chamado-sla").value;
  const status = document.getElementById("chamado-status").value;
  const fileInput = document.getElementById("chamado-anexo");
  let anexo = null;

  if (fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function() {
      anexo = reader.result;
      salvarChamado(cliente, descricao, sla, status, anexo);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    salvarChamado(cliente, descricao, sla, status, null);
  }
}

function salvarChamado(cliente, descricao, sla, status, anexo) {
  data.chamados.push({cliente, descricao, sla, status, anexo});
  saveData();
  renderChamados();
  document.getElementById("chamado-form").reset();
}

function renderChamados() {
  const table = document.getElementById("chamados-list");
  table.innerHTML = "<tr><th>Cliente</th><th>Descrição</th><th>SLA</th><th>Status</th><th>Anexo</th></tr>";
  data.chamados.forEach(c => {
    table.innerHTML += `<tr>
      <td>${c.cliente}</td>
      <td>${c.descricao}</td>
      <td>${c.sla}</td>
      <td>${c.status}</td>
      <td>${c.anexo ? `<a href="${c.anexo}" target="_blank">Ver</a>` : ""}</td>
    </tr>`;
  });
}

// Clientes
function addCliente(event) {
  event.preventDefault();
  const nome = document.getElementById("cliente-nome").value;
  const contato = document.getElementById("cliente-contato").value;
  data.clientes.push({nome, contato});
  saveData();
  renderClientes();
  document.getElementById("cliente-form").reset();
}

function renderClientes() {
  const table = document.getElementById("clientes-list");
  table.innerHTML = "<tr><th>Nome</th><th>Contato</th></tr>";
  data.clientes.forEach(c => {
    table.innerHTML += `<tr><td>${c.nome}</td><td>${c.contato}</td></tr>`;
  });
}

// Estoque
function addEstoque(event) {
  event.preventDefault();
  const item = document.getElementById("estoque-item").value;
  const quantidade = document.getElementById("estoque-quantidade").value;
  data.estoque.push({item, quantidade});
  saveData();
  renderEstoque();
  document.getElementById("estoque-form").reset();
}

function renderEstoque() {
  const table = document.getElementById("estoque-list");
  table.innerHTML = "<tr><th>Item</th><th>Quantidade</th></tr>";
  data.estoque.forEach(e => {
    table.innerHTML += `<tr><td>${e.item}</td><td>${e.quantidade}</td></tr>`;
  });
}

// Usuários (somente admin)
function addUsuario(event) {
  event.preventDefault();
  const nome = document.getElementById("usuario-nome").value;
  const login = document.getElementById("usuario-login").value;
  const senha = document.getElementById("usuario-senha").value;
  data.usuarios.push({nome, login, senha});
  saveData();
  renderUsuarios();
  document.getElementById("usuario-form").reset();
}

function renderUsuarios() {
  const table = document.getElementById("usuarios-list");
  table.innerHTML = "<tr><th>Nome</th><th>Login</th></tr>";
  data.usuarios.forEach(u => {
    table.innerHTML += `<tr><td>${u.nome}</td><td>${u.login}</td></tr>`;
  });
}

// Configuração - Backup
function backupData() {
  const blob = new Blob([JSON.stringify(data)], {type: "application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "backup_helpdesk.json";
  a.click();
}

function importData(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function() {
    data = JSON.parse(reader.result);
    saveData();
    renderAll();
  };
  reader.readAsText(file);
}

// Renderizar tudo
function renderAll() {
  renderChamados();
  renderClientes();
  renderEstoque();
  renderUsuarios();
}

