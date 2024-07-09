import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const weatherApiKey = "4924d7de82e4ce5092619224c98e8ba4";
const location = 'London';

const fetchWeather = async (location) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// fetchWeather(location);
