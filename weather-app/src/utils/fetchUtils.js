import axios from "axios";

export const fetchLocation = async (city, units, lang) => {
  try {
    const { data } = await axios.get(
      `/.netlify/functions/searchLocation?city=${city}&units=${units.value}&lang=${lang.value}`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export const fetchForecast = async (coord, city, country, units, lang) => {
  try {
    const { lat, lon } = coord;
    const { data } = await axios.get(
      `/.netlify/functions/getForecast?lat=${lat}&lon=${lon}&units=${units.value}&lang=${lang.value}`
    );
    return { data, city, country };
  } catch (error) {
    return { error };
  }
};
