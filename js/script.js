document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Mostrar flashcard según botón o URL ---
  function mostrarTema(id) {
    document.querySelectorAll(".flashcard-content").forEach(div => div.style.display = "none");
    const elemento = document.querySelector(id);
    if (elemento) {
      elemento.style.display = "block";
      elemento.scrollIntoView({ behavior: "smooth" });
    }
  }

  document.querySelectorAll("button[data-target]").forEach(btn => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      mostrarTema(target);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const tema = params.get("tema");
  if (tema) {
    const mapa = {
      phishing: "#tema1",
      malware: "#tema2",
      ransomware: "#tema3",
      ddos: "#tema4"
    };
    const id = mapa[tema.toLowerCase()];
    if (id) mostrarTema(id);
  }

  // --- 2. Validación del formulario de contacto ---
  const contactoForm = document.getElementById('contactoForm');
  if (contactoForm) {
    contactoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      const correoValido = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

      if (!nombre || !correo || !mensaje) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      if (!correoValido.test(correo)) {
        alert("El correo no es válido.");
        return;
      }

      if (mensaje.length < 10) {
        alert("El mensaje debe tener al menos 10 caracteres.");
        return;
      }

      alert("¡Formulario enviado con éxito!");
      this.reset();
    });
  }

  // --- 3. Validación del test de seguridad ---
  const testForm = document.getElementById("testForm");
  if (testForm) {
    testForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const respuestas = [
        document.getElementById("q1").value,
        document.getElementById("q2").value,
        document.getElementById("q3").value,
        document.getElementById("q4").value
      ];

      if (respuestas.some(r => r === "")) {
        alert("Responde todas las preguntas.");
        return;
      }

      let puntaje = 0;
      respuestas.forEach(r => {
        if (r === "correcta") puntaje++;
      });

      alert(`Tu puntaje es: ${puntaje}/4.\n${puntaje === 4 ? "¡Excelente!" : "Sigue practicando para mejorar tu seguridad."}`);

      const modal = bootstrap.Modal.getInstance(document.getElementById("modalTest"));
      modal.hide();
      this.reset();
    });
  }
});
