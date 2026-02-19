const API_KEY = "ed079f2523e40a7320b659b912971038";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
export async function fetchWeather(city) {
    try {
        const res = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!res.ok) {
            throw new Error("City Not Found");
        }
        const data = await res.json();
        return {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind: data.wind.speed,
        };
    }
    catch (error) {
        if (error instanceof Error)
            throw error;
        throw new Error("Something else went wrong");
    }
}
;
