import params from "./main.js";
export function render(data) {
  const container = document.createElement("div");
  container.classList.add("container", "py-4");
  container.innerHTML = "";

  const backBtn = document.createElement("a");
  const titleFilm = document.createElement("h1");
  const episodeNumber = document.createElement("h2");
  const content = document.createElement("div");
  const image = document.createElement("img");
  const blockRight = document.createElement("div");
  const filmDescription = document.createElement("h4");
  const director = document.createElement("h3");
  const producer = document.createElement("h3");
  const release = document.createElement("h4");
  const charactersTitle = document.createElement("div");
  const characters = document.createElement("ol");
  const planetsTitle = document.createElement("div");
  const planets = document.createElement("ol");
  const speciesTitle = document.createElement("div");
  const species = document.createElement("ol");
  const starshipsTitle = document.createElement("div");
  const starships = document.createElement("ol");
  const vehiclesTitle = document.createElement("div");
  const vehicles = document.createElement("ol");

  backBtn.classList.add("btn", "btn-light", "btn-cart", "mb-5");
  titleFilm.classList.add("h1", "text-white", "mb-3");
  episodeNumber.classList.add("h2", "text-white", "mb-3");
  content.classList.add("film-content", "d-flex", "mb-3");
  image.classList.add("img-thumbnail", "img-fluid", "film-img");
  image.style.width = "40%";
  filmDescription.classList.add("h4", "text-white", "mb-4");
  director.classList.add("h3", "text-white", "mb-4");
  producer.classList.add("h3", "text-white", "mb-4");
  release.classList.add("h2", "text-white", "mb-4");
  charactersTitle.classList.add("h2", "text-white", "mb-2");
  characters.classList.add("h4", "text-white", "mb-3");
  planetsTitle.classList.add("h2", "text-white", "mb-2");
  planets.classList.add("h4", "text-white", "mb-3");
  speciesTitle.classList.add("h2", "text-white", "mb-2");
  species.classList.add("h4", "text-white", "mb-3");
  starshipsTitle.classList.add("h2", "text-white", "mb-2");
  starships.classList.add("h4", "text-white", "mb-3");
  vehiclesTitle.classList.add("h2", "text-white", "mb-2");
  vehicles.classList.add("h4", "text-white", "mb-3");

  backBtn.textContent = "BACK TO EPISODES";
  // backBtn.href = `?films`;
  backBtn.addEventListener('click', event => {
    event.preventDefault();
    history.pushState('', '', `?films`);
    params();
  });
  titleFilm.textContent = `\"${data.result.properties.title}\"`;
  episodeNumber.textContent = `Episode № ${data.result.properties.episode_id}`;
  image.src = `./img/film_${data.result.uid}.jpg`;
  image.alt = data.result.properties.title;
  filmDescription.textContent = `${data.result.properties.opening_crawl}`;
  director.textContent = `Director: ${data.result.properties.director}`;
  producer.textContent = `Producer: ${data.result.properties.producer}`;
  release.textContent = `Release: ${data.result.properties.release_date}`;
  charactersTitle.textContent = "Characters:";
  characters.textContent = `${data.result.properties.characters
    .map((char) => char.properties.name).join(", ")}`;
  planetsTitle.textContent = "Planets:";
  planets.textContent = `${[data.result.properties.planets
      .map((planet) => planet.properties.name).join(", "),]}`;
  speciesTitle.textContent = "Species:";
  species.textContent = `${[data.result.properties.species
    .map((spec) => spec.properties.name).join(", "),]}`;
  starshipsTitle.textContent = "Starships";
  starships.textContent = `${[data.result.properties.starships
    .map((starship) => starship.properties.name).join(", "),]}`;
  vehiclesTitle.textContent = "Vehicles:";
  vehicles.textContent = `${[data.result.properties.vehicles
    .map((vehicle) => vehicle.properties.name).join(", "),]}`;

  container.append(backBtn, titleFilm, episodeNumber, content, charactersTitle, planetsTitle, speciesTitle, starshipsTitle, vehiclesTitle);
  content.append(image, blockRight);
  blockRight.append(filmDescription, director, producer, release);
  charactersTitle.append(characters);
  planetsTitle.append(planets);
  speciesTitle.append(species);
  starshipsTitle.append(starships);
  vehiclesTitle.append(vehicles);

  return container;
}
