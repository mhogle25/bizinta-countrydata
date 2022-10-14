import { useState, useCallback } from "react";
import { Dialog, Tabs, Tab } from '@blueprintjs/core';
import CountryInfoGeneralPanel from "./CountryInfoGeneralPanel";
import CountryInfoLanguagePanel from "./CountryInfoLanguagePanel";

const CountryInfoDialog = ({ selectedCountry, setSelectedCountry, dialogOpen, setDialogOpen }) => {
  //The currently selected tab state of the Dialog. Initialized to show General Info
  const [ selectedTab, setSelectedTab ] = useState("GI");

  const handleClose = useCallback(
    () => {
      setSelectedCountry(null);
      setDialogOpen(false);
    },
    [setDialogOpen, setSelectedCountry]
  );

  const renderDialog = () => {
    return (
      <>
        <Dialog isOpen={dialogOpen} onClose={handleClose}>
          <div className="bp4-dialog-body">
            <Tabs id="country-dialog-tabs" onChange={(newTabID) => setSelectedTab(newTabID)} selectedTabId={selectedTab}>
              <Tab
                key="general-info-tab"
                id="GI" title="General Info"
                panel={<CountryInfoGeneralPanel country={ selectedCountry }/>}
              />
              {renderLanguagesTab()}
            </Tabs>
          </div>
        </Dialog>
      </>
    )
  }

  //Conditionally renders the languages tab of the Dialog (as long as a list of languages exists, or it is greater than 0)
  const renderLanguagesTab = () => {
    if (selectedCountry.languages && selectedCountry.languages.length > 0) return (
      <Tab
        key="languages-tab"
        id="LA"
        title="Languages"
        panel={<CountryInfoLanguagePanel list={ selectedCountry.languages }/>}
      />
    )

    return null;
  }

  //Returns a row of the countries table and an attached Dialog to be opened on click
  return renderDialog()
}

export default CountryInfoDialog;
