import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";

const theme= createTheme({
  autoContrast:true,
  defaultGradient:{
    from:'teal',
    to:'orange'
  },
 typography:{
        fontFamily: 'Roboto, sans-serif',  // <- Change this to any font you like
      }
})
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
