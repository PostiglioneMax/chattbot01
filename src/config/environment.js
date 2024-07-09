import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;
export const dbUri = process.env.DB_URI || 'mongodb+srv://postisama22:qWHGm8CmSN2Yvppr@chattbotcluster.ww0dyux.mongodb.net/?retryWrites=true&w=majority&appName=ChattBotCluster';
export const weatherApiKey = process.env.WEATHER_API_KEY;
