document.addEventListener("DOMContentLoaded", function () {
  fetch('/public/json/sobremi.json')
      .then(response => response.json())
      .then(data => {
          document.getElementById("descripcion").textContent = data.descripcion;
          document.getElementById("trayectoria").textContent = data.trayectoria;
          document.getElementById("especializacion").textContent = data.especializacion;
      })
      .catch(error => console.error("Error cargando el contenido de 'Sobre Mí':", error));
});
