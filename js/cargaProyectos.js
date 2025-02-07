document.addEventListener("DOMContentLoaded", function () {
  fetch('json/proyectos.json')
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById("proyectos-container");
          container.innerHTML = ""; // Limpiar antes de insertar datos

          data.proyectos.forEach(proyecto => {
              const card = document.createElement("div");
              card.className = "card";

              card.innerHTML = `
                  <h3 class="text-lg font-bold">${proyecto.nombre}</h3>
                  <p class="text-gray-400">${proyecto.descripcion}</p>
                  <p class="text-gray-400 text-sm mt-2">Tecnologías: ${proyecto.tecnologias}</p>
                  <a href="${proyecto.link}" target="_blank" class="text-blue-500">Ver más</a>
              `;

              container.appendChild(card);
          });
      })
      .catch(error => console.error("Error cargando proyectos:", error));
});