import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFootballData = async (country) => {
  try {
    console.log('Ruta del archivo:', path.join(__dirname, '../models/footballData.json'));
    const jsonData = fs.readFileSync(path.join(__dirname, '../models/footballData.json'), 'utf8');
    const data = JSON.parse(jsonData);

    console.log('Datos del archivo JSON:', data);
    return data[country] || [];
  } catch (error) {
    console.error('Error fetching football data:', error);
    throw new Error('Failed to fetch football data');
  }
};

