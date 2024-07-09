import { getWeather } from "../services/weatherService.js";

export const getWeatherForLocation = async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: "Location parameter is required" });
  }

  try {
    const weather = await getWeather(location);
    res.json({ location, weather });
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo el clima" });
  }
};
