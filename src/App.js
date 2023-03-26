import React, {useState} from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e6ce9ee249bdc345e3f5c3a8dece561b`

  const searchLocation = (event) =>{
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
    
  }

  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter location"
        type="text"/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{Math.round(data.main.temp-273,2)}℃</h1>:null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p>:null}
            
          </div>
        </div>


        {data.name != undefined && 
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{Math.round(data.main.feels_like-273,2)}℃</p>:null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p>:null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{Math.round(data.wind.speed,2)}MPH</p>:null}
            <p>Wind speed</p>
          </div>
        </div>
        }
        
      </div>
      
    </div>
  );
}

export default App;
