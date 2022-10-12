import { useState } from 'react';
import { gql, useQuery } from "@apollo/client";

import { Tab, Tabs, H5, Classes } from '@blueprintjs/core';

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

  if (error) console.log(error);

  if (loading) return <H5>Loading Continents...</H5>;

  const tabsOnChange = (newTabID) => setSelectedTab(newTabID);

  return (
    <div className="Header">
        <Tabs id="header-tabs" large onChange={tabsOnChange} selectedTabId={selectedTab}>
          <div/>
          <Tab key="world-panel" id="WO" title="World" panel={<CountriesPanel id="WO"/>} panelClassName="world-panel"/>
          { data && data.continents.map((continent) => {
            //Create a unique key and class name for each continent
            const key = continent.name.replace(/\s/g, "").toLowerCase();
            return (
              <Tab key={key} id={continent.code} title={continent.name} panel={<CountriesPanel id={continent.code}/>} panelClassName={key + '-panel'}/>
            )
          })}
          <Tabs.Expander/>
          <input className={Classes.INPUT} type="text" placeholder="Search..." />
          <div/>
        </Tabs>
    </div>
  )
}

export default ContinentsHeader;
