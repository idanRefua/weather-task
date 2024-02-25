import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.component";
import DayComponent from "./components/DayComponent/DayComponent";
import { useDispatch, useSelector } from "react-redux";
import { favouritesActions } from "./store/favourites";
import CityFavouriteCard from "./components/CityFavouritesCard/CityFavouriteCard";
import DarkLightMode from "./components/DarkLightMode/DarkLightMode";
import CitiesAutoComplete from "./components/CitiesAutoComplete/CitiesAutoComplete";
import { toast } from "react-toastify";

function App() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dispatch = useDispatch();

  const [currentCity, setCurrentCity] = useState(null);
  const [cityFiveDaysWeather, setCityFiveDaysWeather] = useState([]);
  const [city, setCity] = useState(null);
  const favouritesCities = useSelector((state) => state.favourites.favourites);
  const [toggleHomePage, setToggleHomePage] = useState(false);
  const [userFavouritesCities, setUserFavouritesCities] = useState([]);
  const [dataUserFavourites, setDataUserFavourites] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [moveDetails, setMoveDeatils] = useState(false);
  useEffect(() => {
    const sucess = async (pos) => {
      try {
        const responseCity = await fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_SERVER_API_KEY}&q=${pos.coords.latitude},${pos.coords.longitude}&language=en-us`
        );
        const cityResponse = await responseCity.json();

        setCity(cityResponse);
        const responseCurrentWeather = await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityResponse.Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&language=en-us&details=false`
        );

        const currentCityWeather = await responseCurrentWeather.json();

        setCurrentCity(currentCityWeather[0]);

        const fiveDaysWeatherResponse = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityResponse.Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&metric=true&details=false`
        );

        const fiveDaysWeather = await fiveDaysWeatherResponse.json();

        setCityFiveDaysWeather(fiveDaysWeather.DailyForecasts);
      } catch (error) {
        toast("Problem with server,try again later");
      }
    };
    const failed = async () => {
      try {
        const responseCity = await fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_SERVER_API_KEY}&q=tel aviv&language=en-us`
        );
        const cityResponse = await responseCity.json();
        setCity(cityResponse[0]);
        const responseCurrentWeather = await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityResponse[0].Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&language=en-us&details=false`
        );

        const currentCityWeather = await responseCurrentWeather.json();

        setCurrentCity(currentCityWeather[0]);

        const fiveDaysWeatherResponse = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityResponse[0].Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&metric=true&details=false`
        );

        const fiveDaysWeather = await fiveDaysWeatherResponse.json();

        setCityFiveDaysWeather(fiveDaysWeather.DailyForecasts);
      } catch (error) {
        toast("Problem with server,try again later");
      }
    };

    navigator.geolocation.watchPosition(sucess, failed);
  }, []);

  const getDateAndDay = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getUTCDate();
    const dayOfWeekNumber = date.getDay();

    const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
    const monthOfYearName = monthNames[month];

    const obj = {
      day: dayOfWeekName,
      numberDay: day,
      month: monthOfYearName,
    };
    return obj;
  };

  const handleSendCity = async (cityName) => {
    try {
      const responseCity = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
          process.env.REACT_APP_SERVER_API_KEY
        }&q=${cityName.toString()}&language=en-us`
      );
      const cityResponse = await responseCity.json();
      if (cityResponse.length === 0) {
        toast(`we couldn't find this city`);
      } else {
        setCity(cityResponse[0]);
        const responseCurrentWeather = await fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityResponse[0].Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&language=en-us&details=false`
        );

        const currentCityWeather = await responseCurrentWeather.json();
        setCurrentCity(currentCityWeather[0]);
        const fiveDaysWeatherResponse = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityResponse[0].Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&metric=true&details=false`
        );

        const fiveDaysWeather = await fiveDaysWeatherResponse.json();
        setCityFiveDaysWeather(fiveDaysWeather.DailyForecasts);
      }
    } catch (error) {
      toast("Problem with server,try again later");
    }
  };

  const addCityToFavourites = () => {
    dispatch(
      favouritesActions.addCityToFavourites({
        id: Number(city.Key),
        name: city.LocalizedName,
      })
    );
    let newFav = {
      id: Number(city.Key),
      name: city.LocalizedName,
    };
    if (!userFavouritesCities.some((city) => city.id === Number(city.Key))) {
      setUserFavouritesCities([...userFavouritesCities, newFav]);
      toast(`${city.LocalizedName} add to your favourite list`);
    }
  };

  const removeCityFromFavourites = () => {
    dispatch(favouritesActions.removeCityFromFavourites(Number(city.Key)));
    setIsFavourite(false);
    let numberId = Number(city.Key);
    let favouritesAfterRemove = userFavouritesCities.filter((city) => {
      return city.id !== numberId;
    });
    toast("Remove from favourites");
    setUserFavouritesCities(favouritesAfterRemove);
    setDataUserFavourites(favouritesAfterRemove);
  };

  const handleKey = async (cityName) => {
    try {
      const responseCity = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_SERVER_API_KEY}&q=${cityName}&language=en-us`
      );
      const cityResponse = await responseCity.json();
      setCity(cityResponse[0]);
      const responseCurrentWeather = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityResponse[0].Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&language=en-us&details=false`
      );

      const currentCityWeather = await responseCurrentWeather.json();

      setCurrentCity(currentCityWeather[0]);

      const fiveDaysWeatherResponse = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityResponse[0].Key}?apikey=${process.env.REACT_APP_SERVER_API_KEY}&metric=true&details=false`
      );

      const fiveDaysWeather = await fiveDaysWeatherResponse.json();
      setMoveDeatils(true);
      setCityFiveDaysWeather(fiveDaysWeather.DailyForecasts);
      handleMovePage();
    } catch (error) {
      toast("Problem with server,try again later");
    }
  };

  const handleMovePage = (page) => {
    setToggleHomePage(page);
  };

  useEffect(() => {
    const fetchDta = async () => {
      const newArrayFav = [];
      for (const cityFav of userFavouritesCities) {
        try {
          const res = await fetch(
            `http://dataservice.accuweather.com/currentconditions/v1/${cityFav.id.toString()}?apikey=${
              process.env.REACT_APP_SERVER_API_KEY
            }&language=en-us&details=false`
          );
          const data = await res.json();
          data[0].id = cityFav.id;
          data[0].name = cityFav.name;
          newArrayFav.push(data[0]);
        } catch (error) {
          toast("Problem with server,try again later");
        }

        setDataUserFavourites(newArrayFav);
      }
    };
    fetchDta();
  }, [userFavouritesCities]);

  return (
    <Fragment>
      <Navbar onMovePage={handleMovePage} afterDetails={moveDetails} />
      <DarkLightMode />
      <br />
      {!toggleHomePage && (
        <div className="home container">
          <div>
            <CitiesAutoComplete onSendCityName={handleSendCity} />
          </div>
          <div className="day-box">
            {currentCity && city !== null && (
              <div className="row">
                <div className="col-sm-6">
                  <h1 className="p-2 city-name-title">{city.LocalizedName}</h1>
                  <h3 className="p-2">
                    Temperature : {currentCity.Temperature.Metric.Value}
                    {currentCity.Temperature.Metric.Unit}
                  </h3>
                </div>
                <div className="col-sm-6 text-end p-3">
                  {!favouritesCities.some(
                    (cityFavourite) => cityFavourite.id === Number(city.Key)
                  ) ? (
                    <button
                      className="btn-add-city-favourite"
                      onClick={addCityToFavourites}
                    >
                      Add To Favourites
                    </button>
                  ) : (
                    <button
                      className="btn-remove-city-favourite"
                      onClick={removeCityFromFavourites}
                    >
                      Remove from Favourites
                    </button>
                  )}
                </div>
                <h3 className="d-flex justify-content-center m-5">
                  {currentCity.WeatherText}
                </h3>
              </div>
            )}

            <div className="next-five-days row">
              {cityFiveDaysWeather.map((day) => {
                let result = getDateAndDay(day.Date);
                return (
                  <DayComponent
                    key={day.EpochDate}
                    day={result.day}
                    numberDay={result.numberDay}
                    month={result.month}
                    minTemp={day.Temperature.Minimum.Value}
                    minUnit={day.Temperature.Minimum.Unit}
                    maxTemp={day.Temperature.Maximum.Value}
                    maxUnit={day.Temperature.Maximum.Unit}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      {toggleHomePage && (
        <div className="favourites-box-page container">
          <h2 className="d-flex justify-content-center favourites-title ">
            Your Favourites cities
          </h2>
          <div className="mt-5 row">
            {dataUserFavourites.length > 0 &&
              dataUserFavourites.map((city) => {
                return (
                  <CityFavouriteCard
                    key={city.id}
                    id={city.id}
                    onSendKey={handleKey}
                    cityName={city.name}
                    temperature={city.Temperature.Metric.Value}
                    unit={city.Temperature.Metric.Unit}
                    weatherText={city.WeatherText}
                  />
                );
              })}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
