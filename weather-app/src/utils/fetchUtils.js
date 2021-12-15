import axios from "axios";

export const fetchLocation = async (city, units, lang) => {
  try {
    const { data } = await axios.get(
      `/.netlify/functions/searchLocation?city=${city}&units=${units}&lang=${lang}`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export const fetchForecast = async (coord, city, country, units, lang) => {
  const { lat, lon } = coord;
  const { data } = await axios.get(
    `/.netlify/functions/getForecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
  );
  return { data, city, country };
};
