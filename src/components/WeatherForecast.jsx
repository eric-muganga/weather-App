import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import cardBackground from "../assets/mountain.jpg";

function WeatherForecast() {
  const { name } = useParams();
  const cities = useSelector((state) => state.weather.cities);

  const cityData = cities.find((city) => city.name === name);

  if (!cityData) {
    return <div>No forecast available for {name}.</div>;
  }

  const { forecast } = cityData.weather;

  return (
    <div className="max-w-3xl mx-auto p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="bg-cover bg-no-repeat bg-blend-overlay bg-slate-500 transition-all ease-in-out hover:bg-stone-600 bg-opacity-45 rounded-xl shadow-lg p-4 m-2 text-white "
            style={{ backgroundImage: `url(${cardBackground})` }}
          >
            <h3 className="font-semibold text-lg">
              {format(parseISO(day.date), "EEEE, MMM d")}
            </h3>
            <img
              src={`https:${day.day.condition.icon}`}
              alt="Weather Icon"
              className="w-20 mx-auto"
            />
            <p>{day.day.condition.text}</p>
            <ul>
              <li>
                <strong>Max Temp:</strong> {day.day.maxtemp_c}°C
              </li>
              <li>
                <strong>Min Temp:</strong> {day.day.mintemp_c}°C
              </li>
              <li>
                <strong>Chance of Rain:</strong> {day.day.daily_chance_of_rain}%
              </li>
              <li>
                <strong>Wind Speed:</strong> {day.day.maxwind_kph} kph
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
