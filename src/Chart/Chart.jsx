import React, { useEffect, useState } from 'react'
/**
 * Sample for scatter series
 */
 import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   Legend,
   Category,
   ScatterSeries,
   Tooltip,
   Highlight,
 } from "@syncfusion/ej2-react-charts"
 import { Browser } from "@syncfusion/ej2-base"
 import { scatterData } from "./scatter-data"
 import { SampleBase } from "./sample-base"
 //  import{use}
 import axios from "axios"
 import moment from "moment"
 const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }`

const Chart = () => {
    const [dataValues, setDataValues] = useState([])
    const [city, setcity] = useState('')
    const [date, setDate] = useState('')
    console.log(date)
    // useEffect(() => {
    //   window.alert(" ")
    // }, [])
    
  
        const getData = async () => {
            try {
              console.log("hhhhh")
              const { data } = await axios.get(
                // "https://api.openaq.org/v2/measurements?date_to=2022-09-29T15%3A10%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&parameter=pm25&radius=1000&city=Agra&order_by=datetime",
                // `https://api.openaq.org/v1/measurements?date_to=${date}&limit=100&page=1&offset=0&sort=desc&radius=1000&city=${city}&order_by=datetime`,
                `https://api.openaq.org/v1/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=${date}&limit=100&page=1&offset=0&sort=desc&parameter=co&radius=1000&country=IN&city=${city}&order_by=datetime`,
                {
                  headers: {
                    accept: "application/json",
                  },
                }
              )
              console.log(data);
              let record = data.results.map((item) => {
                let arr = {
                  date: moment(item.date.local).format('DD'),
                  value: item.value,
                }
                return arr
              })
              console.log(record)
              setDataValues(record)
            } catch (error) {
              console.log(error)
            }
          }
          getData()
 
    
    return (
        <div className="control-pane" style={{marginTop:"2rem"}}>
          <h2 style={{textAlign:"center"}}>Carbon monoxide (Co)</h2>
           <div style={{paddingLeft:"200px",marginBottom:"20px",paddingRight:"200px"}}>
                <p>Search City (in Capitalization Eg:- Agra)</p>
              <input type='text' value={city} onChange={e=>setcity(e.target.value)} autoFocus/>
              <input type="date" style={{float:"right"}} id="birthday" name="birthday" value={date} onChange={e=>setDate((e.target.value))}></input>
              <p style={{float:"right",color:"red"}}></p>
           </div>
          <style>{SAMPLE_CSS}</style>
          <div className="control-section"> 
            <ChartComponent
              id="charts"
              style={{ textAlign: "center" }}
              primaryXAxis={{
                minimum: 0,
                maximum: 30,
                interval: 5,
  
                // interval: ,
                majorGridLines: { width: 0 },
                edgeLabelPlacement: "Shift",
                title: "Day",
              }}
              primaryYAxis={{
                majorTickLines: {
                  width: 0,
                },
                minimum: 0,
                maximum: 1800,
                interval: 150,
                lineStyle: {
                  width: 0,
                },
                title: "carbon monoxide (co)",
                rangePadding: "None",
              }}
            //   load={this.load.bind(this)}
            //   loaded={this.onChartLoad.bind(this)}
              legendSettings={{ visible: true, enableHighlight: true }}
              tooltip={{ enable: true }}
              width={Browser.isDevice ? "100%" : "75%"}
              chartArea={{ border: { width: 0 } }}
            >
              <Inject
                services={[ScatterSeries, Legend, Tooltip, Category, Highlight]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={dataValues || []}
                  width={3}
                  xName="date"
                  yName="value"
                  type="Scatter"
                  marker={{
                    visible: false,
                    width: 10,
                    height: 10,
                    shape: "Circle",
                  }}
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      )
      
}

export default Chart