import { useEffect, useState } from 'react';
import ContactsList from './ContactsList'
import AddContactUtility from "./AddContactUtility";
import { generateContactsKey } from "../utilities/local-storage";

const CountryInfoContactsPanel = ({ countryCode }) => {
  const [ contactsData, setContactsData ] = useState(null);

  useEffect(
    () => {
      const key = generateContactsKey(countryCode);
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
