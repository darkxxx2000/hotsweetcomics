const params = new URLSearchParams(location.search);

const serieID = params.get("serie");
const capIndex = Number(params.get("cap"));

const grid = document.getElementById("thumbGrid");
const viewer = document.getElementById("viewer");
const bigImg = document.getElementById("bigImg");

let current = 0;
let images = [];
let pan;

// =======================================
// CARGAR JSON
// =======================================

fetch("./data/data.json?v=" + Date.now())

.then(response => {

  if (!response.ok) {
    throw new Error("No se pudo cargar data.json");
  }

  return response.json();

})

.then(data => {

  console.log("DATA:", data);

  // BUSCAR SERIE
  const serie = data.series.find(
    s => String(s.id) === String(serieID)
  );

  if (!serie) {

    document.body.innerHTML += `
      <h2 style="text-align:center;color:red;">
        Serie no encontrada
      </h2>
    `;

    return;
  }

  // BUSCAR CAP
  const cap = serie.capitulos[capIndex];

  if (!cap) {

    document.body.innerHTML += `
      <h2 style="text-align:center;color:red;">
        Capítulo no encontrado
      </h2>
    `;

    return;
  }

  // IMAGENES
  images = cap.imagenes;

  // SI USA OBJETOS
  if (typeof images[0] === "object") {
    images = images.map(img => img.url);
  }

  // MINIATURAS
  images.forEach((src, i) => {

    const img = document.createElement("img");

    img.src = src;

    img.loading = "lazy";

    img.onclick = () => {

      current = i;

      openViewer();

    };

    grid.appendChild(img);

  });

})

.catch(err => {

  console.error(err);

  document.body.innerHTML += `
    <h1 style="
      text-align:center;
      color:red;
      margin-top:40px;
    ">
      ERROR CARGANDO CONTENIDO
    </h1>

    <p style="
      text-align:center;
      color:white;
    ">
      Revisá:
      <br><br>
      data/data.json
      <br>
      rutas de imágenes
      <br>
      GitHub Pages
    </p>
  `;

});

// =======================================
// VISOR
// =======================================

function openViewer() {

  bigImg.src = images[current];

  viewer.style.display = "flex";

  if (pan) pan.destroy();

  pan = Panzoom(bigImg, {
    maxScale: 6,
    minScale: 1
  });

}

// =======================================
// NEXT
// =======================================

function next() {

  if (current < images.length - 1) {

    current++;

    openViewer();

  }

}

// =======================================
// PREV
// =======================================

function prev() {

  if (current > 0) {

    current--;

    openViewer();

  }

}

// =======================================
// CLICK
// =======================================

bigImg.onclick = () => next();

// =======================================
// TECLADO
// =======================================

document.addEventListener("keydown", e => {

  if (viewer.style.display === "flex") {

    if (e.key === "ArrowRight") next();

    if (e.key === "ArrowLeft") prev();

    if (e.key === "Escape") {

      viewer.style.display = "none";

    }

  }

});

// =======================================
// CERRAR
// =======================================

document.getElementById("closeBtn").onclick = () => {

  viewer.style.display = "none";

};
