import './App.css';
import {useCallback, useEffect, useState} from 'react'
import axios from 'axios';

function App() {
  const [city_name, setCity] = useState("")
  const [humidity, setHumidity] = useState("")
  const [temp, setTemp] = useState("")
  const [min_temp, setMin_temp] = useState("")
  const [max_temp, setMax_temp] = useState("")
  const [description, setDescription] = useState("")
  const [wind,setWind] = useState("")
  const [icon, setIcon] = useState("")
  const [msg, setMsg] = useState("")

  const callbackend = useCallback(async () => {
    if(city_name == "")
      setMsg("Please enter city name")
    else{
    const response = await axios.get('http://localhost:5000/weather', {
      params: { city: city_name },
    });
    console.log(response.data)
    if(response.data.cod=="404"){
      setMsg("city not found, please try again")  
    }
    else{
    setMsg("")
    setTemp(response.data["main"]["temp"])
    setHumidity(response.data["main"]["humidity"])
    setMin_temp(response.data["main"]["temp_min"])
    setMax_temp(response.data["main"]["temp_max"])
    setDescription(response.data["weather"]["0"]["description"])
    setWind(response.data["wind"]["speed"])
    setIcon(`http://openweathermap.org/img/wn/${response.data['weather']['0']['icon']}@2x.png`)
    }}
  }, [city_name]);
  
  
  
  return (
    <>
    <div style = {{backgroundImage: "url('/bg2.jpg')",backgroundSize: "cover"}} className="center">
    <div className='blur_block'>
    <img src= {icon} alt="Weather Icon" />
    <div style={{color: "green", fontWeight : "bold", fontSize: "6vh"}} className='capital_first_letter'>{city_name}</div>
    <div>current temp : {temp} C</div>
    <div>humidity : {humidity}</div>
    <div>min_temp : {min_temp} C</div>
    <div>max_temp : {max_temp} C</div>
    <div>description : {description}</div>
    <div>wind: {wind} kmph</div>
    <div style={{color: "red"}}>{msg}</div>
    <br/>
    <input className = "text_form" onChange={(e)=>(setCity(e.target.value))} type = 'text' />
    <button className = "button_size"  onClick = {callbackend}> Search</button><br/>
    
    </div></div>
    </>
  );
}

export default App;
