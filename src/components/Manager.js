import CountriesPanel from "./CountriesPanel";
import ContinentsHeader from "./ContinentsHeader";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import CountryInfoDialog from "./CountryInfoDialog";
import { observable } from "mobx";

const Manager = () => {
  //The URL parameter for which continent and country is currently selected
  const [ searchParams, setSearchParams ] = useSearchParams(createSearchParams({ continent: "WO" }));
  //The state that controls if the Country Info Dialog is open or not
  const [ dialogOpen, setDialogOpen ] = useState(false);
  //The state that contains the current value of the search input field (input field is a child of continents header)
  const [ searchInputFieldValue, setSearchInputFieldValue ] = observable(useState(""));

  return (
    <div className={ "Manager" }>
      <ContinentsHeader
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
        searchInputFieldValue={ searchInputFieldValue }
        setSearchInputFieldValue={ setSearchInputFieldValue }
      />
      <CountriesPanel
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
        searchInputFieldValue={ searchInputFieldValue }
        setDialogOpen={ setDialogOpen }
      />
      <CountryInfoDialog
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
        dialogOpen={ dialogOpen }
        setDialogOpen={ setDialogOpen }
      />
    </div>
  )
}

export default Manager;
