import React from "react";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import styles from "./TodayWeather.module.scss";

export default function TodayWeather({
  forecast,
  imageLoaded,
  setImageLoaded,
  units,
}) {
  return (
    <div className={styles.today}>
      <div className={styles.city}>
        {forecast.city + ", " + forecast.country}{" "}
        <img
          alt="flag"
          src={`https://openweathermap.org/images/flags/${forecast.country.toLowerCase()}.png`}
          className={styles.flag}
        />
      </div>
      <div
        className={styles.icon}
        style={{ display: imageLoaded ? "block" : "none" }}
      >
        <img
          src={`https://openweathermap.org/img/wn/${forecast.data.current.weather[0].icon}@4x.png`}
          alt="forecast-icon"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className={styles.desc}>
        {forecast.data.current.weather[0].description}
      </div>
      <div className={styles.temp}>
        {forecast.data.current.temp}°{units.value === "metric" ? "C" : "F"}
      </div>
      <div className={styles.other}>
        <span>
          <WiHumidity /> {forecast.data.current.humidity}
        </span>
        <span>
          <WiStrongWind /> {forecast.data.current.wind_speed}
          {units.value === "metric" ? " m/s" : " mph"}
        </span>
        <span>
          <WiBarometer /> {forecast.data.current.pressure} hPa
        </span>
      </div>
    </div>
  );
}
