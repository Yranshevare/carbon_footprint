import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import markdownit from 'markdown-it'
import { Chart, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { ThreeDot } from "react-loading-indicators";

Chart.register(Tooltip, Legend, ArcElement)
export default function Result(){
    const {urldata} = useParams()

    const md = markdownit()

    const [loading,setLoading] = useState(true)
    const [CFdata,setCFData] = useState(null)
    const [mdContent,setMdContent] = useState(null)

    // console.log(JSON.parse(urldata),"data")



    const loadInfo = async() => {
        try {
            const res = await axios.post("http://localhost:8000/calculate",{"data":JSON.parse(urldata)})
            if(res.data.message === "successfully calaulated the carbon footprint"){
              console.log(res.data)
              setLoading(false)
              setCFData(res.data)
            }
            console.log(res,"res")
          } catch (error) {
            console.log(error.message)
          }
    }

    useEffect(()=>{
        loadInfo()
    },[])

    useEffect(()=>{
        // console.log(CFdata?.suggests || "none")
        if (CFdata) {
            // Assuming CFdata contains markdown content or a field you want to render
            // const html = md.render( '# No content available');
            const html = md.render(CFdata?.suggests || '# No content available');
            setMdContent(html);
        }
    },[CFdata])




    
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'votes for color'
            },
            legend: {
                display: true,  // Hide the legend
                position:'right',
                labels: {
                    padding: 50, // Adjust the space between legend items
                   
                    font: {
                        size: 14, // Change font size if needed
                    }
                },
                padding: 100, // Adjust space between legend and chart
            },
        }
    }
    const piedata = {
        labels: [`Car: ${CFdata?.carbonEmission.car} KgCo2e`, `electricity: ${CFdata?.carbonEmission.electricity} KgCo2e`, `food: ${ CFdata?.carbonEmission.food} KgCo2e`, `waste: ${CFdata?.carbonEmission.waste} KgCo2e`],
        datasets: [
          {
            label: '# of Votes',
            data: [CFdata?.carbonEmission.car, CFdata?.carbonEmission.electricity, CFdata?.carbonEmission.food,CFdata?.carbonEmission.waste ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',    
              'rgba(57, 198, 104, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            hoverOffset: 10
        }]
    }

    return(
        !loading?
        <>
        <div className="result-contanier">
            <h1>Total: {CFdata?.carbonEmission.total.toFixed(2)} kgCo2e ({CFdata?.carbonEmission.range})</h1>
            <div className="chart-div">
                <div 
                className="pie-chart"
                style={{  height: '100%' }}>
                    <Pie 
                    options={options}
                    data={piedata}
                    />
                </div>
            </div>
            <div className="chart-suggestion">
            <div 
            className="suggetions"
            dangerouslySetInnerHTML={{ __html: mdContent }} />
            </div>
        </div>
        </>

        :
        <div className="loader">
        <ThreeDot color="#d6d6d6" size="small" text="" textColor="" />
        </div>
    )
}