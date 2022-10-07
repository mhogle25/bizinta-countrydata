import { useState } from 'react';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Tab, Tabs } from '@blueprintjs/core';

import CountriesPanel from './CountriesPanel';
import { ContinentIDs } from '../data/ids.js'

//The continent header. Switches between continent tabs that display their respective countries in Panels
//Additionally provides a search bar for filtering countries in the active Panel
const ContinentsHeader = () => {
  const [ selectedTab, setSelectedTab ] = useState(ContinentIDs.world);

  const tabsOnChange = (newTabID) => {
    setSelectedTab(newTabID);
  }

  return (
    <div className="Header">
      <Tabs id="header-tabs" large onChange={tabsOnChange} selectedTabId={selectedTab}>
        <div/>
        <Tab id={ContinentIDs.world} title="World" panel={<CountriesPanel id={ContinentIDs.world}/>} panelClassName="world-panel"/>
        <Tab id={ContinentIDs.africa} title="Africa" panel={<CountriesPanel id={ContinentIDs.africa}/>} panelClassName="africa-panel"/>
        <Tab id={ContinentIDs.asia} title="Asia" panel={<CountriesPanel id={ContinentIDs.asia}/>} panelClassName="asia-panel"/>
        <Tab id={ContinentIDs.australia} title="Australia" panel={<CountriesPanel id={ContinentIDs.australia}/>} panelClassName="australia-panel"/>
        <Tab id={ContinentIDs.europe} title="Europe" panel={<CountriesPanel id={ContinentIDs.europe}/>} panelClassName="europe-panel"/>
        <Tab id={ContinentIDs.northAmerica} title="North America" panel={<CountriesPanel id={ContinentIDs.northAmerica}/>} panelClassName="north-america-panel"/>
        <Tab id={ContinentIDs.southAmerica} title="South America" panel={<CountriesPanel id={ContinentIDs.southAmerica}/>} panelClassName="south-america-panel"/>
        <Tabs.Expander/>
        <input className="bp4-input" type="text" placeholder="Search..." />
        <div/>
      </Tabs>
    </div>
  )
}

export default ContinentsHeader;
