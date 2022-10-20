import { useEffect } from 'react'
import { useLazyQuery } from "@apollo/client";

import { Tab, Tabs, Spinner } from '@blueprintjs/core';

import { CONTINENTS_QUERY } from "../graphql/queries";

import { createSearchParams } from 'react-router-dom'
//The continent header. Switches between continent tabs that display their respective countries in Panels
//Additionally provides a search bar for filtering countries in the active Panel
const ContinentsHeader = ({ searchParams, setSearchParams }) => {
  const [
    fetchContinents,
    {
      data,
      loading,
      error
    }
  ] = useLazyQuery(CONTINENTS_QUERY);

  useEffect(() => {
    fetchContinents().then(() => { if (error) console.log(error) })
  }, [fetchContinents, error])

  if (error) console.log(error);

  //Display a spinner while the query completes
  if (loading) return(
    <div style={{ minHeight: "100vh" }}>
      <Spinner style={{ minHeight: "100vh" }}/>
    </div>
  );

  const tabsOnChange = (newTabID) => {
    //Set the URl continent parameter to the new tab id
    setSearchParams(createSearchParams({ continent: newTabID }));
  }

  return (
    <div className="Header">
      <Tabs id="header-tabs" large onChange={ tabsOnChange } selectedTabId={ searchParams.get('continent') }>
        <div/>
        <Tab key="world-panel" id="WO" title="World"/>
        { data && data.continents.map((continent) => {
          //Create a unique key and class name for each continent
          const key = continent.name.replace(/\s/g, "").toLowerCase()
          return (
            <Tab key={ key + '-panel' } id={ continent.code } title={ continent.name }/>
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
