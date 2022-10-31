import { Icon, Card, Button } from "@blueprintjs/core";
import { useState } from "react";

const defaultContact = {
  name: "",
  country: "",
  email: "",
  comment: ""
}

const AddContactUtility = ({ contactsData, setContactsData }) => {
  const [ edit, setEdit ] = useState(false);
  const [ newContact, setNewContact ] = useState(defaultContact);

  const renderInputField = (value, onChange) => {
    return (
      <input
        className="bp4-input bp4-fill"
        value={value}
        onChange={onChange}
        style={{ marginBottom: "10px" }}
      />
    )
  }

  const renderTextArea = (value, onChange) => {
    return (
      <textarea
        className="bp4-input bp4-fill"
        value={value}
        onChange={onChange}
        style={{ marginBottom: "10px" }}
      />
    )
  }

  const renderFormButtons = () => {
    return(
      <div>
        <Button
          onClick={() => {
            setContactsData([...contactsData, newContact])
            setNewContact(defaultContact);
            setEdit(!edit);
          }}
        >
          Add Contact
        </Button>
        <Button
          intent="danger"
          onClick={() => {
            setNewContact(defaultContact);
            setEdit(!edit);
          }}
        >
          Cancel
        </Button>
      </div>
    )
  }

  const renderFieldTitle = (title) => {
    return <h6 className="bp4-heading">{title}</h6>;
  }

  const renderForm = () => {
    return(
      <Card>
        <form>
          {renderFieldTitle("Name: ")}
          {renderInputField(newContact.name, (event) => {
            setNewContact({ ...newContact, name: event.target.value });
          })}
          {renderFieldTitle("Email: ")}
          {renderInputField(newContact.email, (event) => {
            setNewContact({ ...newContact, email: event.target.value });
          })}
          {renderFieldTitle("Comment: ")}
          {renderTextArea(newContact.comment, (event) => {
            setNewContact({ ...newContact, comment: event.target.value });
          })}
          {renderFormButtons()}
        </form>
      </Card>
    )
  }
  
  const renderAddButton = () => {
    return(
      <button
        className="bp4-button bp4-fill"
        onClick={() => {
          setEdit(!edit);
        }}
      >
        <center><Icon icon="add"/></center>
      </button>
    )
  }

  return (
    <div>
      {edit ? renderForm() : renderAddButton()}
    </div>
  )
}

export default AddContactUtility;
