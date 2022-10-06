import React, { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const Resharts = ({ chartData }) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  const [dataValues, setDataValues] = useState([])
  const [cityy, setcity] = useState("")
  const [cities, setcities] = useState([])
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  // console.log(date)
  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    try {
      const { data } = await axios.get(
        `    https://api.openaq.org/v2/cities?limit=100&page=1&offset=0&sort=asc&country=IN&order_by=city`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      console.log("cities", data.results)
      let record = data.results.map((item) => {
        let arr = {
          city: item.city,
        }
        return arr
      })
      console.log(record, "cityyyy")
      setcities(record)
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(
        // `https://api.openaq.org/v1/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=${date}&limit=100&page=1&offset=0&sort=desc&parameter=co&radius=1000&country=IN&city=${cityy}&order_by=datetime`,
        // `https://api.openaq.org/v2/measurements?date_from=2022-09-25T07%3A10%3A00-08%3A00&date_to=${date}&limit=100&page=1&offset=0&sort=asc&parameter=co&radius=1000&country=IN&city=${cityy}&location=Sector-3B%20Avas%20Vikas%20Colony%2C%20Agra%20-%20UPPCB&order_by=city&entity=government&value_from=1500&value_to=2000`,
        `https://api.openaq.org/v2/measurements?date_from=${fromDate}&date_to=${toDate}&limit=100&page=1&offset=0&sort=asc&parameter=co&radius=1000&country=IN&city=${cityy}&order_by=datetime`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      console.log("intial", data)


      const uniqueData = new Set()

      const unique = data.results.filter((i) => {
        const isDuplicate = uniqueData.has(moment(i.date.local).format("DD"))
        uniqueData.add(moment(i.date.local).format("DD"))
        if (!isDuplicate) {
          return true
        }
        return false
      })

      if (unique.length > 0) {
        let record = unique.map((i) => {
          return {
            value: i.value,
            date: parseInt(moment(i.date.local).format("DD")),
          }
        })
        console.log("record", record)
        setDataValues(record)
      }
      console.log("unique", unique)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Carbon monoxide (Co)</h2>
      <div
        style={{
          paddingLeft: "200px",
          marginBottom: "20px",
          paddingRight: "200px",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="row"
        >
          <div className="col">
            <p>Select a city</p>
            <select
              value={cityy}
              onChange={(e) => {
                setcity(e.target.value)
              }}
            >
              {cities &&
                cities.map((item) => (
                  <>
                    <option>{item.city}</option>
                  </>
                ))}
            </select>
          </div>
          <div className="col">
            <div>
              <input
                type="date"
                style={{ float: "right" }}
                id="birthday"
                name="birthday"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              ></input>
              <p>From Date</p>
            </div>
            <div>
              <input
                type="date"
                style={{ float: "right" }}
                id="birthday"
                name="birthday"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              ></input>
              <p>To Date</p>

              <button style={{float:"right"}} type="submit" onClick={() => getData()}>
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
      <LineChart
        width={1000}
        height={250}
        data={dataValues}
        margin={{ top: 6, right: 30, left: 20, bottom: 6 }}
      >
        <XAxis dataKey="date" type="number" ticks={[5,10,15,20,25,30]} domain={[1, 30]}  />
        <YAxis dataKey="value" type="number" domain={[1, 2000]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          name="date of pages"
          type="monotone"
          dataKey="date"
          stroke="#8884d8"
        />
        <Line
          name="value of pages"
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
        />
      </LineChart>
    </>
  )
}

export default Resharts
