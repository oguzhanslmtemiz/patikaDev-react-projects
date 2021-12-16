import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import FadeLoader from "react-spinners/FadeLoader";
import TodayWeather from "./TodayWeather";
import DailyWeather from "./DailyWeather";
import styles from "./Weather.module.scss";

export default function Weather() {
  const { isFetching, setIsFetching, forecast, units, lang } =
    useWeatherContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const weatherProps = { forecast, imageLoaded, setImageLoaded, units, lang };
  useEffect(() => {
    if (Object.keys(forecast).length !== 0) {
      setIsFetching(false);
      setImageLoaded(false);
    }
  }, [forecast, setIsFetching]);

  return (
    <div className={styles.container}>
      <FadeLoader
        loading={isFetching}
        color="white"
        css={"margin-top: 30vh;"}
      />
      {Object.keys(forecast).length !== 0 && !isFetching && (
        <>
          <TodayWeather {...weatherProps} />
          <DailyWeather {...weatherProps} />
        </>
      )}
    </div>
  );
}
