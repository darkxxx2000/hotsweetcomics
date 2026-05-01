const franquiciasSection = document.getElementById('franquicias');
const capitulosSection = document.getElementById('capitulos');

fetch('data/data.json')
  .then(res => res.json())
  .then(data => {
    // Mostrar franquicias
    data.franquicias.forEach(f => {
      const div = document.createElement('div');
      div.className = 'franquicia';
      div.dataset.id = f.id;
      div.innerHTML = `
        <img src="${f.portada}" alt="${f.nombre}">
        <h2>${f.nombre}</h2>
      `;
      div.addEventListener('click', () => mostrarCapitulos(f.id, data.franquicias));
      franquiciasSection.appendChild(div);
    });
  });

function mostrarCapitulos(id, franquicias) {
  capitulosSection.innerHTML = '';
  const franquicia = franquicias.find(f => f.id === id);
  franquicia.capitulos.forEach(c => {
    const div = document.createElement('div');
    div.className = 'capitulo';
    div.innerHTML = `
      <img src="${c.imagen}" alt="${c.titulo}">
      <p>${c.titulo}</p>
    `;
    capitulosSection.appendChild(div);
  });
}
