import { useState, useCallback, useEffect } from "react";
import { Dialog, Tabs, Tab, Spinner } from '@blueprintjs/core';
import CountryInfoGeneralPanel from "./CountryInfoGeneralPanel";
import CountryInfoLanguagePanel from "./CountryInfoLanguagePanel";
import { createSearchParams } from "react-router-dom";
import { useLazyQuery } from '@apollo/client';
import { COUNTRY_BY_CODE_QUERY } from '../graphql/queries';

const CountryInfoDialog = ({ searchParams, setSearchParams, dialogOpen, setDialogOpen }) => {
  //The currently selected tab state of the Dialog. Initialized to show General Info
  const [ selectedTab, setSelectedTab ] = useState("GI");

  const queryOptions = searchParams.has('country') ?
    { variables: { code: searchParams.get('country') }} :
    { variables: { code: ''}} ;

  const [
    fetchCountry,
    {
      data,
      loading,
      error
    }
  ] = useLazyQuery(COUNTRY_BY_CODE_QUERY, queryOptions)

  useEffect(
    () => {
      if (dialogOpen && searchParams.has('country')) {
        fetchCountry({ variables: { code: searchParams.get('country') }}).then(() => {
          if (error) console.log(error);
        })
      }
    },
    [dialogOpen, fetchCountry, searchParams, error]
  );

  const handleClose = useCallback(
    () => {
      setDialogOpen(false);
      setSearchParams(createSearchParams({ continent: searchParams.get('continent') }));
    },
    [searchParams, setSearchParams, setDialogOpen]
  );

  //Conditionally renders the languages tab of the Dialog (as long as a list of languages exists, or it is greater than 0)
  const renderLanguagesTab = () => {
    if (data.country.languages && data.country.languages.length > 0) return (
      <Tab
        key="languages-tab"
        id="LA"
        title="Languages"
        panel={<CountryInfoLanguagePanel list={ data.country.languages }/>}
      />
    )
    return null;
  }

  //Returns a row of the countries table and an attached Dialog to be opened on click
  //Only render if the selected country exists
  const renderTabs = () => {
    //Displays a spinner while the query completes
    if (loading) return(
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
          id="GI" title="General Info"
          panel={<CountryInfoGeneralPanel country={ data.country } />}
        />
        { renderLanguagesTab() }
      </Tabs>
    )
  }

  const renderDialog = () => {
    return (
      <div className="CountryInfoDialog">
        <Dialog isOpen={dialogOpen} onClose={handleClose}>
          <div className="bp4-dialog-body">
            {renderTabs()}
          </div>
        </Dialog>
      </div>
    )
  }

  return renderDialog();
}

export default CountryInfoDialog;
