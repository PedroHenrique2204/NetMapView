const sala = document.getElementById("salaMontagem");
const svg = document.getElementById("conexoes");
let tipoDispositivo = null;
let conexaoOrigem = null;

let contador = {
  computador: 1,
  switch: 1,
  roteador: 1
};

// Para armazenar conexões entre dispositivos
let conexoes = [];

// Para dispositivos existentes na sala
let dispositivos = [];

document.querySelectorAll(".icone").forEach(icone => {
  icone.addEventListener("dragstart", e => {
    tipoDispositivo = icone.id;
  });
});

sala.addEventListener("dragover", e => e.preventDefault());

sala.addEventListener("drop", async e => {
  e.preventDefault();
  if (!tipoDispositivo) return;

  const x = e.offsetX;
  const y = e.offsetY;

  criarDispositivo(tipoDispositivo, x, y);

  tipoDispositivo = null;
});

function criarDispositivo(tipo, x, y) {
  const container = document.createElement("div");
  container.className = "dispositivo";
  container.style.left = x + "px";
  container.style.top = y + "px";
  container.style.position = "absolute";
  container.dataset.tipo = tipo;
  container.dataset.id = tipo + contador[tipo];

  // Imagem do dispositivo
  const imagem = document.createElement("img");
  imagem.src = document.getElementById(tipo).querySelector("img").src;
  imagem.draggable = true;

  // Nome editável
  const nome = document.createElement("input");
  nome.className = "nome-dispositivo";
  nome.value = gerarNome(tipo);

  contador[tipo]++;

  // Eventos para conexão
  imagem.addEventListener("click", () => conectarDispositivo(container));

  // Drag para mover o dispositivo dentro da sala
  container.addEventListener("dragstart", dragStart);
  container.addEventListener("dragend", dragEnd);

  // Para o container ser dragável, a imagem não pode disparar dragstart separadamente
  imagem.addEventListener("dragstart", e => e.stopPropagation());

  container.setAttribute("draggable", "true");

  container.appendChild(imagem);
  container.appendChild(nome);
  sala.appendChild(container);

  dispositivos.push(container);

  atualizarLinhas();
}

// Gera nome único para dispositivos
function gerarNome(tipo) {
  return tipo.charAt(0).toUpperCase() + tipo.slice(1) + contador[tipo];
}

let itemAtivo = null;

function dragStart(e) {
  itemAtivo = e.target;
  // Precisa definir offset do mouse em relação ao container para melhor posicionamento no dragend
  const rect = itemAtivo.getBoundingClientRect();
  itemAtivo.dragOffsetX = e.clientX - rect.left;
  itemAtivo.dragOffsetY = e.clientY - rect.top;
}

function dragEnd(e) {
  const rect = sala.getBoundingClientRect();
  let x = e.clientX - rect.left - itemAtivo.dragOffsetX;
  let y = e.clientY - rect.top - itemAtivo.dragOffsetY;

  // Garante que não saia do container
  x = Math.max(0, Math.min(x, sala.clientWidth - itemAtivo.offsetWidth));
  y = Math.max(0, Math.min(y, sala.clientHeight - itemAtivo.offsetHeight));

  itemAtivo.style.left = x + "px";
  itemAtivo.style.top = y + "px";

  atualizarLinhas();
  itemAtivo = null;
}

// Conexão entre dispositivos
function conectarDispositivo(elem) {
  if (!conexaoOrigem) {
    conexaoOrigem = elem;
    elem.style.border = "2px solid red";
  } else if (conexaoOrigem !== elem) {
    conexaoOrigem.style.border = "none";
    conexoes.push({ from: conexaoOrigem, to: elem });
    desenharLinha(conexaoOrigem, elem);
    conexaoOrigem = null;
  }
}

function desenharLinha(elem1, elem2) {
  const pos1 = elem1.getBoundingClientRect();
  const pos2 = elem2.getBoundingClientRect();
  const salaRect = sala.getBoundingClientRect();

  const x1 = pos1.left + pos1.width / 2 - salaRect.left;
  const y1 = pos1.top + pos1.height / 2 - salaRect.top;
  const x2 = pos2.left + pos2.width / 2 - salaRect.left;
  const y2 = pos2.top + pos2.height / 2 - salaRect.top;

  const linha = document.createElementNS("http://www.w3.org/2000/svg", "line");
  linha.setAttribute("x1", x1);
  linha.setAttribute("y1", y1);
  linha.setAttribute("x2", x2);
  linha.setAttribute("y2", y2);
  linha.setAttribute("stroke", "#007bff");
  linha.setAttribute("stroke-width", "2");

  svg.appendChild(linha);
}

function atualizarLinhas() {
  svg.innerHTML = "";
  conexoes.forEach(c => desenharLinha(c.from, c.to));
}
