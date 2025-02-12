import axios from 'axios';

export const getWeather = async (city) => {
  const apiKey = "4924d7de82e4ce5092619224c98e8ba4";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await axios.get(url);
    const { main, weather } = response.data;
    return `El clima en ${city} es de ${main.temp}°C, Condiciones: ${weather[0].description}`;
  } catch (error) {
    console.error('Error obteniendo el clima:', error);
    throw new Error('No se pudo obtener el clima.');
  }
};
