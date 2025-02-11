document.addEventListener("DOMContentLoaded", function () {
    fetch('/public/json/links.json')
        .then(response => response.json())
        .then(linksData => {
            fetch('/public/json/proyectos.json')
                .then(response => response.json())
                .then(data => {
                    renderizarProyectos(data.proyectos, linksData);
                })
                .catch(error => console.error("Error cargando proyectos:", error));
        })
        .catch(error => console.error("Error cargando enlaces:", error));
});

function renderizarProyectos(proyectos, linksData) {
    const containerPrivados = document.getElementById("proyectos-privados");
    const containerPublicos = document.getElementById("proyectos-publicos");

    containerPrivados.innerHTML = "";
    containerPublicos.innerHTML = "";

    let privados = 0;
    let publicos = 0;

    proyectos.forEach((proyecto, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.index = index;

        if (privados >= 6 && proyecto.tipo === "privado") {
            card.classList.add("extra");
            card.style.display = "none"; // Aseguramos que estén ocultas
        }
        if (publicos >= 6 && proyecto.tipo === "publico") {
            card.classList.add("extra");
            card.style.display = "none"; // Aseguramos que estén ocultas
        }

        card.innerHTML = `
            <h3 class="text-lg font-bold">${proyecto.nombre}</h3>
            <p class="text-gray-400">${proyecto.descripcion}</p>
        `;

        card.addEventListener("click", () => {
            mostrarModal(proyecto, linksData);
        });

        if (proyecto.tipo === "privado") {
            containerPrivados.appendChild(card);
            privados++;
        } else {
            containerPublicos.appendChild(card);
            publicos++;
        }
    });

    // Ocultar el botón "Ver Más" si hay menos de 7 proyectos
    document.getElementById("verMasPrivados").style.display = privados > 6 ? "block" : "none";
    document.getElementById("verMasPublicos").style.display = publicos > 6 ? "block" : "none";
}

// Función para alternar "Ver Más" y "Ver Menos"
function toggleVerMas(tipo) {
    const container = tipo === "privados" ? document.getElementById("proyectos-privados") : document.getElementById("proyectos-publicos");
    const btn = tipo === "privados" ? document.getElementById("verMasPrivados") : document.getElementById("verMasPublicos");

    const extras = container.querySelectorAll(".extra");
    const isHidden = extras[0]?.style.display === "none";

    extras.forEach(proyecto => {
        proyecto.style.display = isHidden ? "block" : "none";
    });

    btn.textContent = isHidden ? "Ver Menos" : "Ver Más";
}

// Cargar los enlaces desde links.json para usarlos en los proyectos públicos
let enlaces = {}; // Variable global para almacenar los enlaces

fetch('json/links.json')
    .then(response => response.json())
    .then(data => {
        enlaces = data;
    })
    .catch(error => console.error("Error cargando enlaces:", error));

// Función para mostrar el modal con animación suave
function mostrarModal(proyecto) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    // Verificamos si el proyecto es público y recuperamos su enlace correcto
    let githubLink = proyecto.tipo === "publico" ? enlaces[proyecto.link] : "";

    modalContent.innerHTML = `
        <p>${proyecto.descripcion}</p>
        <ul>
            ${proyecto.detalles.map(detalle => `<li>✔️ ${detalle}</li>`).join("")}
        </ul>
        <p><strong>Tecnologías:</strong> ${proyecto.tecnologias}</p>
        <div class="modal-buttons">
            ${proyecto.tipo === "publico" ? `<a href="${githubLink}" target="_blank" class="ver-codigo">Ver Código</a>` : ""}
            <button class="close-modal" onclick="cerrarModal()">Cerrar</button>
        </div>
    `;

    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10); // Inicia la animación después de activarlo

    modal.scrollIntoView({ behavior: "smooth", block: "center" });
    //document.body.classList.add("modal-open"); // Bloquea el scroll del body
}

// Función para cerrar el modal con animación suave
function cerrarModal() {
    const modal = document.getElementById("modal");

    modal.classList.remove("show"); // Inicia la animación de cierre

    setTimeout(() => {
        modal.style.display = "none"; 
        document.body.classList.remove("modal-open"); // Restaura el scroll
    }, 300); // Esperamos la animación antes de ocultarlo completamente
}


// Función para filtrar proyectos
function filtrarProyectos(filtro) {
    fetch('json/links.json')
        .then(response => response.json())
        .then(linksData => {
            fetch('json/proyectos.json')
                .then(response => response.json())
                .then(data => renderizarProyectos(data.proyectos, filtro, linksData));
        });
}

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".ver-mas-btn").forEach(button => {
        button.addEventListener("click", function () {
            const container = this.previousElementSibling; // Encuentra el contenedor de proyectos
            container.classList.toggle("expandido");

            // Cambia el icono de + a - según el estado
            if (container.classList.contains("expandido")) {
                this.innerHTML = "&minus;"; // Símbolo de menos
            } else {
                this.innerHTML = "&plus;"; // Símbolo de más
            }
        });
    });
});