import CountriesPanel from "./CountriesPanel";
import ContinentsHeader from "./ContinentsHeader";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CountryInfoDialog from "./CountryInfoDialog";

const Manager = () => {
  //The URL parameter for which continent and country is currently selected
  const [ searchParams, setSearchParams ] = useSearchParams();

  const updateUrlParam = (newKey, newValue) => {
    let newParams = { };

    searchParams.forEach((value, key) => {
      if (key !== newKey) {
        newParams[key] = value;
      }
    });

    if (newValue != null)
      newParams[newKey] = newValue;

    setSearchParams(createSearchParams(newParams));
  };

  let countryCode = searchParams.get("country");

  let closeDialog = () => {
    updateUrlParam('country', null);
  };

  return (
    <div className="Manager">
      <ContinentsHeader
        searchParams={ searchParams }
        setSearchParams={ setSearchParams }
        updateUrlParam={ updateUrlParam }
      />
      <CountriesPanel
        searchParams={ searchParams }
        updateUrlParam={ updateUrlParam }
      />

      { countryCode != null &&
      <CountryInfoDialog
        countryCode={ countryCode }
        closeDialog={ closeDialog }
      />
      }
    </div>
  )
}

export default Manager;
