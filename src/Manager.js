import CountriesPanel from "./components/CountriesPanel";
import ContinentsHeader from "./components/ContinentsHeader";
import { useState } from "react";

const Manager = () => {
  const [ selectedContinent, setSelectedContinent ] = useState("WO");

  return (
    <div className="Manager">
      <ContinentsHeader selectedContinent={selectedContinent} setSelectedContinent={setSelectedContinent}/>
      <CountriesPanel selectedContinent={selectedContinent}/>
    </div>
  )
}

export default Manager;
