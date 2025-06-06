import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const cities = [
  "Kampala",
  "Mbarara",
  "Gulu",
  "Lira",
  "Mbale",
  "Hoima",
  "Jinja",
  "Arua",
  "Fort Portal",
  "Masaka",
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Sydney",
  "Moscow",
  "Nairobi",
  "Lagos",
  "Cape Town",
  "Cairo",
  "Beijing",
  "Rio de Janeiro",
  "Toronto",
  "Berlin",
  "Bangkok",
  "Dubai",
  "Seoul",
  "Istanbul",
  "Mexico City",
  "Mumbai",
  "Los Angeles",
];
//createAsyncThunk is used to perform asynchronous actions over the internet
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  //
  async (_, { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
          );
          const data = await res.json();
          return {
            city: data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
          };
        })
      );
      console.log(results);
      return results;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice to hold the weather data centrally so that any component can access so as to avoid issues related to prop drilling
const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    query: "",
    status: "idle",
    weather: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
