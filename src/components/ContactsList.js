import { Icon } from "@blueprintjs/core";
import ContactEntry from "./ContactEntry";

const ContactsList = ({ contactsData }) => {
  const renderNoContacts = () => {
    return (
      <center>
        <Icon icon="issue"/>
        <p style={{ marginTop: "10px",  marginBottom: "25px" }}>
          No contacts
        </p>
      </center>
    )
  }

  const renderContact = (key, name, email, comment) => {
    return (
      <ContactEntry
        key={key}
        name={name}
        email={email}
        comment={comment}
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
        return renderContact(generateKey(contactData.email, i), contactData.name, contactData.email, contactData.comment)
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
