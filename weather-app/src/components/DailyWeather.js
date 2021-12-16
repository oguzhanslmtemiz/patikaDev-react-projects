import React from "react";
import moment from "moment";
import "moment/min/locales";
import styles from "./DailyWeather.module.scss";

export default function DailyWeather({ forecast, imageLoaded, units, lang }) {
  console.log("Daily:", forecast.data.daily);
  return (
    <div className={styles.daily}>
      {forecast.data.daily.slice(1).map((day) => (
        <div className={styles.card} key={day.dt}>
          <div className={styles.day}>
            {moment.unix(day.dt).locale(lang).format("dddd")}
          </div>
          <div
            className={styles.icon}
            style={{ display: imageLoaded ? "block" : "none" }}
          >
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="forecast-icon"
            />
          </div>
          <div className={styles.temp}>
            {day.temp.day.toFixed(0)}°{units === "metric" ? "C" : "F"}
          </div>
        </div>
      ))}
    </div>
  );
}
