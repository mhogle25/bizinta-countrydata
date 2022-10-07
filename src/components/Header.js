import { useState } from 'react';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Tab, Tabs } from '@blueprintjs/core';

import Panel from './Panel';

//The continent header. Switches between continent tabs that display their respective countries in Panels
//Additionally provides a search bar for filtering countries in the active Panel
const Header = () => {
  const [ selectedTab, setSelectedTab ] = useState("wo");

  const tabsOnChange = (newTabID) => {
    setSelectedTab(newTabID);
  }

  return (
    <div className="Header">
      <Tabs id="header-tabs" onChange={tabsOnChange} selectedTabId={selectedTab}>
        <Tab id="wo" title="World" panel={<Panel name={"World"}/>} panelClassName="world-panel"/>
        <Tab id="af" title="Africa" panel={<Panel name={"Africa"}/>} panelClassName="africa-panel"/>
        <Tab id="as" title="Asia" panel={<Panel name={"Asia"}/>} panelClassName="asia-panel"/>
        <Tab id="au" title="Australia" panel={<Panel name={"Australia"}/>} panelClassName="australia-panel"/>
        <Tab id="eu" title="Europe" panel={<Panel name={"Europe"}/>} panelClassName="europe-panel"/>
        <Tab id="na" title="North America" panel={<Panel name={"North America"}/>} panelClassName="north-america-panel"/>
        <Tab id="sa" title="South America" panel={<Panel name={"South America"}/>} panelClassName="south-america-panel"/>
        <Tabs.Expander />
        <input className="bp4-input" type="text" placeholder="Search..." />
      </Tabs>
    </div>
  )
}

export default Header;
