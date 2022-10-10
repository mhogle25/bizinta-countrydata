import { useState } from 'react';
import { gql, useQuery } from "@apollo/client";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Tab, Tabs, H1 } from '@blueprintjs/core';

import CountriesPanel from './CountriesPanel';

//GQL query for basic continent info
const CONTINENTS_QUERY = gql`
    query GetAllContinents {
      continents {
        code
        name
      }
    }
`

//The continent header. Switches between continent tabs that display their respective countries in Panels
//Additionally provides a search bar for filtering countries in the active Panel
const ContinentsHeader = () => {
  const { data, loading, error } = useQuery(CONTINENTS_QUERY);
  const [ selectedTab, setSelectedTab ] = useState("WO");

  if (error) {
    console.log(error);
    return <div/>
  }

  if (loading) {
    return (
      <H1>Loading Continents...</H1>
    )
  }

  const tabsOnChange = (newTabID) => {
    setSelectedTab(newTabID);
  }

  return (
    <div className="Header">
      <Tabs id="header-tabs" large onChange={tabsOnChange} selectedTabId={selectedTab}>
        <div/>
        <Tab id="WO" title="World" panel={<CountriesPanel id="WO"/>} panelClassName="World"/>
        { data && data.continents.map((continent) => {
            return (
              <Tab id={continent.code} title={continent.name} panel={<CountriesPanel id={continent.code}/>} panelClassName={continent.name}/>
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
