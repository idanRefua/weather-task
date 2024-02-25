import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./navbar.component.style.css";

const Navbar = ({ onMovePage, afterDetails }) => {
  const [homeActiveButton, setHomeActiveButton] = useState(true);
  const [favourtiesActiveButton, setFavouritesActiveButton] = useState(false);
  const favouritesCities = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    if (afterDetails === true) {
      setFavouritesActiveButton(false);
      setHomeActiveButton(true);
    }
  }, [afterDetails]);

  const handleHomeButton = (e) => {
    setFavouritesActiveButton(false);
    setHomeActiveButton((current) => {
      if (current === false || current === true) return true;
      else return false;
    });

    onMovePage(false);
  };
  const handleFavouritesButton = (e) => {
    setFavouritesActiveButton((current) => {
      if (current === false || current === true) return true;
      else return false;
    });
    setHomeActiveButton(false);
    onMovePage(true);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light main-nav">
      <div className="container-fluid">
        <h1 className="navbar-brand navbar-title" href="#">
          Weather Task
        </h1>

        <div className="d-flex">
          <button
            onClick={handleHomeButton}
            className={`nav-link m-2  ${homeActiveButton ? `bg-grey` : ""}`}
            href="#"
          >
            Home
          </button>
          <button
            onClick={handleFavouritesButton}
            className={`nav-link m-2 ${
              favourtiesActiveButton ? `bg-grey` : ""
            }`}
            href="#"
          >
            Favourties
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
