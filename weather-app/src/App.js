import { WeatherProvider } from "./context/WeatherContext";
import Search from "./components/Search";
import "./App.scss";

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <Search />
      </div>
    </WeatherProvider>
  );
}

export default App;
