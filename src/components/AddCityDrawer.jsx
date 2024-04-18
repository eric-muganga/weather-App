/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import axios from "axios";

import { fetchWeatherDataForCity } from "../store/weatherSlice";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const fetchCountries = async () => {
  const { data } = await axios.get(
    "https://countriesnow.space/api/v0.1/countries"
  );

  return data.data;
};

const AddCityDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    data: countries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const [selected, setSelected] = useState({ country: "", city: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  // if (loading) {
  //   return <p className="animate-bounce">Loading...</p>;
  // }

  const handleInputChange = (event) => {
    let { name, value } = event.target || {};

    setSelected((prev) => ({
      ...prev,
      [name]: value,
    }));

    //console.log(`${name} selected:`, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selected.country || !selected.city) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill the city and the country field");
      setOpenSnackbar(true);
      return;
    }

    // Simulate adding a city
    try {
      //console.log(`City ${selected.city} added successfully`);
      dispatch(fetchWeatherDataForCity(selected.city));
      setSelected({ country: "", city: "" }); // Reset form
      setSnackbarSeverity("success");
      setSnackbarMessage(`City ${selected.city} added successfully`);
      setOpenSnackbar(true);
      onClose(); // Close drawer on success
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Occurred an error while adding the city. Please try again."
      );
      setOpenSnackbar(true);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) {
    setSnackbarSeverity("error");
    setSnackbarMessage("Failed to load countries data.");
    setOpenSnackbar(true);
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 350, p: 4 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="text.primary" className="text-sm">
            Add City
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <label
              htmlFor="country-label"
              className="block text-sm font-medium text-gray-700"
            >
              Select Country
            </label>
            <select
              id="country-label"
              name="country"
              value={selected.country}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a country</option>
              {countries?.map((country) => (
                <option key={country.iso2} value={country.iso2}>
                  {country.country}
                </option>
              ))}
            </select>
          </FormControl>

          <FormControl fullWidth margin="normal" disabled={!selected.country}>
            <label
              htmlFor="city-label"
              className="block text-sm font-medium text-gray-700"
            >
              Select City
            </label>
            <select
              id="city-label"
              value={selected.city}
              onChange={handleInputChange}
              name="city"
              disabled={!selected.country}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a city</option>
              {countries
                .find((c) => c.iso2 === selected.country)
                ?.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </FormControl>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={onClose}
              startIcon={<CloseIcon />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!selected.country || !selected.city}
              startIcon={<SaveIcon />}
              sx={{ ml: 2 }}
            >
              Save
            </Button>
          </Box>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Drawer>
  );
};

export default AddCityDrawer;
