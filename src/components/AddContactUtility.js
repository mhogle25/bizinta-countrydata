import { Icon } from "@blueprintjs/core";
import { useState } from "react";
import UpdateContactUtility from "./UpdateContactUtility";

const AddContactUtility = ({ contacts, setContacts }) => {
  const [ edit, setEdit ] = useState(false);

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
      {edit ?
        <UpdateContactUtility
          confirmMessage="Add Contact"
          onConfirm={(newContact) => {
            setContacts([...contacts, newContact]);
            setEdit(!edit);
          }}
          onCancel={() => {
            setEdit(!edit);
          }}
        /> :
        renderAddButton()
      }
    </div>
  )
}

export default AddContactUtility;
