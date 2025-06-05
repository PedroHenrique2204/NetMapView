import API from './services/api.js';

// Elementos do formulário
const hostForm = document.getElementById('hostForm');
const hostNameInput = document.getElementById('hostName');
const hostIPInput = document.getElementById('hostIP');
const hostDescriptionInput = document.getElementById('hostDescription');
const hostsList = document.getElementById('hostsList');
const hostModal = new bootstrap.Modal(document.getElementById('hostModal'));

// Carrega e renderiza os hosts existentes
async function loadHosts() {
  try {
    const hosts = await API.read('hosts');
    renderHostCards(hosts);
  } catch (error) {
    console.error('Erro ao carregar hosts:', error);
  }
}

// Adiciona um novo host
async function addHost(hostData) {
  try {
    const newHost = await API.create('hosts', hostData);

    // Adiciona o novo host à lista sem recarregar toda a página
    const hostCard = createHostCard(newHost);
    hostsList.insertAdjacentHTML('beforeend', hostCard);

    // Limpa o formulário
    hostForm.reset();

    // Fecha o modal
    hostModal.hide();

    console.log('Host adicionado com sucesso:', newHost);
  } catch (error) {
    console.error('Erro ao adicionar host:', error);
    alert('Erro ao adicionar host. Tente novamente.');
  }
}

// Manipulador do envio do formulário
hostForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obtém o valor do status selecionado
  const selectedStatus = document.querySelector('input[name="hostStatus"]:checked');

  const hostData = {
    name: hostNameInput.value.trim(),
    ip: hostIPInput.value.trim(),
    description: hostDescriptionInput.value.trim(),
    status: selectedStatus.value === 'true'
  };

  // Validação básica
  if (!hostData.name || !hostData.ip) {
    alert('Nome e IP são obrigatórios!');
    return;
  }

  await addHost(hostData);
});

function createHostCard(host) {
  const hostCard = `
        <div class="col-md-4 mb-4">
          <div id="host-${host.id}" class="card host-card">
            <div class="card-body">
              <h5 class="card-title">${host.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">IP: ${host.ip}</h6>
              <p class="card-text">${host.description || 'Sem descrição'}</p>
              <div class="d-flex justify-content-between">
                <span class="badge bg-${host.status ? 'success' : 'danger'}">${host.status ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>
    `;

  return hostCard;
}

function renderHostCards(hosts) {
  hosts.forEach((host) => {
    const hostCard = createHostCard(host);
    hostsList.insertAdjacentHTML('beforeend', hostCard);
  });
}

loadHosts();