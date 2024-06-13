import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SetTime from "./SetTime";
import clearSun from "../Images/sun.png";
import clearMoon from "../Images/moon.png";
import clearcloudySun from "../Images/clear_cloudy_sun.png";
import clearcloudyMoon from "../Images/clear_cloudy_moon.png";
import cloudy from "../Images/cloudy.png";
import hazeSun from "../Images/haze_sun.png";
import wind from "../Images/wind.png";
import lightrainSun from "../Images/light_rain_sun.png";
import lightrainMoon from "../Images/light_rain_moon.png";
import snow from "../Images/snow.webp";
import error from "../Images/error-icon.png";
const apiKey = process.env.REACT_APP_API_KEY;
// import.meta.env.VITE_API_KEY 

export default function WeatherCard() {
  const [search, setSearch] = useState("mumbai");
  const [tempData, setTempData] = useState(null);
  const [windData, setWindData] = useState(null);
  const [weatherText, setWeatherText] = useState();
  const [weatherImg, setWeatherImg] = useState();
  const [CFunits, setCFunits] = useState("°C");
  const hour = new Date().getHours();
  let units = "metric";

  const fetchapi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherText(data.weather);
    setWeatherImg(data.weather);
    setTempData(data.main);
    setWindData(data.wind);
  };
  useEffect(() => {
    fetchapi();
  }, [search]);
  
  // function to convert temperatures to celcius --
  function celciustoFah(){
    units = "imperial";
    fetchapi();
    setCFunits("°F");
  }
  
  // function to convert temperatures to fah --
  function FahtoCelcius(){
    units = "metric";
    fetchapi();
    setCFunits("°C");
  }

  // weather condition text func --
  let valueText;
  function weatherTextfunc(){
    if(valueText === "Clouds"){
        valueText = "Cloudy"
    }
    if(valueText === "Rain"){
        valueText = "Rainy"
    }
    return valueText;
  } 

  // weather condition images func ---
  let img;
  let Imgvalue;
  const weatherImgfunc = () => {
    const isDay = hour > 5 && hour < 20;
    const weatherMapping = {
        "clear sky": isDay ? clearSun : clearMoon,
        "few clouds": isDay ? clearcloudySun : clearcloudyMoon,
        "scattered clouds": isDay ? clearcloudySun : clearcloudyMoon,
        "broken clouds": isDay ? clearcloudySun : clearcloudyMoon,
        "haze": isDay ? hazeSun : cloudy,
        "overcast clouds": cloudy,
        "smoke": cloudy,
        "mist": wind,
        "fog": wind,
        "moderate rain": isDay ? lightrainSun : lightrainMoon,
        "light rain": isDay ? lightrainSun : lightrainMoon,
        "light snow": snow,
        "snow": snow,
        "default": error
    };
    img = weatherMapping[Imgvalue] || weatherMapping["default"];
    return img;
  };

  return (
      <div className="main_container">
        <div className="box">
          <div className="headerbar">
            <div className="search-container">
              <FormControl variant="standard">
                <Input
                  id="input-with-icon-adornment"
                  placeholder="Search City"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  value={search}
                  spellCheck={false}
                  autoFocus={true}
                  autoComplete="off"
                  style={{ height: "50px", padding: "10px" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "white" }} />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            {tempData && <div className="temp_buttons">
              <button type="button" onClick={FahtoCelcius} >°C</button>
              <button type="button" onClick={celciustoFah} >°F</button>
            </div>}
          </div>

          {!tempData ? (
            <h1 style={{ margin: "100px 0" }}>No data found</h1>
          ) : (
            <div
              className="result_container"
              id="result_container_id"
              style={{ width: "100%" }}
            >
              <div className="temp_container" id="temp_container_id">
                <div>
                  <h1 style={{ textTransform: "capitalize" }}>{search}</h1>
                </div>
                <SetTime />
                <div className="weather_condition">
                  <Stack className="weather_condition_text">
                    {weatherText?.map((elem, index) => {
                        valueText = elem.main
                        weatherTextfunc()
                      return (
                        <Chip
                          label={valueText}
                          key={`chip${elem.main}`}
                          variant="outlined"
                          id="weather_condition_textid"
                          style={{ letterSpacing: "0.05rem" }}
                        />
                      );
                    })}
                  </Stack>
                  <div className="weather_condition_img">
                    {weatherImg?.map((elem, index) => {
                      Imgvalue = elem.description;
                      weatherImgfunc()
                      return (
                        <img
                          key={`weatherimg${elem.description}`}
                          src={img}
                          alt="weather condition img"
                          style={{ width: "120px", height: "120px" }}
                        />
                      );
                    })}
                  </div>
                  <div className="current_temp">
                    <h2>
                      {tempData.temp} {CFunits}
                    </h2>
                  </div>
                  <div className="min_max_temp">
                    <span style={{ marginRight: "15px" }}>
                      Min: {tempData.temp_min} {CFunits}
                    </span>
                    <span>
                      Max: {tempData.temp_max} {CFunits}
                    </span>
                  </div>
                </div>

                <div className="temp_conditions" id="temp_conditions_id">
                  <div className="temp_condition_items" id="real_feel_temp">
                    <DeviceThermostatIcon className="temp_icon" />
                    <div className="temp_item">
                      <h6> Real feel </h6>
                      <p>
                        {tempData.feels_like}
                        {CFunits}
                      </p>
                    </div>
                  </div>
                  <div className="temp_condition_items" id="humidity">
                    <WaterDropIcon className="temp_icon" />
                    <div className="temp_item">
                      <h6> Humidity </h6>
                      <p> {tempData.humidity}% </p>
                    </div>
                  </div>
                  {!windData ? (
                    <p style={{ color: "red" }}>Error not found</p>
                  ) : (
                    <div className="temp_condition_items" id="wind">
                      <AirIcon className="temp_icon" />
                      <div className="temp_item">
                        <h6> Wind </h6>
                        <p> {windData.speed}m/s </p>
                      </div>
                    </div>
                  )}
                  <div className="temp_condition_items" id="pressure">
                    <SpeedIcon className="temp_icon" />
                    <div className="temp_item">
                      <h6> Pressure </h6>
                      <p> {tempData.pressure} hPa </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
  );
}
