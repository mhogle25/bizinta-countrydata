import CountriesPanel from "./CountriesPanel";
import ContinentsHeader from "./ContinentsHeader";
import { createSearchParams, useSearchParams } from "react-router-dom";

const Manager = () => {
  //The URL parameter for which continent and country is currently selected
  const [ searchParams, setSearchParams ] = useSearchParams(createSearchParams({ continent: "WO" }));

  return (
    <div className={ "Manager" }>
      <ContinentsHeader
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
      />
      <CountriesPanel
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
      />
    </div>
  )
}

export default Manager;
