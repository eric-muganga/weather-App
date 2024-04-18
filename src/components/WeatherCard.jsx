/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { format } from "date-fns/format";
import { parse } from "date-fns";

import { Menu, Transition } from "@headlessui/react"; // Headless UI for accessible components

import cardBackground from "../assets/mountain.jpg";
import { useDispatch } from "react-redux";
import { removeCity } from "../store/weatherSlice";

export default function WeatherCard({ city }) {
  const { name, weather } = city;

  const dispatch = useDispatch();

  const datetimeString = weather.location?.localtime; // "2024-04-16 23:02"

  // Ensure the datetime string is defined
  if (!datetimeString) {
    console.log(weather);
    return <div>Loading...</div>;
  }

  // Parsing the custom format
  const date = parse(datetimeString, "yyyy-MM-dd HH:mm", new Date());

  const dayOfWeek = format(date, "EEE");
  const formattedDate = format(date, "dd");

  function handleRemoveCity() {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      dispatch(removeCity(name));
    }
  }

  return (
    <div
      className="bg-cover bg-no-repeat bg-blend-overlay bg-slate-500 transition-all ease-in-out hover:bg-stone-600 bg-opacity-45 rounded-xl shadow-lg p-4 m-2 text-white "
      style={{ backgroundImage: `url(${cardBackground})` }}
    >
      <div className="flex flex-col items-center justify-center relative p-4 text-center text-white">
        <Menu as="div" className="absolute top-1 right-1">
          <Menu.Button className="bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent outline-none">
            <IoEllipsisVerticalSharp className="text-white" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none text-gray-900
                }`}
            >
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${weather.location.country}/${name}`}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex rounded-md items-center w-full p-2 text-sm text-gray-900`}
                  >
                    View Weather
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleRemoveCity}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex rounded-md items-center w-full p-2 text-sm text-gray-900`}
                  >
                    Remove City
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

        <h3 className="flex gap-1 text-2xl">
          <p className="font-semibold">{dayOfWeek}</p>
          <p className="text-lg">{formattedDate}</p>
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img
          src={`https:${weather.current.condition.icon}`}
          alt={weather.current.condition.text}
          title={weather.current.condition.text}
        />

        <p className="text-lg">
          {name}
          <span className="align-super text-slate-200 px-2  text-xs font-bold bg-yellow-600 rounded-lg">
            {weather.countryCode}
          </span>
        </p>
      </div>

      <p className="flex items-center justify-center text-sm">
        {weather.current.condition.text}
      </p>

      <div className="flex justify-center flex-wrap gap-0 md:gap-0 lg:gap-2 p-2 w-full mt-4 rounded-lg bg-white bg-opacity-50">
        <div className="text-center flex-[0_1_50%] md:flex-[0_1_50%] lg:flex-auto">
          <p className="text-sm">Current Temp.</p>
          <p className="font-bold text-lg">{weather.current.temp_c}°C</p>
        </div>

        <div className="text-center flex-[0_1_50%] md:flex-[0_1_50%] lg:flex-auto">
          <p className="text-sm">Speed.</p>
          <p className="font-bold text-lg">{weather.current.wind_kph} kph</p>
        </div>

        <div className="text-center flex-[0_1_50%] md:flex-[0_1_50%] lg:flex-auto">
          <p className="text-sm">Humidity.</p>
          <p className="font-bold text-lg">{weather.current.humidity} %</p>
        </div>
      </div>
    </div>
  );
}
