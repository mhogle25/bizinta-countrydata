//Queries for a list of countries based on the continent code passed
import { gql } from "@apollo/client";

//GQL query for basic continent info
export const CONTINENTS_QUERY = gql`
    query GetAllContinents {
      continents {
        code
        name
      }
    }
`

//Query for a list of countries by continent code
export const COUNTRIES_BY_CONTINENT_QUERY = gql`
  query GetCountriesFromContinent($filterInput: CountryFilterInput!) {
    countries(filter: $filterInput) {
      code
      name
      capital
      emoji
    }
  }
`

export const COUNTRY_BY_CODE_QUERY = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      code
      name
      native
      phone
      continent {
        code
        name
      }
      capital
      currency
      languages {
        code
        name
        native
        rtl
      }
      emoji
      emojiU
      states {
        code
        name
      }
    }
  }
`
