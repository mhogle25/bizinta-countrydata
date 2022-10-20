import CountriesPanel from "./CountriesPanel";
import ContinentsHeader from "./ContinentsHeader";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {useState} from "react";

const Manager = () => {
  //The URL parameter for which continent and country is currently selected
  const [ searchParams, setSearchParams ] = useSearchParams(createSearchParams({ continent: "WO" }));

  //Only need to give the countries panel the currently selected continent from the search params
  return (
    <div className={ "Manager" }>
      <ContinentsHeader
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
      />
      <CountriesPanel
        selectedContinent={ searchParams.get('continent') }
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
      />
    </div>
  )
}

export default Manager;
