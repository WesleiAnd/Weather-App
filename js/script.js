// Define a chave da API para autenticação na OpenWeatherMap
const apiKey = "1afe7d6ff4d75584ff50d02b2921a710";

// Define a URL base da API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Referências dos elementos da interface
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// ✅ Função assíncrona para buscar os dados do clima
async function checarTempo(city) {
    if (!city) {
        console.warn("Cidade não informada.");
        return;
    }

    try {
        const resposta = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await resposta.json();

        if (data.cod !== 200) {
            console.error("Erro da API:", data.message);
            return;
        }

        console.log(data); // Para debug

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Define o ícone de clima conforme a resposta da API
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "img/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "img/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "img/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "img/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "img/mist.png";
                break;
            case "Snow":
                weatherIcon.src = "img/snow.png";
                break;
            default:
                weatherIcon.src = ""; // Imagem padrão ou vazia
        }

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// ✅ Evento de clique no botão
searchBtn.addEventListener("click", () => {
    checarTempo(searchBox.value);
});
