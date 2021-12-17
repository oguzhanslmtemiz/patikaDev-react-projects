import React, { useEffect, useRef, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { useWeatherContext } from "../context/WeatherContext";
import { fetchLocation, fetchForecast } from "../utils/fetchUtils";
import { IoMdSearch } from "react-icons/io";
import styles from "./Search.module.scss";
import Settings from "./Settings";

export default function Search() {
  const { city, setCity, units, lang, setForecast, setIsFetching } =
    useWeatherContext();
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { count, list } = await fetchLocation(city, units, lang);
      count
        ? setLocations(list)
        : setLocations({ notFound: true, message: "Not Found" });
      setLoading(false);
      setDropdownClass("add");
      setInput("");
    };
    input && fetchData();
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input.trim());
      setLoading(true);
    }
  };

  const setDropdownClass = (method) => {
    const [inputEl, dropdownEl] = dropdownRef.current.children;
    inputEl.classList[method](styles.open);
    dropdownEl.classList[method](styles.open);
    method === "add" ? setDropdown(true) : setDropdown(false);
  };

  const handleClickOutsideDropdown = (e) => {
    dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      setDropdownClass("remove");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} ref={dropdownRef} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IoMdSearch
          style={{ left: "5px", top: "8px", position: "absolute" }}
          color="rgba(232, 232, 250, 0.5)"
          size="1.5em"
        />
        <BarLoader
          loading={loading}
          color="white"
          css={"display: inline-flex; top: -33px;"}
        />
        <ul className={styles.dropdown}>
          {dropdown && locations.notFound && (
            <li className={styles.notFound}>{locations.message}</li>
          )}
          {dropdown &&
            !locations.notFound &&
            locations.map(({ id, name, sys, main, weather, coord }) => (
              <li
                className={styles.item}
                key={id}
                onClick={async () => {
                  setIsFetching(true);
                  setDropdownClass("remove");
                  setForecast(
                    await fetchForecast(coord, name, sys.country, units, lang)
                  );
                }}
              >
                <span className={styles.country}>
                  {name}, {sys.country}{" "}
                  <img
                    alt="flag"
                    src={`https://openweathermap.org/images/flags/${sys.country.toLowerCase()}.png`}
                    className={styles.flag}
                  />
                </span>
                <span className={styles.temp}>
                  {main.temp.toFixed(1)}°{units.value === "metric" ? "C" : "F"}
                </span>
                <span className={styles.icon}>
                  <img
                    alt="icon"
                    src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
                  />
                </span>
                <span className={styles.coord}>
                  {coord.lat}, {coord.lat}
                </span>
              </li>
            ))}
        </ul>
      </form>
      <Settings />
    </div>
  );
}
