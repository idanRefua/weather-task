import React from "react";
import "./day-component.style.css";

const DayComponent = (props) => {
  return (
    <div
      className="card m-3 day-weather-box"
      style={{ width: "14.4rem", height: "14rem" }}
    >
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-center card-title-day-weather">
          {props.day},{props.numberDay} {props.month}
        </h6>
        <p className="card-text d-flex justify-content-center mt-4">
          {props.minTemp}
          {props.minUnit} - {props.maxTemp}
          {props.maxUnit}
        </p>
      </div>
    </div>
  );
};

export default DayComponent;
