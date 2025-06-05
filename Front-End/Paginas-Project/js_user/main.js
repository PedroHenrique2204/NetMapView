import API from './services/api.js';

// Elementos do formulário
const userForm = document.getElementById('userForm');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const userUsernameInput = document.getElementById('userUsername');
const userPasswordInput = document.getElementById('userPassword');
const usersList = document.getElementById('usersList');

// Carrega e renderiza os usuários existentes
async function loadUsers() {
  try {
    const users = await API.read('users');
    renderUserCards(users);
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}

// Adiciona um novo usuário
async function addUser(userData) {
  try {
    const newUser = await API.create('users', userData);

    const userCard = createUserCard(newUser);
    usersList.insertAdjacentHTML('beforeend', userCard);

    userForm.reset();

    console.log('Usuário adicionado com sucesso:', newUser);
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    alert('Erro ao cadastrar usuário. ' + error.message);
  }
}

// Manipulador do envio do formulário
userForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userData = {
    nome: userNameInput.value.trim(),
    email: userEmailInput.value.trim(),
    usuario: userUsernameInput.value.trim(),
    senha: userPasswordInput.value.trim()
  };

  if (!userData.nome || !userData.email || !userData.usuario || !userData.senha) {
    alert('Todos os campos são obrigatórios!');
    return;
  }

  await addUser(userData);
});

function createUserCard(user) {
  const userCard = `
    <div class="col-md-4 mb-4">
      <div id="user-${user.id}" class="card user-card">
        <div class="card-body">
          <h5 class="card-title">${user.nome}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${user.email}</h6>
          <p class="card-text">Usuário: ${user.usuario}</p>
        </div>
      </div>
    </div>
  `;

  return userCard;
}

function renderUserCards(users) {
  users.forEach((user) => {
    const userCard = createUserCard(user);
    usersList.insertAdjacentHTML('beforeend', userCard);
  });
}

loadUsers();
