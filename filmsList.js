import params from "./main.js";
export function render(data) {
    /*
description:  "A Star Wars Film"
characters :  ["https://www.swapi.tech/api/people/1", "https://www.swapi.tech/api/people/2",…]
created: "2023-03-15T20:24:43.476Z"
director:  "George Lucas"
edited:  "2023-03-15T20:24:43.476Z"
episode_id: 4
opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy...."
planets: ["https://www.swapi.tech/api/planets/1", "https://www.swapi.tech/api/planets/2",…]
producer:  "Gary Kurtz, Rick McCallum"
release_date: "1977-05-25"
species: ["https://www.swapi.tech/api/species/1", "https://www.swapi.tech/api/species/2",…]
starships: ["https://www.swapi.tech/api/starships/2", "https://www.swapi.tech/api/starships/3",…]
title:  "A New Hope"
url: "https://www.swapi.tech/api/films/1"
vehicles: ["https://www.swapi.tech/api/vehicles/4", "https://www.swapi.tech/api/vehicles/6",…]
uid: "1"
__v: 0
_id: "5f63a117cf50d100047f9762"
     */
    const container = document.createElement('div');
    container.classList.add(
        'container',
        'd-flex',
        'justify-content-between',
        'flex-wrap',
        'py-4'
    )

    for (const film of data.result) {
        const filmCart = document.createElement('div');
        const image = document.createElement('img');
        const cartBody = document.createElement('div');
        const cartDescr = document.createElement('div');
        const filmNumber = document.createElement('h3');
        const title = document.createElement('h2');
        const detailsButton = document.createElement('a');

        filmCart.style.width = '30%';
        filmCart.classList.add('card', 'my-4', 'card-all');
        image.classList.add('cart-img-top', 'films-img');
        cartBody.classList.add('cart-body', 'cart-content');
        cartDescr.classList.add('cart-descr', 'mb-auto');
        title.classList.add('card-title', 'text-white', 'mb-3');
        filmNumber.classList.add('card-text', 'text-white', 'mb-3');
        detailsButton.classList.add('btn', 'btn-light', 'btn-cart');

        filmCart.append(image, cartBody);
        cartBody.append(cartDescr, detailsButton);
        cartDescr.append(title, filmNumber);

        image.src = `./img/film_${film.uid}.jpg`;
        image.alt = film.properties.title;
        title.textContent = `\"${film.properties.title}\"`;
        filmNumber.textContent = `Film number by filming date № ${film.uid}`;
        detailsButton.textContent = 'DETAILS';detailsButton.addEventListener('click', event => {
          event.preventDefault();
          let state = film.uid;
          history.pushState({state}, '', `?filmId=${film.uid}`);
          params();
        })

        container.append(filmCart);
    }
    return container;
}