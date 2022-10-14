import { useEffect } from 'react'
import { useLazyQuery } from "@apollo/client";

import { Tab, Tabs, Spinner } from '@blueprintjs/core';

import { CONTINENTS_QUERY } from "../graphql/queries";

//The continent header. Switches between continent tabs that display their respective countries in Panels
//Additionally provides a search bar for filtering countries in the active Panel
const ContinentsHeader = ({ selectedContinent, setSelectedContinent }) => {
  const [
    fetchContinents,
    {
      data,
      loading,
      error
    }
  ] = useLazyQuery(CONTINENTS_QUERY);

  useEffect(() => {
    //console.log("Continent Query")
    fetchContinents().then(() => { if (error) console.log(error) })
  }, [fetchContinents, error])

  if (error) console.log(error);

  //Display a spinner while the query completes
  if (loading) return(
    <div style={{ minHeight: "100vh" }}>
      <Spinner style={{ minHeight: "100vh" }}/>
    </div>
  );

  const tabsOnChange = (newTabID) => setSelectedContinent(newTabID);

  return (
    <div className="Header">
        <Tabs id="header-tabs" large onChange={ tabsOnChange } selectedTabId={ selectedContinent }>
          <div/>
          <Tab key="world-panel" id="WO" title="World"/>
          { data && data.continents.map((continent) => {
            //Create a unique key and class name for each continent
            return (
              <Tab key={ continent.name.replace(/\s/g, "").toLowerCase() + '-panel' } id={ continent.code } title={ continent.name }/>
            )
          })}
          <Tabs.Expander/>
          <input className="bp4-input" type="text" placeholder="Search..." />
          <div/>
        </Tabs>
    </div>
  )
}

export default ContinentsHeader;
