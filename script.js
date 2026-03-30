const data = {
  franquicia1: [
    { titulo: "Capítulo 1", imagen: "images/cap1_f1.jpg" },
    { titulo: "Capítulo 2", imagen: "images/cap2_f1.jpg" },
    { titulo: "Capítulo 3", imagen: "images/cap3_f1.jpg" }
  ],
  franquicia2: [
    { titulo: "Capítulo 1", imagen: "images/cap1_f2.jpg" },
    { titulo: "Capítulo 2", imagen: "images/cap2_f2.jpg" },
    { titulo: "Capítulo 3", imagen: "images/cap3_f2.jpg" }
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
  capitulosSection.innerHTML = "";
  data[franquiciaId].forEach(cap => {
    const div = document.createElement('div');
    div.className = 'capitulo';
    div.innerHTML = `<img src="${cap.imagen}" alt="${cap.titulo}"><p>${cap.titulo}</p>`;
    capitulosSection.appendChild(div);
  });
}
