import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client"

import CountryInfoDialog from './CountryInfoDialog'
import { COUNTRIES_BY_CONTINENT_QUERY } from "../graphql/queries";

const headers = ["Flag", "Name", "Capital"]

const renderTableContent = (data, loading, setCurrentCountry, setDialogOpen) => {
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

  return data && data.countries.map((country) => { return (
    <tr key={ country.code } onClick={() => {
      setCurrentCountry(country)
      setDialogOpen(true);
    }}>
      <td>{ country.emoji }</td>
      <td>{ country.name }</td>
      <td>{ country.capital }</td>
    </tr>
  )});
}

const CountriesPanel = ({ selectedContinent }) => {
  //State to determine when a refetch is loading data

  const options = selectedContinent === "WO" ? { variables: { filterInput: {}}} : { variables: { filterInput: { continent: { eq: selectedContinent }}}};

  //The state that controls if the Dialog is open or not
  const [ dialogOpen, setDialogOpen ] = useState(false);
  //The state that holds the data of the currently open country
  const [ selectedCountry, setSelectedCountry ] = useState(null);

  const [
    fetchCountries,
    {
      data,
      loading,
      error
    }
  ] = useLazyQuery(COUNTRIES_BY_CONTINENT_QUERY, options);

  useEffect(
    () => {
      fetchCountries(
        selectedContinent === "WO" ? { variables: { filterInput: {}}} : { variables: { filterInput: { continent: { eq: selectedContinent }}}}
      ).then(() => {
        if (error) console.log(error);
      });
    },
  [selectedContinent, fetchCountries, error]
  );

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
        {renderTableContent(data, loading, setSelectedCountry, setDialogOpen)}
        </tbody>
      </table>
      { selectedCountry ? <CountryInfoDialog selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} /> : null }
    </div>
  )
}

export default CountriesPanel;
