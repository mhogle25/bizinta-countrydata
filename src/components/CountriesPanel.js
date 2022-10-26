import { useLazyQuery } from "@apollo/client";
import { COUNTRIES_BY_CONTINENT_QUERY } from "../graphql/queries";
import { createSearchParams } from "react-router-dom";
import { useEffect } from "react";

const headers = ["Flag", "Name", "Capital"]

const CountriesPanel = ({ searchParams, setSearchParams }) => {
  const [
    fetchCountries,
    {
      data,
      loading,
      error
    }
  ] = useLazyQuery(COUNTRIES_BY_CONTINENT_QUERY);

  //Query the server for the list of countries based on the selected continent
  useEffect(
    () => {
      const options = { variables: { filterInput: {}}}

      fetchCountries(
        searchParams.get('continent') === "WO" ?
          options :
          { variables: { filterInput: { continent: { eq: searchParams.get('continent') }}}}
      ).then(() => {
        if (error) console.log(error);
      });
    },
    [searchParams, fetchCountries, error]
  );


  if (!searchParams.has('continent'))
    return null;

  return (
    <div className="CountriesPanel">
      <table
        className="bp4-html-table bp4-html-table-bordered bp4-html-table-condensed bp4-html-table-striped bp4-interactive"
        style={{ width: "96%", marginLeft: "2%", marginRight: "2%", paddingBottom: "2%"}}
      >
        <thead>
          <tr>
            { headers.map((header) => {
              return <th key={ header }>{ header }</th>
            })}
          </tr>
        </thead>
        <tbody>
        { renderTableContent(data, loading, searchParams.get('continent'), searchParams.has('input') ? searchParams.get('input') : "", setSearchParams) }
        </tbody>
      </table>
    </div>
  )
};

const renderTableContent = (data, loading, selectedContinentCode, inputSearchParam, setSearchParams) => {
  //Return progress meters as the content of the first row while loading
  if (loading) return renderTableLoading();

  //When a row is clicked, set the country field of search params to that row's country code
  //This will trigger the useEffect (ref 1)
  return data && data.countries.map((country) => {
    //This code will filter out entries in the table based on search specifications
    if (country.name.toLowerCase().includes(inputSearchParam.toLowerCase())) return (
      <tr
        key={ country.code }
        onClick={() => {
          //Set the search params to have a country field with this country's code
          setSearchParams(createSearchParams({ continent: selectedContinentCode, country: country.code }));
        }}
      >
        <td>{ country.emoji }</td>
        <td>{ country.name }</td>
        <td>{ country.capital }</td>
      </tr>
    )

    return null;
  });
}

const renderTableLoading = () => {
  return (
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
}

export default CountriesPanel;
