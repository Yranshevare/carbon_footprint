import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import markdownit from 'markdown-it'
import { Chart, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2'

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
        labels: ['Car', 'electricity', 'food', 'waste'],
        datasets: [
          {
            label: '# of Votes',
            data: [CFdata?.carbonEmission.car, CFdata?.carbonEmission.electricity, CFdata?.carbonEmission.food,CFdata?.carbonEmission.waste ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',    
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            hoverOffset: 10
        }]
    }

    return(
        !loading?
        <>
        <h1>total: {CFdata?.carbonEmission.total}kgCo2e</h1>
        <h1>{CFdata?.carbonEmission.range}</h1>
        <div style={{ width: '80%', height: '80%' }}>
            <Pie 
            options={options}
            data={piedata}
            />
        </div>
        <div dangerouslySetInnerHTML={{ __html: mdContent }} />
        </>

        :
        <div>loading...</div>
    )
}