import { useEffect, useState } from 'react';
import ContactsList from './ContactsList'
import AddContactUtility from "./AddContactUtility";
import { generateContactsKey } from "../utilities/local-storage";
import ContactInfo from "./ContactInfo";
import UpdateContactUtility from "./UpdateContactUtility";

const CountryInfoContactsPanel = ({ countryCode }) => {
  const [ contactsData, setContactsData ] = useState(null);
  //The state for the currently displayed contact info. If null, the list should be displayed
  const [ currentContactInfo, setCurrentContactInfo ] = useState(null);
  //The flag that determines if a contact info is being edited
  const [ editContactInfo, setEditContactInfo ] = useState(false);

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

  const renderInfo = () => {
    if (editContactInfo) return (
      <UpdateContactUtility
        defaultContact={currentContactInfo}
        confirmMessage="Update Contact"
        onConfirm={(newContact) => {
          const index = contactsData.indexOf(currentContactInfo);
          setCurrentContactInfo(newContact);
          const list = [...contactsData];
          list[index] = newContact;
          setContactsData(list);
          setEditContactInfo(!editContactInfo)
        }}
        onCancel={() => {
          setEditContactInfo(!editContactInfo)
        }}
      />
    )

    return (
      <ContactInfo
        onEdit={() => {
          setEditContactInfo(!editContactInfo)
        }}
        onDelete={() => {
          const index = contactsData.indexOf(currentContactInfo);
          const list = [...contactsData];
          list.splice(index, 1);
          setContactsData(list);
          setCurrentContactInfo(null);
        }}
        currentContactInfo={currentContactInfo}
        setCurrentContactInfo={setCurrentContactInfo}
      />
    )
  }

  const renderBody = () => {
    if (currentContactInfo) return renderInfo();

    return <ContactsList
      contactsData={contactsData}
      setCurrentContactInfo={setCurrentContactInfo}
    />
  }

  const renderAddContactUtility = () => {
    if (currentContactInfo) return null;

    return (
      <AddContactUtility
        contactsData={contactsData}
        setContactsData={setContactsData}
      />
    )
  }

  return (
    <div>
      {renderBody()}
      {renderAddContactUtility()}
    </div>
  )
}

export default CountryInfoContactsPanel;
