import CountriesPanel from "./CountriesPanel";
import ContinentsHeader from "./ContinentsHeader";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {useState} from "react";
import CountryInfoDialog from "./CountryInfoDialog";

const Manager = () => {
  //The URL parameter for which continent and country is currently selected
  const [ searchParams, setSearchParams ] = useSearchParams(createSearchParams({ continent: "WO" }));
  //The state that controls if the Country Info Dialog is open or not
  const [ dialogOpen, setDialogOpen ] = useState(false);

  return (
    <div className={ "Manager" }>
      <ContinentsHeader
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
      />
      <CountriesPanel
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
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
