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

import connectDB from "./mongoDB.js"

dotenv.config({path:"./.env.test"})

const app = express()
const port = process.env.PORT || 4000
app.use(express.urlencoded({extended:false}))
app.use(express.json());

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


function suggestion(data) {
    return {suggestion:"none"}
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
        const CF = emissionRange.find((val)=> val.country === location).carbon_footprint_range_kg[frequency]
        console.log(CF,data)
        if (data <= CF.low) {
            return "very low";
        } else if (data > CF.low && data <= CF.normal) {
            return "low";
        } else if (data > CF.normal && data <= CF.high) {
            return "normal";
        } else if (data > CF.high) {
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


        for (const waste of wasteTypes) {
            if (params[waste]) {
                let em = await  wastEmission.find((val) => val.type === waste);
                
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

app.get('/calculate', async(req, res) => {
    // console.log(carEmission)
    try {
        const data = req.body
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
        // console.log(info)

        const suggests = await suggestion(data)

        const totalEmission = CFcar + CFelectricity + CFfood + CFwast

        const range = calRange(totalEmission,data.location,data.frequency)
        console.log(range)


        res.json({
            suggests,
            "carbon emission":{
                "car":CFcar,
                "electricity":CFelectricity,
                "food":CFfood,
                "total":totalEmission,
                "waste":CFwast,
                "range":range,
                "waste":CFwast,
                "frequency":data.frequency
            }
        })
    } catch (error) {
        res.json({error:error.message})   
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})