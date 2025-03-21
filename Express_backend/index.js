import express from "express"
import dotenv from "dotenv"
// import fs from "fs"
// import mongoose from "mongoose"
// import {wasteEmission,Food,electricity,transportation,country} from "./model/database.js"
import Country from "./model/countries.js"
import Electricity from "./model/electricity.js"
import Food from "./model/food.js"
import Transportation from "./model/transportation.js"
import WasteEmission from "./model/waste.js"
// import router from "./routes/forFood.js"
import  {LangflowClient} from "@datastax/langflow-client"

import cors from "cors"

import connectDB from "./mongoDB.js"

dotenv.config({path:"./.env.test"})

const app = express()
const port = process.env.PORT || 4000
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors());

connectDB();

// const carEmission = JSON.parse(fs.readFileSync('./Database/car_carbon_intensity.json', 'utf-8'));  
// const electricityEmission = JSON.parse(fs.readFileSync('./Database/electricity_carbon_intensity.json', 'utf-8'));  
// const foodEmission = JSON.parse(fs.readFileSync('./Database/food_carbon_intensity.json', 'utf-8'));  
// const wastEmission = JSON.parse(fs.readFileSync('./Database/wast_emmission_factor.json', 'utf-8'));  
// const emissionRange = JSON.parse(fs.readFileSync('./Database/carbonFootprint_range.json', 'utf-8'));  

// // console.log(emissionRange)

app.get("/", (req, res) => {
    res.send("Hello World")
})
async function fetchallDb(){
    try{
        let emissionRange = await Country.find();
        let electricityEmission = await Electricity.find();
        let carEmission = await Transportation.find();
        let wastEmission = await WasteEmission.find();
        let foodEmission = await Food.find();
         
        // console.log(wastEmission)x
        // console.log(foodEmission)
        // console.log(countryData[0].carbon_footprint_range_kg)
        return {emissionRange,electricityEmission,carEmission,wastEmission,foodEmission}

    }catch(err){

        console.log(err.message)
    }
}
const {emissionRange,electricityEmission,carEmission,wastEmission,foodEmission} = await fetchallDb()
// console.log(emissionRange)


async function suggestion(data) {

    try {
        // console.log( process.env.ENDPOINT)
        const langflowId = process.env.LANGFLOWID
        const flowId = process.env.ENDPOINT
        const apiKey = process.env.APIKEY
        const client = new LangflowClient({langflowId, apiKey})
        const flow = client.flow(flowId)
        console.log("lll")
        const result = await flow.run(JSON.stringify(data))
        console.log(result.outputs[0].outputs)
        console.log("fetch complete")
        return result.chatOutputText()
    } catch (error) {
        console.log(error.message)
    }

    const res = `Here's a breakdown of carbon footprint reduction suggestions based on the provided data, formatted for easy frontend integration:\n" +
    '\n' +
    "**User's Carbon Footprint Breakdown:**\n" +
    '\n' +
    '* **Transportation (Car):** 3.99 kg CO2e/week (primarily from Diesel Car usage)\n' +
    '* **Electricity:** 1.68 kg CO2e/week\n' +
    '* **Food:** 12 kg CO2e/week (primarily from Vegetable consumption)\n' +
    '* **Waste:** 2.85 kg CO2e/week (primarily from Glass Waste)\n' +
    '* **Location:** France\n' +
    '* **Frequency:** Weekly\n' +
    '\n' +
    '**Recommendations to Reduce Carbon Footprint:**\n' +
    '\n' +
    '**1. Transportation:**\n' +
    '\n' +
    '*   **Reduce Diesel Car Usage:** Since this is the largest contributor, explore alternatives:\n' +
    "    *   **Public Transportation:** Utilize France's well-developed train and bus networks.  Display links to local public transit schedules and route planners.  *(Potential Savings: High)*\n" +
    '    *   **Cycling or Walking:** For shorter distances, encourage cycling or walking. Integrate maps with bike-friendly routes or walking paths. *(Potential Savings: High)*\n' +
    '    *   **Carpooling:** Share rides with colleagues or friends to reduce individual car usage. *(Potential Savings: Medium)*\n' +
    "    *   **Switch to Electric or Hybrid Vehicle:** If car use is unavoidable, consider transitioning to a more sustainable option, especially considering France's reliance on nuclear energy for electricity generation.  *(Potential Savings: High - if charged with green electricity)*\n" +
    '\n' +
    '\n' +
    '**2. Waste:**\n' +
    '\n' +
    '*   **Reduce Glass Waste:**\n' +
    '    *   **Recycle Properly:** Ensure glass is disposed of in designated recycling bins. Display local recycling guidelines and collection schedules. *(Potential Savings: Medium)*\n' +
    '    *   **Choose Reusable Containers:** Opt for reusable food and beverage containers to minimize glass waste.  *(Potential Savings: Low-Medium)*\n' +     
    '    *   **Buy Products with Less Packaging:**  Choose products with minimal or recyclable packaging. *(Potential Savings: Low)*\n' +
    '\n' +
    '\n' +
    '**3. Food:**\n' +
    '\n' +
    '*   **Optimize Vegetable Consumption:** While vegetables have a lower carbon footprint than animal products, consider:\n' +
    "    *   **Local and Seasonal Produce:** Prioritize locally sourced and seasonal vegetables to reduce transportation emissions. Display nearby farmers' markets or information on seasonal produce. *(Potential Savings: Low-Medium)*\n" +
    '    *   **Reduce Food Waste:** Plan meals carefully and store vegetables properly to minimize spoilage.  *(Potential Savings: Low)*  \n' +
    '\n' +
    '\n' +
    '**4. Electricity:**\n' +
    '\n' +
    '*   **Energy Efficiency:**\n' +
    '    *   **Switch to LED Lighting:** Replace incandescent bulbs with energy-efficient LEDs. *(Potential Savings: Low-Medium)*\n' +
    '    *   **Unplug Electronics:** Disconnect chargers and appliances when not in use. *(Potential Savings: Low)*\n' +
    '    *   **Lower Heating and Cooling:** Adjust thermostat settings and improve insulation to reduce energy consumption. *(Potential Savings: Medium)*\n' +  
    '* **Renewable Energy:** Explore options for switching to a green electricity provider in France. *(Potential Savings: Medium-High)*\n' +
    '\n' +
    '\n' +
    '**Frontend Integration Suggestions:**\n' +
    '\n' +
    "* **Progress Bars/Charts:** Visualize the user's carbon footprint in each category using progress bars or charts.\n" +
    '* **Interactive Tips:** Provide clickable tips with more detailed information on each recommendation.\n' +
    "* **Personalized Recommendations:** Tailor suggestions based on the user's location (France) and highest contributing factors (diesel car usage and glass waste).\n" +
    '* **Savings Calculator:** Allow users to estimate potential savings by implementing different recommendations.\n' +
    '* **Gamification:** Incorporate elements like points, badges, or challenges to motivate users.  \n' +
    '* **Local Resources:** Link to relevant French websites and organizations promoting sustainable practices.  \n' +
    '\n' +
    '\n' +
    'This detailed breakdown allows for easier integration into a user-friendly frontend interface, providing clear and actionable steps for the user to reduce their carbon footprint.  Remember to use clear and concise language, avoiding technical jargon.\n'
    `
   
    // return res

}


async function calcarEmission(car){

    // console.log(carEmission)
    try {
        let CF = 0
        const cars = [
            "GasolineCar",
            "DieselCar",
            "ElectricVehicle(GreenGrid)",
            "ElectricVehicle(FossilFuelGrid)",
            "HybridCar",
            "NaturalGasVehicle (CNG)",
            "Bus(Diesel-Powered)",
            "Truck(Diesel-Powered)",
            "Motorcycle(Gasoline)",
            "AirTravel(CommercialFlight)",
            "ElectricTrain",
            "DieselTrain"
        ]
         cars.forEach((val,idx)=>{
            if(val in car){
                CF = CF + carEmission[idx].carbon_intensity_kg_co2_per_km * car[val]
            }
        })
        return CF   
    } catch (error) {
        return null
    }
}

async function calElectricityEmission(location,electricityUsage) {
    // console.log(electricityEmission)
    try {
        const CF = await electricityEmission.find((val)=> val.country === location)
        return CF.carbon_intensity_kg_co2_per_kwh * electricityUsage
    } catch (error) {
        return null
    }
}

async function calFoodEmission(params) {
    // console.log( params.Vegetables )
    try {
        let CF = 0
        if("Vegetables" in params){
            let em = await foodEmission.find((val) => val.category == "Vegetables" )
            CF = CF + em.carbon_intensity_kg_co2_per_kg * params.Vegetables
        }
        if("Fruits" in params){
            let em = await foodEmission.find((val) => val.category == "Fruits" )
            CF = CF + em.carbon_intensity_kg_co2_per_kg * params.Fruits
        }
        if("DairyProducts" in params){
            let em = await foodEmission.find((val) => val.category == "Dairy Products" )
            CF = CF + em.carbon_intensity_kg_co2_per_kg * params.DairyProducts
        }
        
            let em = await foodEmission.find((val) => val.category == "Meat" )
            if("Beef" in params){
                let newEM= await em.subType.find((val)=> val.type == "Beef")
                CF = CF + newEM.carbon_intensity_kg_co2_per_kg * params.Beef
            }
            if("Pork" in params){
                let newEM= await em.subType.find((val)=> val.type == "Pork")
                CF = CF + newEM.carbon_intensity_kg_co2_per_kg * params.Pork
            }
            if("Chicken" in params){
                let newEM= await em.subType.find((val)=> val.type == "Chicken")
                CF = CF + newEM.carbon_intensity_kg_co2_per_kg * params.Chicken
            }
        
        if("ProcessedFoods" in params){
            let em = await foodEmission.find((val) => val.category =="Processed Foods")
            CF = CF + em.carbon_intensity_kg_co2_per_kg * params.ProcessedFoods
        }
        if("NutsAndSeeds" in params){
            let em = await foodEmission.find((val) => val.category == "Nuts and Seeds" )
            CF = CF + em.carbon_intensity_kg_co2_per_kg * params.NutsAndSeeds
        }
        if("Seafood" in params){
            let em = await foodEmission.find((val) => val.category == "Seafood" )
            CF = CF + em.carbon_intensity_kg_co2_per_kg * params.Seafood
        }
        if("Beverages" in params){
            let em = await foodEmission.find((val) => val.category == "Beverages" )
            CF = CF + em.carbon_intensity_kg_co2_per_kg * params.Beverages
        }

        return CF
    } catch (error) {
        return null
    }
}


function calRange(data,location,frequency){
    // console.log(emissionRange)
    try {
        const CF = emissionRange.find((val)=> val.country === location)
        const newCF = CF.carbon_footprint_range_kg[frequency.toLowerCase()]
        // console.log(CF,frequency)
        if (data <= newCF.low) {
            return "very low";
        } else if (data > newCF.low && data <= newCF.normal) {
            return "low";
        } else if (data > newCF.normal && data <= newCF.high) {
            return "normal";
        } else if (data > newCF.high) {
            return "high";
        }
    } catch (error) {
        return null
    }
}

const calWasteEmission = async (params) => {
    try {
        let CF = 0;
        // console.log(wastEmission)
        const wasteTypes = [
            "Food Waste", 
            "Paper Waste", 
            "Plastic Waste", 
            "Glass Waste", 
            "Organic Waste", 
            "Electronic Waste (e-waste)", 
            "Textile Waste"
        ];
        // console.log(params)
        
        for (const waste of wasteTypes) {
            // console.log(params[waste],waste)
            if (params[waste]) {
                let em = await  wastEmission.find((val) => val.type === waste);
                // console.log(em,"em")
                
                if (em) {
                    CF += em.emission_factor_kg_co2_per_kg * params[waste];
                }
            }
        }
        // console.log(CF,"to")

        return CF;
    } catch (err) {
        console.error("Error:", err);
    }
};

app.post('/calculate', async(req, res) => {
    // console.log(carEmission)
    try {
        const {data} = req.body
        // console.log(data.waste)
        //calculation 
        
        //function to calculate car emission
        const CFcar = await calcarEmission(data?.car)
        // console.log(CFcar,"kg")
        
        
        //function to calculate electricity emission
        const CFelectricity = await calElectricityEmission(data?.location,data?.electricity)
        // console.log(CFelectricity,"kg")
        
        
        //function to calculate the food emission
        const CFfood = await calFoodEmission(data?.food)
        // console.log(CFfood,"kg")
        
        const CFwast = await calWasteEmission(data?.waste)
        // console.log(CFwast,"kg")
        
        const  info = {...data,carbon_footPrints:{CFcar,CFelectricity,CFfood,CFwast}}
        console.log(info)
        const suggests = await suggestion(info)

        const totalEmission = CFcar + CFelectricity + CFfood + CFwast

        const range = calRange(totalEmission,data.location,data.frequency)
        // console.log(range)


        res.json({
            suggests,
            "carbonEmission":{
                "car":CFcar,
                "electricity":CFelectricity,
                "food":CFfood,
                "total":totalEmission,
                "waste":CFwast,
                "range":range,
                "waste":CFwast,
                "frequency":data.frequency
            },
            "message":"successfully calaulated the carbon footprint"
        })
    } catch (error) {
        res.json({error:error.message})   
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})