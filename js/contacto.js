document.addEventListener("DOMContentLoaded", function () {
  fetch('json/links.json')
      .then(response => response.json())
      .then(data => {
          document.getElementById("email").value = data.email;
          document.getElementById("linkedin").href = data.linkedin;
          document.getElementById("github").href = data.github;
      })
      .catch(error => console.error("Error cargando los links:", error));

  // Función para abrir el email en la app de correo
  document.getElementById("sendEmail").addEventListener("click", function () {
      const email = document.getElementById("email").value;
      window.location.href = `mailto:${email}`;
  });

  // Función para copiar el email al portapapeles
  document.getElementById("copyEmail").addEventListener("click", function () {
      const emailField = document.getElementById("email");
      const notification = document.getElementById("copyNotification");

      navigator.clipboard.writeText(emailField.value).then(() => {
          notification.classList.remove("hidden");
          setTimeout(() => notification.classList.add("hidden"), 2000);
      }).catch(err => console.error("Error copiando el email:", err));
  });
});
