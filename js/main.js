// dark mode toggle
const toggleDarkMode = () => {
    const body = document.body;
    const cardHeaders = document.querySelectorAll('.card-header');
    body.classList.toggle('dark-mode');
    cardHeaders.forEach(header => {
        header.classList.toggle('bg-dark');
        header.classList.toggle('text-white');
    });
};

const darkModeBtn = document.getElementById("dark-mode-toggle");
darkModeBtn.addEventListener("click", toggleDarkMode);


async function  getWeatherData(location) {
    const apiKey = "31f871294bef6e71e10ee3a0e34ee522";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},us&units=metric&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const weatherData = {
            temperature: data.main.temp,
            condition:data.weather[0].main,
            location:data.name,
        };
        console.log(data);
        return weatherData;
    } catch (error) {
        console.log (error);
        throw error;
    }
}


function updateUI (weatherData) {
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const location = document.getElementById("location");
    const image = document.getElementById("image");

    temperature.textContent = `${weatherData.temperature}°C`;
    condition.textContent = weatherData.condition;
    location.textContent = weatherData.location;

    if (condition === "Clouds" ){
        image.src = "img/1161797901.jpg";
    }
}

const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");

searchBtn.addEventListener("click", () => {
    const location = searchBar.value;
    getWeatherData(location)
    .then(weatherData => {
        updateUI(weatherData);
    })
    .catch(error => {
        console.log(error);
    });
});

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    html.dataset.bsTheme = html.dataset.bsTheme === 'dark' ? 'light' : 'dark';
  });

  