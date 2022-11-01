import {CONTACTS_KEY, COUNTRY_STORAGE_KEY} from "./macros";

export const generateContactsKey = (countryCode) => {
  return `${COUNTRY_STORAGE_KEY}/${countryCode}/${CONTACTS_KEY}`
}
