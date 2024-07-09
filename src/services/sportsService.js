const fetchLeagueStandings = async (country) => {
    const mockData = {
      Uruguay: [{ team: 'Nacional', points: 45 }, { team: 'Peñarol', points: 44 }],
      Argentina: [{ team: 'Boca Juniors', points: 50 }, { team: 'River Plate', points: 48 }],
      Spain: [{ team: 'Real Madrid', points: 60 }, { team: 'Barcelona', points: 58 }],
    };
  
    return mockData[country] || [];
  };
  
  export default { fetchLeagueStandings };
  