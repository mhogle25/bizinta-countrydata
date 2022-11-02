import { Icon } from "@blueprintjs/core";
import ContactEntry from "./ContactEntry";

const ContactsList = ({ contactsData, setCurrentContactInfo }) => {
  const renderNoContacts = () => {
    return (
      <center style={{ marginTop: "100px",  marginBottom: "100px" }}>
        <Icon icon="issue"/>
        <p style={{ marginTop: "10px",  marginBottom: "25px" }}>
          No contacts
        </p>
      </center>
    )
  }

  const renderContact = (key, contactData) => {
    return (
      <ContactEntry
        key={key}
        contactData={contactData}
        setCurrentContactInfo={setCurrentContactInfo}
      />
    )
  }

  let i = 0;
  const renderContactsList = () => {
    if (!contactsData || contactsData.length < 1)
      return renderNoContacts();

    return (
      contactsData.map((contactData) => {
        i++;
        return renderContact(generateKey(contactData.email, i), contactData)
      })
    )
  }

  return (
    <div>
      {renderContactsList()}
    </div>
  )
}

const generateKey = (pre, index) => {
  return `${ pre }_${ new Date().getTime() + index }`;
}

export default ContactsList;
