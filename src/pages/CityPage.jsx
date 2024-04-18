import { useParams } from "react-router-dom";

import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import WeatherForecast from "../components/WeatherForecast";
//import WeatherDashboard from "../components/WeatherDashboard";

function CityPage() {
  const { name } = useParams();
  return (
    <>
      <Header />
      <section>
        <SubHeader name={name} />
        <WeatherForecast />
      </section>
    </>
  );
}

export default CityPage;
