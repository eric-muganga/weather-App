/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import cloudySkyImg from "../assets/cloudy-sky-from-above.jpg";
import { useDispatch } from "react-redux";
import { removeCity } from "../store/weatherSlice";
import { useNavigate } from "react-router-dom";

export default function SubHeader({ openDrawer, name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRemoveCity() {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      dispatch(removeCity(name));
      navigate("/");
    }
  }

  return (
    <div
      className="relative bg-cover bg-no-repeat py-16 bg-blend-overlay bg-slate-500 flex flex-col justify-center h-[800]"
      style={{ backgroundImage: `url(${cloudySkyImg})` }}
    >
      <div className="max-w-2xl mx-auto  text-white z-20 p-4 lg:text-lg sm:px-6 lg:px-8">
        <h2 className="font-bold">
          {name === undefined ? "Tracked Cities" : name}
        </h2>
        <p>
          {name === undefined
            ? "All the cities you have saved to see the weather!"
            : "Weather for the next 7 days"}
        </p>
        <Button
          className="border bg-white text-black rounded-md px-4 py-1 mt-4 text-xs shadow-lg"
          onClick={name === undefined ? openDrawer : handleRemoveCity}
        >
          {name === undefined ? "+ Add City" : "Remove City"}
        </Button>
      </div>
    </div>
  );
}
