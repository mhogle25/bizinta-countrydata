import { H6, Icon } from "@blueprintjs/core";

const generateKey = (pre) => {
  return `${ pre }_${ new Date().getTime() }`;
}

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

  const renderContact = (name, email, comment) => {
    return (
      <div key={generateKey(email)}>
        <H6>Name:</H6>
        <p>{name}</p>
        <H6>Email:</H6>
        <p>{email}</p>
        <H6>Comment:</H6>
        <p>{comment}</p>
      </div>
    )
  }

  const renderContactsList = () => {
    if (!contactsData || contactsData.length < 1)
      return renderNoContacts();

    return (
      contactsData.map((contactData) => {
        return renderContact(contactData.name, contactData.email, contactData.comment)
      })
    )
  }

  return (
    <div>
      {renderContactsList()}
    </div>
  )
}

export default ContactsList;
