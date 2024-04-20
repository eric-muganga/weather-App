/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
  //console.log(data.data);
  return data.data;
};

const fetchUSStates = async () => {
  const response = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      country: "United States",
    }
  );
  //console.log(response.data);
  return response.data.data.states;
};

const AddCityDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState({ country: "", city: "" });
  const [selectedState, setSelectedState] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const {
    data: countries,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const {
    data: states = [],
    isFetching: isFetchingStates,
    isError: isErrorStates,
    error: statesError,
  } = useQuery({
    queryKey: ["USStates"],
    queryFn: fetchUSStates,
    enabled: selected.country === "US", // Execute only if the selected country is 'US'
  });

  useEffect(() => {
    if (selected.country !== "US") {
      setSelectedState("");
    }
  }, [selected.country]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (selected[name] !== value) {
      // Only update if different
      setSelected((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selected.country && (!selected.city || !selectedState)) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please fill the city and the country field");
      setOpenSnackbar(true);
      return;
    }

    let location = selected.city;
    if (selected.country === "US" && selectedState) {
      location = selectedState; // Use the state name if a state is selected in the US
    }

    // Simulating adding a city
    try {
      await dispatch(fetchWeatherDataForCity(location));
      setSelected({ country: "", city: "" }); // Reset form
      setSelectedState("");
      setSnackbarSeverity("success");
      setSnackbarMessage(`City ${selected.city} added successfully.`);
      setOpenSnackbar(true);
      setTimeout(() => {
        onClose(); // Close drawer on success
      }, 800);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "An error occurred while adding the city. Please try again."
      );
      setOpenSnackbar(true);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;
  if (isErrorStates) {
    return (
      <Alert severity="error">
        Failed to load states: {statesError.message}
      </Alert>
    );
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
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:text-base rounded-md"
            >
              <option value="">Select a country</option>
              {countries?.map((country) => (
                <option key={country.iso2} value={country.iso2}>
                  {country.country}
                </option>
              ))}
            </select>
          </FormControl>

          {selected.country === "US" ? (
            <FormControl fullWidth margin="normal" disabled={isFetchingStates}>
              <label
                htmlFor="state-label"
                className="block text-sm font-medium text-gray-700"
              >
                Select State
              </label>
              <select
                id="state-label"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={isFetchingStates}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:text-base rounded-md"
              >
                <option value="">Select a state</option>
                {Array.isArray(states) ? (
                  states.map((state) => (
                    <option key={state.state_code} value={state.name}>
                      {state.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading or no states found...</option>
                )}
              </select>
            </FormControl>
          ) : (
            <FormControl fullWidth margin="normal" disabled={!selected.country}>
              <label
                htmlFor="city-label"
                className="block text-sm font-medium text-gray-700"
              >
                Select City
              </label>
              <select
                id="city-label"
                name="city"
                value={selected.city}
                onChange={handleInputChange}
                disabled={!selected.country}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:text-base rounded-md"
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
          )}

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
              disabled={!selected.country && (!selected.city || !selectedState)}
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
