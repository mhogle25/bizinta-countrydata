import { useState } from 'react';
import ContactsList from './ContactsList'
import AddContactUtility from "./AddContactUtility";
import { useCountryContacts } from "../utilities/local-storage";
import ContactInfo from "./ContactInfo";
import UpdateContactUtility from "./UpdateContactUtility";

const CountryInfoContactsPanel = ({ searchParams }) => {
  let [ contacts, setContacts ] = useCountryContacts(searchParams.get('country'));
  //The state for the currently displayed contact info. If null, the list should be displayed
  const [ currentContactInfo, setCurrentContactInfo ] = useState(null);
  //The flag that determines if a contact info is being edited
  const [ editContactInfo, setEditContactInfo ] = useState(false);



  const renderInfo = () => {
    if (editContactInfo) return (
      <UpdateContactUtility
        defaultContact={currentContactInfo}
        confirmMessage="Update Contact"
        onConfirm={(newContact) => {
          const index = contacts.indexOf(currentContactInfo);
          setCurrentContactInfo(newContact);
          const list = [...contacts];
          list[index] = newContact;
          setContacts(list);
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
          const index = contacts.indexOf(currentContactInfo);
          const list = [...contacts];
          list.splice(index, 1);
          setContacts(list);
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
      contactsData={contacts}
      setCurrentContactInfo={setCurrentContactInfo}
    />
  }

  const renderAddContactUtility = () => {
    if (currentContactInfo) return null;

    return (
      <AddContactUtility contacts={ contacts } setContacts={ setContacts } />
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
