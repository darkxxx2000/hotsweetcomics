// Datos de ejemplo: franquicias con capítulos e imágenes
const data = {
  franquicia1: [
    { titulo: "Capítulo 1", imagen: "cap1_franquicia1.jpg" },
    { titulo: "Capítulo 2", imagen: "cap2_franquicia1.jpg" },
    { titulo: "Capítulo 3", imagen: "cap3_franquicia1.jpg" }
  ],
  franquicia2: [
    { titulo: "Capítulo 1", imagen: "cap1_franquicia2.jpg" },
    { titulo: "Capítulo 2", imagen: "cap2_franquicia2.jpg" },
    { titulo: "Capítulo 3", imagen: "cap3_franquicia2.jpg" }
  ]
};

const franquicias = document.querySelectorAll('.card');
const capitulosSection = document.getElementById('capitulos');

franquicias.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    mostrarCapitulos(id);
  });
});

function mostrarCapitulos(franquiciaId) {
  capitulosSection.innerHTML = ""; // limpia capítulos anteriores
  data[franquiciaId].forEach(cap => {
    const div = document.createElement('div');
    div.className = 'capitulo';
    div.innerHTML = `
      <img src="${cap.imagen}" alt="${cap.titulo}">
      <p>${cap.titulo}</p>
    `;
    capitulosSection.appendChild(div);
  });
}
