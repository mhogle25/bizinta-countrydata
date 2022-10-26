import { useEffect, useState } from 'react';
import { useLazyQuery } from "@apollo/client";
import { Tab, Tabs, Spinner } from '@blueprintjs/core';
import { CONTINENTS_QUERY } from "../graphql/queries";
import { createSearchParams } from 'react-router-dom';
import SearchInputField from "./SearchInputField";

//The continent header. Switches between continent tabs that display their respective countries in Panels
//Additionally provides a search bar for filtering countries in the active Panel
const ContinentsHeader = ({ searchParams, setSearchParams }) => {
  //A list of all the continent codes retrieved by the query
  //Used for error handling
  const [ continentCodes, setContinentCodes ] = useState(null);

  const [
    fetchContinents,
    {
      data,
      loading,
      error
    }
  ] = useLazyQuery(CONTINENTS_QUERY);

  //On render, fetch the continents data
  useEffect(() => {
    fetchContinents().then(() => { if (error) console.log(error); });
  }, [fetchContinents, error]);

  //Once data is available, put all continent codes in a set
  //This triggers once
  useEffect(() => {
    if (data) {
      const set = new Set(['WO']);
      data.continents.forEach((continent) => {
        set.add(continent.code);

      });
      setContinentCodes(set);
    }
  },[data]);

  //Display a spinner while the query completes
  if (loading) {
    return(
      <div style={{ minHeight: '100vh' }}>
        <Spinner style={{ minHeight: '100vh' }}/>
      </div>
    );
  }

  let continentCode = '';
  if (searchParams.has('continent'))
    continentCode = searchParams.get('continent');

  //When loading is finished, if the continent code provided
  //does not match any continent codes, throw an error
  if (!continentCodes)
    return null;
  if (!continentCodes.has(continentCode))
    throw new Error('Invalid continent code provided');

  const tabsOnChange = (newTabID) => {
    //Set the URl continent parameter to the new tab id
    setSearchParams(createSearchParams({ continent: newTabID }));
  }

  return (
    <div className="Header">
      <Tabs id="header-tabs" large onChange={ tabsOnChange } selectedTabId={ continentCode }>
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
        <SearchInputField
          setSearchParams={ setSearchParams }
        />
        <div/>
      </Tabs>
    </div>
  )
}

export default ContinentsHeader;
