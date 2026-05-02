<script>
const params = new URLSearchParams(location.search);
const serieID = params.get("serie");
const capIndex = Number(params.get("cap"));

fetch("data/data.json")
.then(res => res.json())
.then(data => {

  const serie = data.series.find(s => String(s.id) === String(serieID));
  if (!serie) return;

  const cap = serie.capitulos[capIndex];
  if (!cap) return;

  const images = cap.imagenes;
  const grid = document.getElementById("thumbGrid");
  const viewer = document.getElementById("viewer");
  const bigImg = document.getElementById("bigImg");

  let current = 0;
  let pan;

  // MINIATURAS
  images.forEach((src,i) => {
    const img = document.createElement("img");
    img.src = src;

    img.onclick = () => {
      current = i;
      openViewer();
    };

    grid.appendChild(img);
  });

  function openViewer(){
    bigImg.src = images[current];
    viewer.style.display = "flex";

    if (pan) pan.destroy();
    pan = Panzoom(bigImg,{maxScale:6,minScale:1});

    bigImg.parentElement.addEventListener('wheel', pan.zoomWithWheel);
  }

  function next(){
    if(current < images.length-1){
      current++;
      openViewer();
    }
  }

  function prev(){
    if(current > 0){
      current--;
      openViewer();
    }
  }

  // CLICK → SIGUIENTE
  bigImg.onclick = () => next();

  // DRAG (panzoom ya lo maneja)

  // TECLADO
  document.addEventListener("keydown", e => {
    if (viewer.style.display === "flex") {

      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") viewer.style.display = "none";

    }
  });

  // BOTÓN CERRAR
  document.getElementById("closeBtn").onclick = () => {
    viewer.style.display = "none";
  };

});
</script>
