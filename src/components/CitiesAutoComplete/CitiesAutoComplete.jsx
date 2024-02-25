import React, { useEffect, useState } from "react";
import cities from "./cities.json";
import { toast } from "react-toastify";

const CitiesAutoComplete = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArray, setFilterArray] = useState([]);
  const array = cities.filter((city) => Number(city.pop) >= 50000);

  const handleSendSearch = () => {
    if (searchTerm === "") {
      toast("Input can't be empty");
    } else {
      props.onSendCityName(searchTerm);
      setSearchTerm("");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    let newFilterArray = array
      .filter((city) =>
        city.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 7);

    if (e.target.value === "") {
      setFilterArray([]);
      return;
    } else {
      setFilterArray(newFilterArray);
    }
  };

  const sendCityName = (e) => {
    setSearchTerm(e.currentTarget.textContent);
    setFilterArray([]);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          className="search-input-city d-flex justify-content-center form-control "
          onChange={handleSearch}
          value={searchTerm}
        />
        <button className="search-btn" onClick={handleSendSearch}>
          Search
        </button>
      </div>
      {filterArray.length > 0 && (
        <div className="d-flex justify-content-center">
          <div className="cities-options-box ">
            {filterArray.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={sendCityName}
                  className="d-flex justify-content-center city-option "
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitiesAutoComplete;
