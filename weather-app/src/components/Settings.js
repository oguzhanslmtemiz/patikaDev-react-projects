import React, { useEffect, useRef, useState } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import { HiDotsVertical } from "react-icons/hi";
import Select from "react-select";
import styles from "./Settings.module.scss";

export default function Settings() {
  const { units, lang, setUnits, setLang, setForecast } = useWeatherContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langOptions = [
    { value: "af", label: "Afrikaans" },
    { value: "al", label: "Albanian" },
    { value: "ar", label: "Arabic" },
    { value: "az", label: "Azerbaijani" },
    { value: "bg", label: "Bulgarian" },
    { value: "ca", label: "Catalan" },
    { value: "cz", label: "Czech" },
    { value: "da", label: "Danish" },
    { value: "de", label: "German" },
    { value: "el", label: "Greek" },
    { value: "en", label: "English" },
    { value: "eu", label: "Basque" },
    { value: "fa", label: "Persian (Farsi)" },
    { value: "fi", label: "Finnish" },
    { value: "fr", label: "French" },
    { value: "gl", label: "Galician" },
    { value: "he", label: "Hebrew" },
    { value: "hi", label: "Hindi" },
    { value: "hr", label: "Croatian" },
    { value: "hu", label: "Hungarian" },
    { value: "id", label: "Indonesian" },
    { value: "it", label: "Italian" },
    { value: "ja", label: "Japanese" },
    { value: "kr", label: "Korean" },
    { value: "la", label: "Latvian" },
    { value: "lt", label: "Lithuanian" },
    { value: "mk", label: "Macedonian" },
    { value: "no", label: "Norwegian" },
    { value: "nl", label: "Dutch" },
    { value: "pl", label: "Polish" },
    { value: "pt", label: "Portuguese" },
    { value: "pt_br", label: "Português Brasil" },
    { value: "ro", label: "Romanian" },
    { value: "ru", label: "Russian" },
    { value: "sv", label: "Swedish" },
    { value: "sk", label: "Slovak" },
    { value: "sl", label: "Slovenian" },
    { value: "es", label: "Spanish" },
    { value: "sr", label: "Serbian" },
    { value: "th", label: "Thai" },
    { value: "tr", label: "Turkish" },
    { value: "uk", label: "Ukrainian" },
    { value: "vi", label: "Vietnamese" },
    { value: "zh_cn", label: "Chinese Simplified" },
    { value: "zh_tw", label: "Chinese Traditional" },
    { value: "zu", label: "Zulu" },
  ];
  const unitOptions = [
    { value: "metric", label: "°C, m/s" },
    { value: "imperial", label: "°F, mph" },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, [dropdownRef]);

  const handleClickOutsideDropdown = (e) => {
    dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      setOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <div className={styles.menu}>
        <HiDotsVertical onClick={() => setOpen(!open)} />
      </div>
      <div className={styles.container}>
        {open && (
          <>
            <Select
              value={units}
              options={unitOptions}
              isSearchable={false}
              onChange={(unit) => {
                setUnits(unit);
                setForecast({});
              }}
            />
            <Select
              value={lang}
              options={langOptions}
              onChange={(lang) => {
                setLang(lang);
                setForecast({});
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
