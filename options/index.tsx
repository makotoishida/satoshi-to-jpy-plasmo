import { useState } from "react"

function OptionsIndex() {
  const [data, setData] = useState("")

  return (
    <div>
      <h1>Satoshi to Yen</h1>
      <h2>Preference</h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      {data}
    </div>
  )
}

export default OptionsIndex
