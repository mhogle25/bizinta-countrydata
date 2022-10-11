import { useQuery, gql } from "@apollo/client"

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

//Queries for a list of countries based on the continent code passed
const COUNTRIES_BY_CONTINENT_QUERY = gql`
  query GetCountriesFromContinent($filterInput: CountryFilterInput!) {
      countries(filter: $filterInput) {
          code
          name
          emoji
          capital
      }
  }
`

//Queries for all countries in the DB
const COUNTRIES_QUERY = gql`
  query GetAllCountries {
      countries {
          code
          name
          emoji
          capital
      }
  }
`

//Visualization of the table loading data
const renderTableContent = (data, loading) => {
  if (loading) return (
    <tr>
      <th>Loading...</th>
      <th>Loading...</th>
      <th>Loading...</th>
    </tr>
  )

  return (
    data && data.countries.map((country) => {
      return (
        <tr key={country.code}>
          <td>{country.emoji}</td>
          <td>{country.name}</td>
          <td>{country.capital}</td>
        </tr>
      )
    })
  )
}

const CountriesPanel = ({id}) => {
  //If this panel is a child of the World tab, query all countries
  let query = COUNTRIES_BY_CONTINENT_QUERY;
  if (id === "WO") {
    query = COUNTRIES_QUERY;
  }

  const { data, loading, error }= useQuery(query, { variables: { filterInput: { continent: { eq: id } } } });

  if (error) console.log(error);

  return (
    <div className="CountriesPanel">
      <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-condensed bp4-html-table-striped bp4-interactive" style={{ width: "96%", marginLeft: "2%", marginRight: "2%", paddingBottom: "2%"}}>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Capital</th>
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
