import { WeatherData } from "../types";

const statusEl=document.getElementById("status")!;
const resultEl=document.getElementById("weather-result")!;

export function showLoading(){
    resultEl.hidden=true;
    statusEl.className="status-loading";
    statusEl.textContent="Loading ..."
}

export function showError(msg:string){
    resultEl.hidden=true;
    statusEl.className="status-error";
    statusEl.textContent=msg;
}

export function renderWeather(data:WeatherData){
    statusEl.textContent="";
    resultEl.hidden=false;
    
    resultEl.innerHTML = `
    <h3>${data.city}</h3>
    <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}" />
    <p><strong>${data.temperature}°C</strong></p>
    <p>${data.description}</p>
    <p>Humidity: ${data.humidity}%</p>
    <p>Wind: ${data.wind} m/s</p>
  `;

}