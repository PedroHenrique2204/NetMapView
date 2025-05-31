// aplicacao.js

function acessarPainel() {
    alert('Funcionalidade de painel ainda em desenvolvimento.');
  }
  
  function simularLogin(event) {
    event.preventDefault();
    alert('Login simulado com sucesso!');
    return false;
  }
  
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
  }
  