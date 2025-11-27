async function logar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const captchaToken = grecaptcha.getResponse();
  if (!captchaToken) {
    mostrarErro("Confirme o CAPTCHA!");
    return;
  }

  const resposta = await fetch("http://localhost:3000/usuarios");
  const lista = await resposta.json();

  const usuario = lista.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    mostrarErro("Email ou senha incorretos!");
    return;
  }

  // Token falso para simulação
  const token = Math.random().toString(36).substring(2);

  localStorage.setItem("token", token);
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  window.location.href = "perfil.html";
}

function mostrarErro(msg) {
  const e = document.getElementById("erro");
  e.style.display = "block";
  e.innerText = msg;
}
