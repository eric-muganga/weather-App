import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import cardBackground from "../assets/mountain.jpg";

function WeatherForecast() {
  const { name } = useParams();
  const cities = useSelector((state) => state.weather.cities);

  const cityData = cities.find((city) => city.name === name); // Adjusted to use object access for normalized state

  if (!cityData) {
    return (
      <div className="text-white text-center mt-20">
        No forecast available for {name}.
      </div>
    );
  }

  const { forecast } = cityData.weather;

  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="bg-cover bg-no-repeat bg-blend-overlay bg-slate-500 transition-all ease-in-out hover:bg-stone-600 bg-opacity-45 rounded-xl shadow-lg p-4 m-2 text-white relative"
            style={{ backgroundImage: `url(${cardBackground})` }}
          >
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">
                {format(parseISO(day.date), "EEEE, MMM d")}
              </h3>
              <img
                src={`https:${day.day.condition.icon}`}
                alt="Weather Icon"
                className="w-20 h-20"
              />
              <p className="text-md mt-2">{day.day.condition.text}</p>
              <div className="flex justify-center items-center flex-wrap gap-2 p-2 w-full mt-4 bg-white bg-opacity-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-semibold">Max Temp.</p>
                  <p className="font-bold text-lg">{day.day.maxtemp_c}°C</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">Min Temp.</p>
                  <p className="font-bold text-lg">{day.day.mintemp_c}°C</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">Rain</p>
                  <p className="font-bold text-lg">
                    {day.day.daily_chance_of_rain}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">Wind</p>
                  <p className="font-bold text-lg">{day.day.maxwind_kph} kph</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
