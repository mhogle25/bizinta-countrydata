import { useQuery, gql } from "@apollo/client"
import { Classes } from "@blueprintjs/core"

import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import CountryInfo from './CountryInfo'

//Queries for a list of countries based on the continent code passed
const COUNTRIES_BY_CONTINENT_QUERY = gql`
  query GetCountriesFromContinent($filterInput: CountryFilterInput!) {
    countries(filter: $filterInput) {
      code
      name
      native
      phone
      continent {
        code
        name
      }
      capital
      currency
      languages {
        code
        name
        native
        rtl
      }
      emoji
      emojiU
      states {
        code
        name
      }
    }
  }
`

//Queries for all countries in the DB
const COUNTRIES_QUERY = gql`
  query GetAllCountries {
    countries {
      code
      name
      native
      phone
      continent {
        code
        name
      }
      capital
      currency
      languages {
        code
        name
        native
        rtl
      }
      emoji
      emojiU
      states {
        code
        name
      }
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
        <CountryInfo country={country}/>
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
      <table className={[ Classes.HTML_TABLE, Classes.HTML_TABLE_BORDERED, Classes.HTML_TABLE_CONDENSED, Classes.HTML_TABLE_STRIPED, Classes.INTERACTIVE ].join(' ')} style={{ width: "96%", marginLeft: "2%", marginRight: "2%", paddingBottom: "2%"}}>
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
