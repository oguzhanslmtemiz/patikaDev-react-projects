import { WeatherProvider } from "./context/WeatherContext";
import Search from "./components/Search";
import Weather from './components/Weather'
import "./App.scss";

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <Search />
        <Weather/>
      </div>
    </WeatherProvider>
  );
}

export default App;
