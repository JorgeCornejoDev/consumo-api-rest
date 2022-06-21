const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2";
const API_URL_FAVOURITES = "https://api.thedogapi.com/v1/favourites";
const API_URL_FAV_Delete = (id) => `https://api.thedogapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = "https://api.thedogapi.com/v1/images/upload";

const API_KEY = '82a9f414-32b6-4e37-9438-ba1e32f5226d';


const spanError = document.getElementById('error');
const spanErrorFavoritos = document.getElementById('errorFavoritos');

async function loadRandomDogs() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    if (res.status !== 200){
        spanError.innerHTML = 'Lo sentimos, hubo un error '+  res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');

        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        btn1.onclick = () => saveFavorites(data[0].id);
        btn2.onclick = () => saveFavorites(data[1].id);

        img1.src = data[0].url;
        img2.src = data[1].url;
    }

};
async function loadFavorites() {
    const res = await fetch(API_URL_FAVOURITES , {
        method: 'GET',
        headers: {
            'X-API-KEY': `${API_KEY}`
        }
    });
    const data = await res.json();
    if (res.status !== 200){
        spanErrorFavoritos.innerHTML = 'Lo sentimos, hubo un error en los favoritos ' + res.status;
    } else {
        cleanFavs();
        data.forEach( item => {
            createItemForDog(item);
        });
        setTimeout(() => {
            spanErrorFavoritos.innerHTML = 'Perrito Guardado';
        },3000)
        
    }
};

function createItemForDog(item){
    const section = document.getElementById('favoritesDog');
    const article = document.createElement('article');
    const img = document.createElement('img');
    const btn = document.createElement('button');
    
    btn.onclick = () => deleteFavs(item.id);

    const btnText = document.createTextNode('Sacar al perrito de favs')
    btn.appendChild(btnText);
    img.src = item.image.url;
    img.width = 250;
    article.appendChild(img);
    article.appendChild(btn);
    section.appendChild(article);

}
async function saveFavorites(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${API_KEY}`
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await res.json();
    if (res.status !== 200){
        spanErrorFavoritos.innerHTML = 'Lo sentimos, hubo un error en los favoritos ' + res.status + data.message;
    } else {
        loadFavorites();
    }
};

async function deleteFavs( id ) {
    const res = await fetch(API_URL_FAV_Delete( id ), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': `${API_KEY}`
        }
    });
    loadFavorites();
};

function cleanFavs() {
    const section = document.getElementById('favoritesDog');
    section.innerText = '';
    const h2 = document.createElement('h2');
    h2.innerText = 'My Favorites Dogs'
}


async function uploadDogPic() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file')); // información del formulario
    
    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': `${API_KEY}`
        },
        body: formData,
    }) 

    console.log( res );

    const data = await res.json();
    if (res.status !== 200){
        spanErrorFavoritos.innerHTML = 'Lo sentimos, hubo un error al cargar la imagen ' + res.status + data.message;
    } else {
        loadFavorites();
    }
}
loadRandomDogs();
loadFavorites();
