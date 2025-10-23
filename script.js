// =============================================
// | Formulario con Formspree + Loader + Modal |
// =============================================
const form = document.getElementById("form-contacto");
const loader = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

// Seguridad: Solo añadir listeners si los elementos existen.
if (form && loader && modal && modalMessage && modalClose) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const data = new FormData(form);
    loader.classList.remove("hidden");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        modalMessage.textContent = "Gracias por tu mensaje. Te contactaré pronto.";
        modalMessage.className = "success";
        form.reset();
      } else {
        modalMessage.textContent = "Ocurrió un error al enviar el mensaje.";
        modalMessage.className = "error";
      }
    } catch (error) {
      modalMessage.textContent = "No se pudo conectar al servidor.";
      modalMessage.className = "error";
    } finally {
      loader.classList.add("hidden");
      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
    }
  });

  // Cerrar modal al click en la X.
  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });

  // Cerrar modal al hacer click fuera del contenido.
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// ===============================
// |         Dark mode           |
// ===============================
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Función auxiliar para aplicar estado.
function applyDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark-mode");
    darkModeToggle.textContent = "🌙";
    localStorage.setItem("darkMode", "false");
  }
}

// Inicializar estado al cargar el DOM.
window.addEventListener("DOMContentLoaded", () => {
  // Leer preferencia (por seguridad, cualquier valor distinto a "true" se considera "false").
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  applyDarkMode(savedDarkMode);
});

// Toggle al hacer click (si existe el botón).
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    // Actualizar ícono y localStorage.
    darkModeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark ? "true" : "false");
  });
}

// ===============================
// |      Menú hamburguesa       |
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });

  // Cerrar menú al hacer clic en un enlace.
  const navLinks = document.querySelectorAll("#menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });

  // Cerrar menú al hacer clic fuera de él.
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });
}