import { useQuery, gql } from "@apollo/client"

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import { Column, Table2, TableLoadingOption, Cell } from "@blueprintjs/table";
import { HotkeysProvider } from "@blueprintjs/core";

const COUNTRIES_BY_CONTINENT_QUERY = gql`
  query GetCountriesFromContinent($filterInput: CountryFilterInput!) {
      countries(filter: $filterInput) {
          code
          name
          emoji
          capital
          continent {
              code
              name
          }
      }
  }
`

const COUNTRIES_QUERY = gql`
  query GetAllCountries {
      countries {
          code
          name
          emoji
          capital
          continent {
              code
              name
          }
      }
  }
`

const CountriesPanel = ({id}) => {
  let query = COUNTRIES_BY_CONTINENT_QUERY;
  if (id === "WO")
    query = COUNTRIES_QUERY;

  const { data, loading, error }= useQuery(query,
    {
      variables: {
        filterInput: {
          continent: {
            eq: id
          }
        }
      }
    });

  if (error) console.log(error);

  return (
    <div className="CountriesPanel">
      <HotkeysProvider>
        {/*Will set the table to loading while data is still being queried*/}
        <Table2 numRows= { loading ? 1 : data.countries.length } loadingOptions={ loading ? [ TableLoadingOption.COLUMN_HEADERS, TableLoadingOption.CELLS, TableLoadingOption.ROW_HEADERS ] : [] }>
          <Column name="Flag" cellRenderer={(rowIndex) => { return data ? <Cell>{data.countries[rowIndex].emoji}</Cell> : <Cell/>}}/>
          <Column name="Name" cellRenderer={(rowIndex) => { return data ? <Cell>{data.countries[rowIndex].name}</Cell> : <Cell/>}}/>
          <Column name="Capital" cellRenderer={(rowIndex) => { return data ? <Cell>{data.countries[rowIndex].capital}</Cell> : <Cell/>}}/>
        </Table2>
      </HotkeysProvider>
    </div>
  )
}

export default CountriesPanel;
