import { formatResponse } from '../utils/responseFormatter.js';

export const getLeagueStandings = async (req, res) => {
  try {
    const { country } = req.query;
    const standings = await sportsService.fetchLeagueStandings(country);
    res.status(200).json(formatResponse(standings));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
