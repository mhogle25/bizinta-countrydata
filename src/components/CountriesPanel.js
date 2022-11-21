import { useQuery } from "@apollo/client";
import { COUNTRIES_BY_CONTINENT_QUERY } from "../graphql/queries";
import { useCountryContacts, useCountryUrl } from "../utilities/local-storage";
import { HTMLTable, ProgressBar } from "@blueprintjs/core";
import { findDataAttr } from "../utilities/findDataAttr";

const CountriesPanel = ({ searchParams, updateUrlParam }) => {
  let continent = searchParams.get('continent');
  let filterInput = continent ? { continent: { eq: continent } } : { };
  let queryOptions = { variables: { filterInput } };

  const { data, loading, error } = useQuery(COUNTRIES_BY_CONTINENT_QUERY, queryOptions);

  if (error) {
    window.alert("Sorry, an error occurred: " + error.message);
    throw error;
  }

  const handleClick = (event) => {
    let country = findDataAttr(event.target, 'countryCode');
    if (country) {
      updateUrlParam('country', country);
    }
  };

  return (
    <div className="CountriesPanel">
      <HTMLTable bordered condensed interactive
                 style={{ width: "96%", marginLeft: "2%", marginRight: "2%", paddingBottom: "2%"}}
                 onClick={ handleClick }
                 >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Flag</th>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "30%" }}>Capital</th>
            <th style={{ width: "30%" }}>URL</th>
            <th style={{ width: "5%" }}>Contacts</th>
          </tr>
        </thead>

        <tbody>
          { loading ? LOADING
                    : renderTableContent(data.countries, searchParams.get('input') ?? "") }
        </tbody>
      </HTMLTable>
    </div>
  )
};

const CountryRow = ({ country }) => {
  let { code, emoji, name, capital } = country;
  let [ url ] = useCountryUrl(code);
  let [ contacts ] = useCountryContacts(code);

  return (
      <tr data-country-code={ code }>
        <td>{ emoji }</td>
        <td>{ name }</td>
        <td>{ capital }</td>
        <td><a href={ url } target="_blank">{ url }</a></td>
        <td>{ contacts.length }</td>
      </tr>
    )
};

const renderTableContent = (countries, searchQuery) => {
  let query = searchQuery.toLowerCase();

  return countries.map((country) => {
    return country.name.toLowerCase().includes(query) &&
           <CountryRow key={ country.code } country={ country } />;
  });
}

const LOADING = (
  <tr>
    <td colSpan={ 5 }>
      <ProgressBar animate />
    </td>
  </tr>
);

export default CountriesPanel;
