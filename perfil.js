const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!token || !usuario) {
  alert("Você não está logado!");
  window.location.href = "login.html";
}

document.getElementById("foto").src = usuario.foto;
document.getElementById("nome").innerText = usuario.nome;
document.getElementById("idade").innerText = "Idade: " + usuario.idade + " anos";
document.getElementById("escolaridade").innerText =
  "Escolaridade: " + usuario.escolaridade;

document.getElementById("rua").innerText = "Rua: " + usuario.endereco.rua;
document.getElementById("bairro").innerText = "Bairro: " + usuario.endereco.bairro;
document.getElementById("cidade").innerText = "Cidade: " + usuario.endereco.cidade;

function sair() {
  localStorage.clear();
  window.location.href = "login.html";
}
