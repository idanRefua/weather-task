import "./city-favourite-card.style.css";
import React from "react";

const CityFavouriteCard = (props) => {
  const handleClickSendKey = () => {
    props.onSendKey(props.cityName);
  };

  return (
    <div
      key={props.id}
      className="card m-3 city-favourite-card "
      style={{ width: "15rem", height: "15rem" }}
      onClick={handleClickSendKey}
    >
      <div className="card-body">
        <h2 className="card-title d-flex justify-content-center">
          {props.cityName}
        </h2>
        <h5 className="card-title d-flex justify-content-center">
          {props.temperature}
          {props.unit}
        </h5>
        <h5 className="card-text d-flex justify-content-center mt-4">
          {props.weatherText}
        </h5>
      </div>
    </div>
  );
};

export default CityFavouriteCard;
