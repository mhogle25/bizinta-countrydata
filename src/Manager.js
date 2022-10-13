import CountriesPanel from "./components/CountriesPanel";
import ContinentsHeader from "./components/ContinentsHeader";
import { useState, createContext } from "react";

export const SelectedContinentContext = createContext(null)

const Manager = () => {
  const [ selectedContinent, setSelectedContinent ] = useState("WO");

  return (
    <SelectedContinentContext.Provider value={{ selectedContinent }}>
      <ContinentsHeader setSelectedContinent={setSelectedContinent}/>
      <CountriesPanel/>
    </SelectedContinentContext.Provider>
  )
}

export default Manager;
