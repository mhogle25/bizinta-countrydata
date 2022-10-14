import { useState, useCallback } from "react";
import { Dialog, Tabs, Tab } from '@blueprintjs/core';
import CountryInfoGeneralPanel from "./CountryInfoGeneralPanel";
import CountryInfoLanguagePanel from "./CountryInfoLanguagePanel";

const CountryInfo = ({country}) => {
  //The currently selected tab state of the Dialog. Initialized to show General Info
  const [ selectedTab, setSelectedTab ] = useState("GI");
  //The state that controls if the Dialog is open or not
  const [ dialogOpen, setDialogOpen ] = useState(false);

  const handleButtonClick = () => setDialogOpen(!dialogOpen);
  const handleClose = useCallback(() => { setDialogOpen(false); }, [])

  //Conditionally renders the languages tab of the Dialog (as long as a list of languages exists, or it is greater than 0)
  const renderLanguagesTab = () => {
    if (country.languages && country.languages.length > 0) return (
      <Tab
        key="languages-tab"
        id="LA"
        title="Languages"
        panel={<CountryInfoLanguagePanel list={country.languages}/>}
      />
    )

    return null;
  }

  //Returns a row of the countries table and an attached Dialog to be opened on click
  return (
    <>
      <tr key={country.code} onClick={handleButtonClick}>
        <td>{country.emoji}</td>
        <td>{country.name}</td>
        <td>{country.capital}</td>
      </tr>
      <Dialog isOpen={dialogOpen} onClose={handleClose}>
        <div className="bp4-dialog-body">
          <Tabs id="country-dialog-tabs" onChange={(newTabID) => setSelectedTab(newTabID)} selectedTabId={selectedTab}>
            <Tab
              key="general-info-tab"
              id="GI" title="General Info"
              panel={<CountryInfoGeneralPanel country={country}/>}
            />
            {renderLanguagesTab()}
          </Tabs>
        </div>
      </Dialog>
    </>
  )
}

export default CountryInfo;
