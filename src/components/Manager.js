import CountriesPanel from "./CountriesPanel";
import ContinentsHeader from "./ContinentsHeader";
import { useState } from "react";

const Manager = () => {
  const [ selectedContinent, setSelectedContinent ] = useState("WO");

  return (
    <div className={ "Manager" }>
      <ContinentsHeader selectedContinent={ selectedContinent } setSelectedContinent={ setSelectedContinent }/>
      <CountriesPanel selectedContinent={ selectedContinent }/>
    </div>
  )
}

export default Manager;
