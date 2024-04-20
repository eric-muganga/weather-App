import { useSelector } from "react-redux";
import WeatherCard from "./WeatherCard";

function WeatherDashboard() {
  const cities = useSelector((state) => state.weather.cities);
  return (
    <section className="max-w-5xl mx-auto p-4 py-12 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {/* {console.log(cities)} */}
      {cities.map((city, index) => (
        <WeatherCard key={index} city={city} />
      ))}
    </section>
  );
}

export default WeatherDashboard;
