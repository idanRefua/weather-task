import React, { useState } from "react";
import "./dark-light-mode.style.css";

const DarkLightMode = () => {
  const setDarkTheme = () => {
    document.querySelector("body").setAttribute("theme", "dark");
    localStorage.setItem("themeStyle", "dark");
  };

  const setLightTheme = () => {
    document.querySelector("body").setAttribute("theme", "light");
    localStorage.setItem("themeStyle", "light");
  };

  const themeColor = localStorage.getItem("themeStyle");

  if (themeColor === "dark") {
    setDarkTheme();
  }

  const changeTheme = (e) => {
    if (e.target.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };

  return (
    <div className="form-check form-switch  dark-light-input-box">
      <input
        className="form-check-input dark-light-input"
        type="checkbox"
        id="flexSwitchCheckChecked"
        onChange={changeTheme}
        defaultChecked={themeColor === "dark"}
      />
      <label
        className="form-check-label label-dark-light-mode"
        htmlFor="flexSwitchCheckChecked"
      >
        Dark/Light Mode
      </label>
    </div>
  );
};

export default DarkLightMode;
