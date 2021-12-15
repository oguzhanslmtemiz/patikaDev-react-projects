const axios = require("axios");

exports.handler = async function (event) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const { units, lang, lat, lon } = event.queryStringParameters;
  const parameters = `&units=${units}&lang=${lang}&appid=${apiKey}`;

  const WEATHER_API = `${baseUrl}/weather?lat=${lat}&lon=${lon}${parameters}`;
  try {
    const { data } = await axios.get(WEATHER_API);
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
