const carnes = [
  "Picanha", "Fraldinha", "Pão de alho", "Toscana", "Maminha",
  "Coxinha de asa", "Coração", "Cupim", "Bananinha", "Alcatra",
  "Calabresa", "Carne de gato"
];

const listaDiv = document.getElementById("carnes-lista");
const carrinhoUl = document.getElementById("carrinho-itens");
const alertaDiv = document.getElementById("alerta");
const finalizarBtn = document.getElementById("finalizar-btn");

let carrinho = {};

function mostrarAlerta(msg) {
  alertaDiv.textContent = msg;
  alertaDiv.style.display = "block";
  setTimeout(() => {
    alertaDiv.style.display = "none";
  }, 3000);
}

function adicionarAoCarrinho(carne) {
  if (carrinho[carne]) {
    carrinho[carne]++;
  } else {
    carrinho[carne] = 1;
  }
  atualizarCarrinho();
}

function removerDoCarrinho(carne) {
  if (carrinho[carne]) {
    carrinho[carne]--;
    if (carrinho[carne] <= 0) {
      delete carrinho[carne];
    }
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  carrinhoUl.innerHTML = "";
  Object.keys(carrinho).forEach((carne) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${carne} — <strong>${carrinho[carne]}</strong>
      <button onclick="adicionarAoCarrinho('${carne}')">+</button>
      <button onclick="removerDoCarrinho('${carne}')">−</button>
    `;
    carrinhoUl.appendChild(li);
  });
}

function criarBotao(carne) {
  const div = document.createElement("div");
  div.className = "carne-item";

  const img = document.createElement("img");
  img.src = `assets/${carne.toLowerCase().replace(/ /g, "_")}.png`;
  img.alt = carne;
  div.appendChild(img);

  const btn = document.createElement("button");
  btn.textContent = carne;

  btn.onclick = () => {
    if (carne === "Carne de gato") {
      mostrarAlerta("Carne de gato???? Tá brincando né?");
      return;
    }
    if (carne === "Coração") {
      mostrarAlerta("Athaliba já reservou tudo e não tem no estoque");
      return;
    }
    adicionarAoCarrinho(carne);
  };

  div.appendChild(btn);
  listaDiv.appendChild(div);
}

carnes.forEach(criarBotao);

finalizarBtn.onclick = () => {
  const pedido = Object.entries(carrinho)
    .map(([carne, qtd]) => `${carne} (${qtd})`)
    .join(", ");
  const mensagem = `Bora calebeeee traga ai: ${pedido}`;
  const numero = "71993566883";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
};
