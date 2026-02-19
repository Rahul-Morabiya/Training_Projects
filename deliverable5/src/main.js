import { fetchWeather } from "./api/weather.js";
import { renderWeather, showError, showLoading } from "./ui/dom.js";
const form = document.getElementById("weather-form");
const input = document.getElementById("city-input");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (!city)
        return;
    showLoading();
    try {
        const weather = await fetchWeather(city);
        renderWeather(weather);
    }
    catch (error) {
        if (error instanceof Error)
            showError(error.message);
        else
            showError("Unknown Error");
    }
});
