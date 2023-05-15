const cssPromises = {};

// функция, которая будет уметь загружать какой-то ресурс
function loadResource(src) {
  //JS модуль
  if (src.endsWith(".js")) {
    return import(src);
  }
  // css файл
  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  // данные сервера (будут загружены автоматически, если вышеуказанные условия по другим файлам не сработали)
  return fetch(src).then((res) => res.json());
}

const appContainer = document.getElementById("app");

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map((src) => loadResource(src))).then(
    async ([pageModule, result]) => {
      if (moduleName === "./filmsDetails.js") {
        const lists = await infoSection(result.result.properties);
        result.result.properties.planets = lists.planets;
        result.result.properties.characters = lists.characters;
        result.result.properties.species = lists.species;
        result.result.properties.starships = lists.starships;
        result.result.properties.vehicles = lists.vehicles;
      }

      appContainer.innerHTML = "";
      appContainer.append(pageModule.render(result));
    }
  );
}

async function infoSection(apiUrl) {
  const infoResult = { characters: [], planets: [], species: [], starships: [], vehicles: [] };
  const promiseCharacters = apiUrl.characters.map((src) => loadResource(src));
  const promisePlanets = apiUrl.planets.map((src) => loadResource(src));
  const promiseSpecies = apiUrl.species.map((src) => loadResource(src));
  const promiseStarships = apiUrl.starships.map((src) => loadResource(src));
  const promiseVehicles = apiUrl.vehicles.map((src) => loadResource(src));

  await Promise.all(promiseCharacters).then((characters) => {
    infoResult.characters.push(
      ...characters.map((character) => character.result)
    );
  });

  await Promise.all(promisePlanets).then((planets) => {
    infoResult.planets.push(...planets.map((planet) => planet.result));
  });

  await Promise.all(promiseSpecies).then((species) => {
    infoResult.species.push(...species.map((spec) => spec.result));
  });

  await Promise.all(promiseStarships).then((starships) => {
    infoResult.starships.push(...starships.map((starship) => starship.result));
  });

  await Promise.all(promiseVehicles).then((vehicles) => {
    infoResult.vehicles.push(...vehicles.map((vehicle) => vehicle.result));
  });

  return infoResult;
}

export default function params() {
  const searchParams = new URLSearchParams(location.search);
  const filmId = searchParams.get("filmId");
  if (filmId) {
    // загрузка детальной страницы товара
    renderPage(
      "./filmsDetails.js",
      `https://www.swapi.tech/api/films/${filmId}`,
      "./style.css"
    );
  } else {
    renderPage(
      "./filmsList.js",
      "https://www.swapi.tech/api/films",
      "./style.css"
    );
  }
}

params();
