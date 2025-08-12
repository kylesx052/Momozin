// Data inicial para o relógio de tempo juntos
const inicio = new Date("2025-02-07T21:14:40");

const m1 = document.getElementById("musicaPrincipal");
const m2 = document.getElementById("musicaGaleria");

function entrar() {
  document.getElementById("telaBemVindo").style.display = "none";

  m1.volume = 1;
  m2.volume = 1;

  window.addEventListener("scroll", onScrollCheckSection);
  onScrollCheckSection();
}

// Alterna música com base na seção visível
function onScrollCheckSection() {
  const principal = document.getElementById("principal");
  const distPrincipal = Math.abs(principal.getBoundingClientRect().top);

  if (distPrincipal < 200) {
    if (!m1.paused) return;
    fadeOut(m2, 850);
    fadeIn(m1, 850);
  } else {
    if (!m2.paused) return;
    fadeOut(m1, 1000);
    fadeIn(m2, 1000);
  }
}

function fadeOut(audio, duration) {
  let step = audio.volume / (duration / 50);
  let fade = setInterval(() => {
    if (audio.volume - step > 0) {
      audio.volume -= step;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fade);
    }
  }, 50);
}

function fadeIn(audio, duration) {
  audio.volume = 0;
  audio.play().catch(() => {});
  let step = 1 / (duration / 50);
  let fade = setInterval(() => {
    if (audio.volume + step < 1) {
      audio.volume += step;
    } else {
      audio.volume = 1;
      clearInterval(fade);
    }
  }, 50);
}

// Atualiza o relógio "tempo juntos"
function atualizarTempo() {
  const agora = new Date();
  const diff = agora - inicio;
  const s = Math.floor(diff / 1000);
  const meses = Math.floor(s / (30 * 24 * 3600));
  const dias = Math.floor((s % (30 * 24 * 3600)) / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const min = Math.floor((s % 3600) / 60);
  const seg = s % 60;

  document.getElementById("tempoJuntos").textContent =
    `${meses} meses, ${dias} dias, ${h}h ${min}min ${seg}s`;
}
setInterval(atualizarTempo, 1000);
atualizarTempo();

// Atualiza o relógio digital "estou sendo feliz"
const Horas = document.getElementById("Horas");
const Minutos = document.getElementById("Minutos");
const Segundos = document.getElementById("Segundos");

setInterval(() => {
  let agora = new Date();
  let h = agora.getHours();
  let m = agora.getMinutes();
  let s = agora.getSeconds();
  Horas.textContent = h < 10 ? "0" + h : h;
  Minutos.textContent = m < 10 ? "0" + m : m;
  Segundos.textContent = s < 10 ? "0" + s : s;
}, 1000);

// Texto digitado no título principal
new Typed("#tituloPrincipal", {
  strings: ["🎉 Feliz Aniversário, minha princesa! 🎂"],
  typeSpeed: 40,
  backSpeed: 25,
  showCursor: false
});

// Texto digitado no título da seção amorosa
new Typed("#tituloAmor", {
  strings: ["💌 Uma Coisa Que Eu Preciso Te Dizer..."],
  typeSpeed: 45,
  backSpeed: 30,
  showCursor: false
});

// Mensagem extra ao clicar no botão (simples)
function mostrarMensagem() {
  document.getElementById("mensagemExtra").textContent =
    "Você é o meu xuxuzinho, o amor da minha vida. 💖 Nunca vou parar de te amar!";
}

// Corações subindo animados
const hearts = document.querySelector(".hearts");
setInterval(() => {
  const h = document.createElement("div");
  h.textContent = "💗";
  Object.assign(h.style, {
    position: "absolute",
    left: Math.random() * window.innerWidth + "px",
    fontSize: `${20 + Math.random() * 20}px`,
    top: "100%",
    opacity: 0.7,
    animation: "subir 6s linear forwards",
  });
  hearts.append(h);
  setTimeout(() => h.remove(), 6000);
}, 250);


// NOVA FUNÇÃO: criar 6 arquivos simulados e mostrar aviso
function criarArquivosMaliciosos() {
  const mensagemExtra = document.getElementById("mensagemExtra");
  mensagemExtra.textContent = "Criando arquivos maliciosos...";

  // Conteúdo enorme (pode ser qualquer texto, aqui deixei só um texto repetido)
  const conteudoGrande = `Eu te amo muito, Gabrielle! `.repeat(1000);

  // Criar e baixar 6 arquivos chamados vida1.txt, vida2.txt ... vida6.txt
  for (let i = 1; i <= 6; i++) {
    const nomeArquivo = `vida${i}.txt`;
    const blob = new Blob([conteudoGrande], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Mostrar mensagem final depois de criar arquivos
  setTimeout(() => {
    mensagemExtra.textContent = `Foram criados 6 arquivos 😈😋🙏🏻🫦 Procure-os no seu lindo e quebrado celular!`;
  }, 1000);
}