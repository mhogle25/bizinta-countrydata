import { useEffect, useState } from 'react';
import { COUNTRY_STORAGE_KEY, CONTACTS_KEY } from "../imports/macros";
import { H5 } from "@blueprintjs/core";
import ContactsList from './ContactsList'
import AddContactUtility from "./AddContactUtility";

const CountryInfoContactsPanel = ({ countryCode }) => {
  const [ contactsData, setContactsData ] = useState(null);

  useEffect(
    () => {
      const key = `${COUNTRY_STORAGE_KEY}/${countryCode}/${CONTACTS_KEY}`;
      if (!contactsData) {
        const data = localStorage.getItem(key);
        const deserializedData = data ? JSON.parse(data) : [];
        setContactsData(deserializedData ? deserializedData : []);
      }

      if (contactsData && contactsData.length > 0) {
        localStorage.setItem(key, JSON.stringify(contactsData));
      }
    },
    [contactsData, setContactsData, countryCode]
  );

  return (
    <div>
      <H5>Contacts</H5>
      <ContactsList
        contactsData={contactsData}
      />
      <AddContactUtility
        contactsData={contactsData}
        setContactsData={setContactsData}
      />
    </div>
  )
}

export default CountryInfoContactsPanel;
