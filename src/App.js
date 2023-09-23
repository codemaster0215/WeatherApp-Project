import {useEffect, useState} from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

//1. Once app is opened, you can see weather data & current location data
//2. city, celsius , Fahrenheit
//3. 5 buttons (1current,4 other cities)
//4. City button function, changes data once clicked.
//5. Current location resets the weather.
//6. While bringing data, loading spinner appears.

function App() {
  const [weather,setWeather]=useState(null)
  const [city,setCity]=useState('')
  const [loading,setLoading]=useState(false);
  const cities=['paris','new york','tokyo','seoul']
  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b3caacefbce45a9cadd7f95b5bcafb04&units=metric`
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3caacefbce45a9cadd7f95b5bcafb04&units=metric`
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }
  useEffect(()=>{
    if(city == ""){
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  },[city]);

 

  return (
    <div>
      {loading? (
      <div className="container">
      <ClipLoader
        color={"#f88c6b"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>) : (<div className="container">
  
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} setCity={setCity}/>
        </div>)}
       
    
    </div>
  );
}

export default App;
