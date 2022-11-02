import {Button, ButtonGroup, Card} from "@blueprintjs/core";
import { useState } from "react";

const UpdateContactUtility = ({ defaultContact, confirmMessage, onConfirm, onCancel }) => {
  const getDefaultContact = () => {
    if (defaultContact) return defaultContact;
    return {
      name: "",
      email: "",
      comment: ""
    }
  }

  const [ newContact, setNewContact ] = useState(getDefaultContact());

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
      <ButtonGroup>
        <Button
          onClick={() => {
            onConfirm(newContact)
            setNewContact(getDefaultContact());
          }}
        >
          {confirmMessage}
        </Button>
        <Button
          intent="danger"
          onClick={() => {
            onCancel()
            setNewContact(getDefaultContact());
          }}
        >
          Cancel
        </Button>
      </ButtonGroup>
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

  return renderForm();
}

export default UpdateContactUtility;
