export const getMeteorsByDateRange = async (startDate, endDate) => {
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`
  );

  return await response.json();
};

export const getMarsRoverPhoto = async (API_KEY) => {
  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${API_KEY}`
  );

  return await response.json();
};
