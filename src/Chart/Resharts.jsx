import React from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const Resharts = () => {
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

  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 6, right: 30, left: 20, bottom: 6 }}
    >
      {/* <XAxis dataKey="name" /> */}
      <YAxis type="number" domain={[0, 30000]} />
      <XAxis type="number" domain={[0, 30000]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend verticalAlign="top" height={36} />
      <Line name="pv of pages" type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line name="uv of pages" type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  )
}

export default Resharts
