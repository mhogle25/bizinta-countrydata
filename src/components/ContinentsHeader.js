import { useQuery } from "@apollo/client";
import { Tab, Tabs, Spinner } from '@blueprintjs/core';
import { CONTINENTS_QUERY } from "../graphql/queries";
import { createSearchParams } from 'react-router-dom';
import SearchInputField from "./SearchInputField";

const WORLD = 'WO';

//The continent header. Switches between continent tabs that display their respective countries in Panels
//Additionally provides a search bar for filtering countries in the active Panel
const ContinentsHeader = ({ searchParams, setSearchParams }) => {
  const { data, loading, error } = useQuery(CONTINENTS_QUERY);

  if (error) {
    window.alert("Sorry, there was an error: " + error.message);
    throw error;
  }

  if (loading || data == null) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Spinner style={{ minHeight: '100vh' }}/>
      </div>
    );
  }

  let { continents } = data;

  let continentCodes = new Set([ WORLD, ...continents.map(it => it.code)]);

  let continentCode = searchParams.has('continent') ? searchParams.get('continent') : WORLD;

  if (!continentCodes.has(continentCode))
    throw new Error('Invalid continent code provided');

  const handleTabChange = (newTabId) => {
    let params = newTabId !== WORLD ? { continent: newTabId } : { };
    setSearchParams(createSearchParams(params));
  }

  return (
    <div className="ContinentsHeader">
      <Tabs id="header-tabs" large onChange={ handleTabChange } selectedTabId={ continentCode }>
        <Tab key="world-panel" id={ WORLD } title="World"/>

        { continents.map((continent) => {
          return (
            <Tab key={ continent.code } id={ continent.code } title={ continent.name } />
          )
        })}
        <Tabs.Expander/>
        <SearchInputField
          searchParams={ searchParams }
          setSearchParams={ setSearchParams }
        />
        <div/>
      </Tabs>
    </div>
  )
}

export default ContinentsHeader;
