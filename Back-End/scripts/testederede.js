const server = "http://localhost:3000";

async function criarHost(nome, endereco) {
  try {
    const response = await fetch(`${server}/hosts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome, address: endereco })
    });
    if (!response.ok) throw new Error("Erro ao criar host");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function listarHosts() {
  try {
    const response = await fetch(`${server}/hosts`);
    if (!response.ok) throw new Error("Erro ao listar hosts");
    const hosts = await response.json();
    return hosts;
  } catch (error) {
    console.error(error);
  }
}

async function atualizarHost(id, nome, endereco) {
  try {
    const response = await fetch(`${server}/hosts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome, address: endereco })
    });
    if (!response.ok) throw new Error("Erro ao atualizar host");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function deletarHost(id) {
  try {
    const response = await fetch(`${server}/hosts/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error("Erro ao deletar host");
    console.log(`Host ${id} deletado com sucesso.`);
  } catch (error) {
    console.error(error);
  }
}

// Função para exibir hosts no painel de teste
async function exibirHosts() {
  const hosts = await listarHosts();
  const resultado = document.getElementById("saidaTeste");
  if (!hosts || hosts.length === 0) {
    resultado.innerHTML = "<p>Nenhum host cadastrado no servidor.</p>";
    return;
  }
  resultado.innerHTML = hosts
    .map(h => `<div><strong>${h.name}</strong> - ${h.address}</div>`)
    .join("");
}

// Atualiza a lista ao carregar página e ao clicar no botão
document.addEventListener("DOMContentLoaded", () => {
  exibirHosts();

  document.getElementById("btnAtualizarHosts").addEventListener("click", () => {
    exibirHosts();
  });
});
