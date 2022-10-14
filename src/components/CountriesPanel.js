import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client"

import CountryInfo from './CountryInfo'
import { COUNTRIES_BY_CONTINENT_QUERY } from "../graphql/queries";

const headers = ["Flag", "Name", "Capital"]

const renderTableContent = (data, loading) => {
  //Return progress meters as the content of the first row while loading
  if (loading) return (
    <tr>
      {headers.map((header) => {
        return (
          <td key={header}>
            <div className="bp4-progress-bar">
              <div
                className={ 'bp4-progress-meter' }
                style={{ width: "100%"}}
              />
            </div>
          </td>
        )
      })}
    </tr>
  )

  return data && data.countries.map((country) => { return <CountryInfo key={country.name} country={country}/> });
}

const CountriesPanel = ({selectedContinent}) => {
  //State to determine when a refetch is loading data
  //const { selectedContinent } = useContext(SelectedContinentContext);

  const options = selectedContinent === "WO" ? { variables: { filterInput: {}}} : { variables: { filterInput: { continent: { eq: selectedContinent }}}};

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
      //console.log(`Countries Query (Continent: ${ selectedContinent }`)
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
        {renderTableContent(data, loading)}
        </tbody>
      </table>
    </div>
  )
}

export default CountriesPanel;
