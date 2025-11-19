const API = "http://localhost:3000";

// Função gerar token simples (128 caracteres)
function gerarToken() {
  return [...crypto.getRandomValues(new Uint8Array(64))]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// alternar telas
function mostrarCadastro() {
  document.getElementById("login").style.display = "none";
  document.getElementById("cadastro").style.display = "block";
}
function mostrarLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("cadastro").style.display = "none";
}

// LOGIN
async function fazerLogin() {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;
  const erro = document.getElementById("loginErro");

  const res = await fetch(`${API}/login`);
  const data = await res.json();

  if (email === data.email && senha === data.password) {
    
    // gerar token e salvar no navegador
    const token = gerarToken();
    localStorage.setItem("token", token);

    console.log("TOKEN GERADO:", token);

    carregarPerfil();
  } else {
    erro.textContent = "Email ou senha incorretos!";
  }
}

// Cadastro desativado
async function fazerCadastro() {
  document.getElementById("cadErro").textContent =
    "Cadastro desativado — dados vêm somente do JSON.";
}

// Carregar perfil (com validação de token)
async function carregarPerfil() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token inválido. Faça login novamente.");
    mostrarLogin();
    return;
  }

  const perfilDiv = document.getElementById("perfil");
  perfilDiv.style.display = "block";
  document.getElementById("login").style.display = "none";
  document.getElementById("cadastro").style.display = "none";

  const perfil = await fetch(`${API}/perfil`).then(r => r.json());
  const endereco = await fetch(`${API}/endereco`).then(r => r.json());
  const escola = await fetch(`${API}/escolaridade`).then(r => r.json());

  document.getElementById("fotoPerfil").src = perfil.imagem;
  document.getElementById("nomePerfil").textContent = perfil.nome;
  document.getElementById("idadePerfil").textContent = perfil.idade;

  document.getElementById("ruaPerfil").textContent = endereco.rua;
  document.getElementById("bairroPerfil").textContent = endereco.bairro;
  document.getElementById("cidadePerfil").textContent = endereco.cidade;

  document.getElementById("escolaPerfil").textContent = escola.escola;
  document.getElementById("anoPerfil").textContent = escola.ano_letivo;
}