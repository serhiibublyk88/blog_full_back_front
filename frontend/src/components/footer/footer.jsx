import { useEffect, useState } from "react";
import styled from "styled-components";

export const FooterContainer = ({ className }) => {
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
    )
      .then((res) => res.json())
      .then((data) => {
        
        const currentWeather = data.current_weather;
        setTemperature(currentWeather.temperature);
        setWindSpeed(currentWeather.windspeed);
        setHumidity(data.hourly.relative_humidity_2m[0]); 
        setCurrentTime(currentWeather.time); 
      });
  }, []);

  return (
    <div className={className}>
      <div>
        <div>Blog web-developer </div>
        <div>web@developer.de</div>
      </div>
      <div>
        <div>
          Berlin,{" "}
          {new Date(currentTime).toLocaleString("en", {
            day: "numeric",
            month: "long",
          })}
        </div>
        <div>
          {temperature}°C, wind: {windSpeed} m/s
        </div>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 120px;
  padding: 20px 40px;
  font-weight: bold;
  background-color: #fff;
  box-shadow: 0px 2px 17px #000;
`;
