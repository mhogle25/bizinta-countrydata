import { useState } from "react";
import { Dialog, Tabs, Tab, Spinner } from '@blueprintjs/core';
import CountryInfoGeneralPanel from "./CountryInfoGeneralPanel";
import CountryInfoLanguagePanel from "./CountryInfoLanguagePanel";
import { useQuery } from '@apollo/client';
import { COUNTRY_BY_CODE_QUERY } from '../graphql/queries';
import CountryInfoContactsPanel from "./CountryInfoContactsPanel";

const CountryInfoDialog = ({ countryCode, closeDialog  }) => {
  //The currently selected tab state of the Dialog. Initialized to show General Info
  const [ selectedTab, setSelectedTab ] = useState("GI");

  const queryOptions = { variables: { code: countryCode } };

  const {
    data,
    loading,
    error
  } = useQuery(COUNTRY_BY_CODE_QUERY, queryOptions);

  //Conditionally renders the languages tab of the Dialog (as long as a list of languages exists, or it is greater than 0)
  const renderLanguagesTab = () => {
    let { languages } = data.country;

    if (languages && languages.length > 0) return (
      <Tab
        key="languages-tab"
        id="LA"
        title="Languages"
        panel={<CountryInfoLanguagePanel languages={ languages }/>}
      />
    )
    return null;
  }

  //Returns a row of the countries table and an attached Dialog to be opened on click
  //Only render if the selected country exists
  const renderTabs = () => {
    //Displays a spinner while the query completes
    if (loading) return (
      <div style={{ width: "100%", marginLeft:"auto", marginRight:"auto", height: "100%", marginBottom: "auto", marginTop: "auto" }}>
        <Spinner style={{ width: "100%", marginLeft:"auto", marginRight:"auto", height: "100%", marginBottom: "auto", marginTop: "auto" }}/>
      </div>
    );

    if (!data) return null;
    if (!data.country) throw new Error('Invalid country code provided');

    return (
      <Tabs id="country-dialog-tabs" onChange={(newTabID) => setSelectedTab(newTabID)} selectedTabId={selectedTab}>
        <Tab
          key="general-info-tab"
          id="GI"
          title="General Info"
          panel={<CountryInfoGeneralPanel country={ data.country } />}
        />
        { renderLanguagesTab() }
        <Tab
          key="contacts-tab"
          id="CO"
          title="Contacts"
          panel={<CountryInfoContactsPanel countryCode={ countryCode }/>}
        />
      </Tabs>
    )
  }

  const renderDialog = () => {
    return (
      <div className="CountryInfoDialog">
        <Dialog isOpen onClose={ closeDialog }>
          <div className="bp4-dialog-body">
            { renderTabs() }
          </div>
        </Dialog>
      </div>
    )
  }

  return renderDialog();
}

export default CountryInfoDialog;
