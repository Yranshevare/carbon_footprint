import { useState } from "react";
import "./App.css";
import Location from "./components/Location";
import Slider from "./components/Slider";
import Duration from "./components/Duration";
import Searchbar from "./components/Searchbar";
import ElectricitySlider from "./components/ElectricitySlider";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Form() {
  const navigate = useNavigate()

  const [submit,setSubmit] = useState("Submit")
  const [eleVal, setEleVal] = useState(0);
  const [selCont, setSelCont] = useState("");
  const [selVeh, setSelVeh] = useState({
    "GasolineCar":0,
    "DieselCar":0,
    "ElectricVehicle(GreenGrid)":0,
    "ElectricVehicle(FossilFuelGrid)":0,
    "HybridCar":0,
    "NaturalGasVehicle (CNG)":0,
    "Bus(Diesel-Powered)":0,
    "Truck(Diesel-Powered)":0,
    "Motorcycle(Gasoline)":0,
    "AirTravel(CommercialFlight)":0,
    "ElectricTrain":0,
    "DieselTrain":0
  });
  const [selFood, setSelFood] = useState({
    "Vegetables":0,
    "Fruits":0,
    "DairyProducts":0,
    "Beef":0,
    "Pork":0,
    "Chicken":0,
    "ProcessedFoods":0,
    "NutsAndSeeds":0,
    "Seafood":0,
    "Beverages":0
});
  const [waste, setWaste] = useState({
        "Food Waste":0, 
        "Paper Waste":0, 
        "Plastic Waste":0, 
        "Glass Waste":0, 
        "Organic Waste":0, 
        "Electronic Waste (e-waste)":0, 
        "Textile Waste":0});
  const [dur, setDur] = useState("");
  
  const [value, setValue] = useState(
    null
  )
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const data = {
      car:selVeh,
      location:selCont,
      frequency:dur,
      food:selFood,
      waste:waste,
      electricity:eleVal
    }
    console.log(data)
    setSubmit("submiting...")
    navigate(`/result/${JSON.stringify(data)}`)
try {
  // const res = await axios.post("http://localhost:8000/calculate",{data:data})
  // console.log(res.data)
  // if(res.data.message === "successfully calaulated the carbon footprint"){
  //   console.log(JSON.stringify(data))
  // }
} catch (error) {
  console.log(error.message)
}finally{
      setSubmit("Submit")
    }
    // console.log(eleVal,selCont,dur,selVeh,waste,selFood)
  }

  return (
    <div className="app-container">
      <div className="img-container">
        <div className="logo"></div>
        
      </div>
      <div className="form-container">
        <form className="form-section" onSubmit={handleSubmit}>
         <div className="form-div">
         <div className="dur-div">
         <h2 className="section-title">DURATION</h2>
         <Duration setDur={setDur}/>
         </div>
         <div className="dur-div">
         <h2 className="section-title">LOCATION</h2>
         <Location setSelCont={setSelCont}/>
         </div>
          <div className="dur-div">
          <h2 className="section-title">ELECTRICITY</h2>
          <ElectricitySlider  unit="kwh" inputValue={eleVal} setInputValue={setEleVal}/>
          </div>
          <div className="dur-div">
          <h2 className="section-title">Type of vehicle</h2>
          <Searchbar 
            items={{
              "GasolineCar" : ["GasolineCar"],
              "Diesel Car":["DieselCar"],
              "ElectricVehicle(GreenGrid)":["ElectricVehicle(GreenGrid)"],
              "HybridCar":["HybridCar"],
              "NaturalGasVehicle (CNG)":["NaturalGasVehicle (CNG)"],
              "Bus(Diesel-Powered)":["Bus(Diesel-Powered)"],
              "Truck(Diesel-Powered)":["Truck(Diesel-Powered)"],
              "Motorcycle(Gasoline)":["Motorcycle(Gasoline)"],
              "AirTravel(CommercialFlight)":["AirTravel(CommercialFlight)"],
              "ElectricTrain":["ElectricTrain"],
              "DieselTrain":["DieselTrain"]
              }} 
              unit="km"
              setSelVeh={setSelVeh}
              userinfo = {selVeh}
              />

          </div>
          <div className="dur-div">
          <h2 className="section-title">Type of food</h2>
          <Searchbar
            items={{
              Meat: ["Chicken", "Beef", "Pork"],
              "Vegetables": ["Vegetables"],
              Fruits: ["Fruits"],
              DairyProducts: ["DairyProducts"],
              "ProcessedFoods": ["ProcessedFoods"],
              "NutsAndSeeds": ["NutsAndSeeds"],
              Seafood: ["Seafood"],
              Beverages: ["Beverages"],
            }} unit="kg"
            setSelVeh={setSelFood}
            userinfo={selFood}
          />
          </div>
          <div className="dur-div">
          <h2 className="section-title">Type of waste</h2>
          <Searchbar items={{
            "Food waste": ["Food Waste"],
            "Paper waste": ["Paper Waste"],
            "Plastic Waste": ["Plastic Waste"],
            "Glass Waste" : ["Glass Waste"],
            "Organic Waste" : ["Organic Waste"],
            "Electronic Waste (e-waste)" : ["Electronic Waste (e-waste)"],
            "Textile Waste" : ["Textile Waste"]
          }} unit="kg"
          setSelVeh={setWaste}
          userinfo={waste}
          />
          </div>
          <button type="submit" className="submit-button">{submit}</button>
         </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
