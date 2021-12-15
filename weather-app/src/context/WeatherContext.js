import React, { createContext, useState, useContext } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [coord, setCoord] = useState({ lat: 41.0351, lon: 28.9833 });
  const [units, setUnits] = useState("metric");
  const [lang, setLang] = useState("tr");
  const [forecast, setForecast] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const values = {
    city,
    setCity,
    coord,
    setCoord,
    units,
    setUnits,
    lang,
    setLang,
    forecast,
    setForecast,
    isFetching,
    setIsFetching,
  };
  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
}

export const useWeatherContext = () => useContext(WeatherContext);
