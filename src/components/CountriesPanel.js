import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client"
import { Classes } from "@blueprintjs/core"

import CountryInfo from './CountryInfo'
import { COUNTRIES_BY_CONTINENT_QUERY } from "../graphql/queries";
import { SelectedContinentContext } from "../Manager";

const headers = ["Flag", "Name", "Capital"]

const renderTableContent = (data, loading, loadingRefetch) => {
  //Return progress meters as the content of the first row while loading
  if (loading || loadingRefetch) return (
    <tr>
      {headers.map((header) => {
        return (
          <td key={header}>
            <div className={ Classes.PROGRESS_BAR }>
              <div className={ Classes.PROGRESS_METER } style={{ width: "100%"}}></div>
            </div>
          </td>
        )
      })}
    </tr>
  )

  return data && data.countries.map((country) => { return <CountryInfo key={country.name} country={country}/> });
}

const CountriesPanel = () => {
  //State to determine when a refetch is loading data
  const [ loadingRefetch, setLoadingRefetch ] = useState(false);
  const { selectedContinent } = useContext(SelectedContinentContext);

  const { data, loading, error, refetch } = useQuery(COUNTRIES_BY_CONTINENT_QUERY, { variables: { filterInput: { }}})

  useEffect(
    () => {
      let variables;
      if (selectedContinent === "WO") {
        variables = { filterInput: { }};
      } else {
        variables = { filterInput: { continent: { eq: selectedContinent }}};
      }
      //Indicate that a refetch is occurring so that loading indicators can be displayed
      setLoadingRefetch(true);
      refetch(variables).then(() => setLoadingRefetch(false));  //When fetched, indicate that loading is complete
    },
    [selectedContinent, refetch]
  );

  if (error) console.log(error);

  return (
    <div className="CountriesPanel">
      <table className={[ Classes.HTML_TABLE, Classes.HTML_TABLE_BORDERED, Classes.HTML_TABLE_CONDENSED, Classes.HTML_TABLE_STRIPED, Classes.INTERACTIVE ].join(' ')} style={{ width: "96%", marginLeft: "2%", marginRight: "2%", paddingBottom: "2%"}}>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th key={header}>{header}</th>
            })}
          </tr>
        </thead>
        <tbody>
        {renderTableContent(data, loading, loadingRefetch)}
        </tbody>
      </table>
    </div>
  )
}

export default CountriesPanel;
