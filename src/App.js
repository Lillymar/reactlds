import hot from "./assets/hot.jpg";
import cold from './assets/cold.jpg';
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const[city,setCity] = useState("Paris")

  const [weather, setWeather] = useState (null);

  const [units, setUnits] = useState('metric');

  const [bg,setBg] = useState(hot)

useEffect(()=> {
  const fetchWeatherData = async () =>{
    const data = await getFormattedWeatherData (city, units);
    setWeather(data);

    //dynamic bg

    const threshold = units === 'metric' ? 20 : 60;
    if (data.temp <= threshold) setBg (cold); else setBg(hot);
  };

  fetchWeatherData();
}, [units, city]);

const handleUnitsClick = (e) => {
const button = e.currentTarget;
const currentUnit = button.innerText.slice (1);

const isCelsius = currentUnit === 'C';
button.innerText = isCelsius ? '°F' : '°C'
setUnits(isCelsius ? 'metric' : 'imperial');
};
const enterKeyPressed = (e) =>{
if (e.keyCode === 13) {
  setCity(e.currentTarget.value)
e.currentTarget.blur();
}
}

  return (
    <div className="app" style= {{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {
          weather && (

            <div className= "container">
            <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter city...'/>
            <button onClick={(e) => handleUnitsClick(e)}> °F </button>
            </div>
        
            <div className='section section__temperature'> 
            <div className='icon_description'>
              <h3>{`${weather.name}, ${weather.country}`}</h3>
    
              <img 
              src={weather.iconURL} alt = "weatherIcon" />

            <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
             </div>
    
    {/*button description*/}
    <Descriptions weather = {weather} />
         </div>
          )
        }
<footer>

This project was coded by{" "}
<a
  href="https://www.linkedin.com/in/lillymardiazsein/"
  target="_blank"
  rel="noopener noreferrer"
>
  Lilly
</a>{" "}
and is{" "}
<a
  href="https://github.com/Lillymar/reactlds"
  target="_blank"
  rel="noopener noreferrer"
>
  open-sourced on GitHub
</a>{" "}
and{" "}
<a
  href="https://jocular-cajeta-b67765.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
>
  hosted on Netlify
</a>
</footer>

   </div>  
 </div>
  ); 
}

export default App;
