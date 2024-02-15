import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// third-party
import { Provider as ReduxProvider } from "react-redux";

// scroll bar

import "simplebar/src/simplebar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// apex-chart
import "assets/third-party/apex-chart.css";
import "assets/third-party/react-table.css";

// project import
import App from "./App";
import { store } from "store";
import { ConfigProvider } from "contexts/ConfigContext";
import Permissions from "contexts/Permissions";
import reportWebVitals from "./reportWebVitals";

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ReduxProvider store={store}>
    <ConfigProvider>
      <Permissions>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Permissions>
    </ConfigProvider>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
