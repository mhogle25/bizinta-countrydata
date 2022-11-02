import { Icon } from "@blueprintjs/core";
import { useState } from "react";
import UpdateContactUtility from "./UpdateContactUtility";

const AddContactUtility = ({ contactsData, setContactsData, onAdd }) => {
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
            const list = [...contactsData, newContact];
            setContactsData(list);
            onAdd(list);
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
