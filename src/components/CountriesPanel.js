import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client"

import CountryInfoDialog from './CountryInfoDialog'
import { COUNTRIES_BY_CONTINENT_QUERY } from "../graphql/queries";
import { createSearchParams } from "react-router-dom";

const headers = ["Flag", "Name", "Capital"]

const renderTableContent = (data, loading, selectedContinent, setSearchParams, setDialogOpen) => {
  //Return progress meters as the content of the first row while loading
  if (loading) return (
    <tr>
      {headers.map((header) => {
        return (
          <td key={ header }>
            <div className="bp4-progress-bar">
              <div
                className={ 'bp4-progress-meter' }
                style={{ width: "100%" }}
              />
            </div>
          </td>
        )
      })}
    </tr>
  )
  //When a row is clicked, set the country field of search params to that row's country code
  //This will trigger the useEffects below (ref 1 and 2)
  return data && data.countries.map((country) => { return (
    <tr
      key={ country.code }
      onClick={() => {
        setSearchParams(createSearchParams({ continent: selectedContinent, country: country.code }));
      }}
    >
      <td>{ country.emoji }</td>
      <td>{ country.name }</td>
      <td>{ country.capital }</td>
    </tr>
  )});
}

const CountriesPanel = ({ selectedContinent, searchParams, setSearchParams }) => {
  const options = selectedContinent === "WO" ?
    { variables: { filterInput: {}}} :
    { variables: { filterInput: { continent: { eq: selectedContinent }}}};

  //The state that controls if the Dialog is open or not
  const [ dialogOpen, setDialogOpen ] = useState(false);

  const [ selectedCountry, setSelectedCountry ] = useState(null);

  const [
    fetchCountries,
    {
      data,
      loading,
      error
    }
  ] = useLazyQuery(COUNTRIES_BY_CONTINENT_QUERY, options);

  //Query the server for the list of countries based on the selected continent
  useEffect(
    () => {
      fetchCountries(
        selectedContinent === "WO" ?
          { variables: { filterInput: {}}} :
          { variables: { filterInput: { continent: { eq: selectedContinent }}}}
      ).then(() => {
        if (error) console.log(error);
      });
    },
  [selectedContinent, fetchCountries, error]
  );

  //[ref 1]
  // When the country field of the search params becomes something other than null,
  //find the corresponding country in the countries list and set the selected country
  //to it
  useEffect(
    () => {
      console.log(searchParams.get('country') === null);
      console.log(searchParams.get('country'));
      if (searchParams.get('country') === null) {
        console.log('set selected country to null');
        setSelectedCountry(null);
        return;
      }

      if (data) {
        data.countries.map((country) => {
          if (country.code === searchParams.get('country')) {
            console.log(`set selected country to ${country.name}`)
            setSelectedCountry(country);
          }
          return null;
        });
      }
    },
    [searchParams, setSelectedCountry, data]
  )

  //[ref 2]
  // When the selected country becomes something other than null,
  //set the dialog to open
  useEffect(
    () => {
      console.log(`selected country exists: ${selectedCountry !== null}`);
      setDialogOpen(selectedCountry !== null);
    },
    [selectedCountry, setDialogOpen]
    )
  if (error) console.log(error);

  return (
    <div className="CountriesPanel">
      <table
        className="bp4-html-table bp4-html-table-bordered bp4-html-table-condensed bp4-html-table-striped bp4-interactive"
        style={{ width: "96%", marginLeft: "2%", marginRight: "2%", paddingBottom: "2%"}}
      >
        <thead>
          <tr>
            {headers.map((header) => {
              return <th key={header}>{header}</th>
            })}
          </tr>
        </thead>
        <tbody>
        { renderTableContent(data, loading, selectedContinent, setSearchParams, setDialogOpen) }
        </tbody>
      </table>
      <CountryInfoDialog
        selectedContinent={ selectedContinent }
        selectedCountry={ selectedCountry }
        setSearchParams={ setSearchParams }
        dialogOpen={ dialogOpen }
        setDialogOpen={setDialogOpen}
      />
    </div>
  )
}

export default CountriesPanel;
