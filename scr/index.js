const form = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("password-strength");
const captchaLabel = document.getElementById("captcha-label");
const captchaInput = document.getElementById("captcha-input");
const errorMessage = document.getElementById("error-message");

let loginAttempts = 0;
let captchaAnswer = 0;

// Função para gerar captcha simples
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  captchaAnswer = a + b;
  captchaLabel.textContent = `${a} + ${b} = ?`;
}

generateCaptcha();

// Força da senha (visual)
passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  let strength = 0;

  if (val.length > 6) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  switch (strength) {
    case 0:
      strengthBar.style.width = "0";
      break;
    case 1:
      strengthBar.style.width = "25%";
      strengthBar.style.background = "red";
      break;
    case 2:
      strengthBar.style.width = "50%";
      strengthBar.style.background = "orange";
      break;
    case 3:
      strengthBar.style.width = "75%";
      strengthBar.style.background = "yellowgreen";
      break;
    case 4:
      strengthBar.style.width = "100%";
      strengthBar.style.background = "green";
      break;
  }
});

// Evento de envio do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Simulação de bloqueio por tentativas
  if (loginAttempts >= 3) {
    errorMessage.textContent = "Muitas tentativas. Tente novamente mais tarde.";
    return;
  }

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();
  const captchaValue = parseInt(captchaInput.value);

  // Verifica captcha
  if (captchaValue !== captchaAnswer) {
    errorMessage.textContent = "Captcha incorreto!";
    generateCaptcha();
    return;
  }

  // Verifica campos
  if (!email || !password) {
    errorMessage.textContent = "Preencha todos os campos!";
    return;
  }

  // Simula verificação (aqui você colocaria requisição para backend)
  if (email === "admin@example.com" && password === "Senha@123") {
    alert("Login realizado com sucesso!");
    errorMessage.textContent = "";
    form.reset();
    strengthBar.style.width = "0";
    generateCaptcha();
    loginAttempts = 0;
  } else {
    errorMessage.textContent = "Email ou senha incorretos.";
    loginAttempts++;
    generateCaptcha();
  }
});