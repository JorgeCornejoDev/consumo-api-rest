
async function nuevoPersonaje() {
    const random = Math.random() * 400
    const calculo = Math.floor(random)
    const URL = "https://rickandmortyapi.com/api/character/"+calculo;
    const res = await fetch(URL);
    const data = await res.json();
    const img = document.querySelector('img');
    const nombre = document.querySelector('h2');
    img.src = data.image;
    nombre.innerHTML = data.name;
};

nuevoPersonaje();
