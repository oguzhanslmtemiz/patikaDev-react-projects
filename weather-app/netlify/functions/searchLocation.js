const axios = require("axios");

exports.handler = async function (event) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const { units, lang, city } = event.queryStringParameters;
  const parameters = `&units=${units}&lang=${lang}&appid=${apiKey}`;

  const WEATHER_API = encodeURI(`${baseUrl}/find?q=${city}${parameters}`);

  try {
    const { data } = await axios.get(WEATHER_API);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify(error),
    };
  }
};
