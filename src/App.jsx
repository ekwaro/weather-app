import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchWeatherData,

} from "./features/weather/weatherSlice";
import { Container, Grid, Loader, TextInput , Center, Paper} from "@mantine/core";
import Weather from "./components/Weather";

function App() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const { status, weather, error } = useSelector(
    (state) => state.weather
  );
  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // this filters the weather data by city 
  useEffect(() => {
    if (search === "") {
      setFilteredData(weather);
    } else {
      setFilteredData(
        weather.filter((data) =>
          data.city.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, weather]);

  return (
    <Paper mt='xl' >
      {status === "loading" && <Loader />}
      {status === "error" && <Text>Error{error}</Text>}
       <TextInput placeholder="search by city" onChange={handleChange} mx='md'/>
    
       
      <Grid justify='space-evenly'>
        {status === "succeeded" &&
          filteredData.map((weatherdata) => (
            <Weather key={weatherdata.city} {...weatherdata} />
          ))}
      </Grid>
 
      
    </Paper>
  );
}

export default App;
