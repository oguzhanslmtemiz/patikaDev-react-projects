import React, { useEffect } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import FadeLoader from "react-spinners/FadeLoader";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import styles from "./Weather.module.scss";

export default function Weather() {
  const { isFetching, setIsFetching, forecast, units } = useWeatherContext();

  useEffect(() => {
    if (Object.keys(forecast).length !== 0) {
      console.log("++", forecast);
      setIsFetching(false);
    }
  }, [forecast, setIsFetching]);

  return (
    <div className={styles.container}>
      <FadeLoader loading={isFetching} color="white" css={"margin-top: 50%;"} />
      {Object.keys(forecast).length !== 0 && !isFetching && (
        <div className={styles.today}>
          <div className={styles.city}>
            {forecast.city + ", " + forecast.country}{" "}
            <img
              alt="flag"
              src={`https://openweathermap.org/images/flags/${forecast.country.toLowerCase()}.png`}
              className={styles.flag}
            />
          </div>
          <div className={styles.icon}>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.data.current.weather[0].icon}@4x.png`}
              alt="forecast-icon"
            />
          </div>
          <div className={styles.desc}>
            {forecast.data.current.weather[0].description}
          </div>
          <div className={styles.temp}>
            {forecast.data.current.temp}°{units === "metric" ? "C" : "F"}
          </div>
          <div className={styles.other}>
            <span>
              <WiHumidity /> {forecast.data.current.humidity}
            </span>
            <span>
              <WiStrongWind /> {forecast.data.current.wind_speed}
              {units === "metric" ? " m/s" : " mph"}
            </span>
            <span>
              <WiBarometer /> {forecast.data.current.pressure} hPa
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
