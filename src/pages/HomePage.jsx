import Footer from "../components/Footer";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

import { useState } from "react";
//import SearchBox from "../components/SearchBox";
import AddCityDrawer from "../components/AddCityDrawer";
import WeatherDashboard from "../components/WeatherDashboard";

/// Defining my types here as you've already done
/**
 * @typedef {Object} Condition
 * @property {string} text - Description of the weather condition.
 * @property {string} icon - URL to the icon representing the weather condition.
 * @property {number} code - Numeric code representing the weather condition.
 */

/**
 * @typedef {Object} CurrentWeather
 * @property {number} last_updated_epoch - The last updated epoch.
 * @property {string} last_updated - The last updated time as a string.
 * @property {number} temp_c - Temperature in Celsius.
 * @property {number} temp_f - Temperature in Fahrenheit.
 * @property {number} is_day - Indicator if it's day (1) or night (0).
 * @property {Condition} condition - Weather condition.
 * @property {number} wind_mph - Wind speed in miles per hour.
 * @property {number} wind_kph - Wind speed in kilometers per hour.
 * @property {number} wind_degree - Wind direction in degrees.
 * @property {string} wind_dir - Wind direction as a string.
 * @property {number} pressure_mb - Pressure in millibars.
 * @property {number} pressure_in - Pressure in inches.
 * @property {number} precip_mm - Precipitation volume in millimeters.
 * @property {number} precip_in - Precipitation volume in inches.
 * @property {number} humidity - Humidity percentage.
 * @property {number} cloud - Cloud cover percentage.
 * @property {number} feelslike_c - Feels like temperature in Celsius.
 * @property {number} feelslike_f - Feels like temperature in Fahrenheit.
 * @property {number} vis_km - Visibility in kilometers.
 * @property {number} vis_miles - Visibility in miles.
 * @property {number} uv - UV index.
 * @property {number} gust_mph - Wind gust speed in miles per hour.
 * @property {number} gust_kph - Wind gust speed in kilometers per hour.
 */

/**
 * @typedef {Object} Location
 * @property {string} name - Location name.
 * @property {string} region - Region name.
 * @property {string} country - Country name.
 * @property {number} lat - Latitude.
 * @property {number} lon - Longitude.
 * @property {string} tz_id - Timezone ID.
 * @property {number} localtime_epoch - Local time as epoch.
 * @property {string} localtime - Local time as a readable string.
 *
 */

/**
 * @typedef {Object} ForecastDay
 * @property {string} date - Date of the forecast.
 * @property {number} date_epoch - The epoch time of the forecast date.
 * @property {Object} day - The forecast data during the day.
 * @property {number} day.maxtemp_c - Maximum temperature in Celsius.
 * @property {number} day.maxtemp_f - Maximum temperature in Fahrenheit.
 * @property {number} day.mintemp_c - Minimum temperature in Celsius.
 * @property {number} day.mintemp_f - Minimum temperature in Fahrenheit.
 * @property {number} day.avgtemp_c - Average temperature in Celsius.
 * @property {number} day.avgtemp_f - Average temperature in Fahrenheit.
 * @property {number} day.maxwind_mph - Maximum wind speed in mph.
 * @property {number} day.maxwind_kph - Maximum wind speed in kph.
 * @property {number} day.totalprecip_mm - Total precipitation in mm.
 * @property {number} day.totalprecip_in - Total precipitation in inches.
 * @property {number} day.avghumidity - Average humidity percentage.
 * @property {Condition} day.condition - Daily weather condition.
 * @property {number} day.uv - UV index.
 * @property {Object[]} hour - Hourly forecast data.
 */

/**
 * @typedef {Object} WeatherData
 * @property {Location} location - Location data.
 * @property {CurrentWeather} current - Current weather data.
 * @property {Object} forecast - Weather forecast data.
 */

/**
 * Fetches weather data from the API.
 * @returns {Promise<WeatherData>} The weather data as a JSON object.
 */

//const API_KEY = process.env.REACT_APP_WEATHERAPI_API_KEY;

export default function HomePage() {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <SubHeader openDrawer={openDrawer} />
      <AddCityDrawer isOpen={open} onClose={closeDrawer} />
      <WeatherDashboard />
      <Footer />
    </>
  );
}
