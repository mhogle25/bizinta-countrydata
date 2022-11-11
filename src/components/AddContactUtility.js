import React from 'react';
import { Button } from "@blueprintjs/core";
import { useState } from "react";
import UpdateContactUtility from "./UpdateContactUtility";

const AddContactUtility = ({ contacts, setContacts }) => {
  const [ editing, setEditing ] = useState(false);

  return (
    <React.Fragment>
      { !editing &&
      <Button fill icon="add" onClick={ () => setEditing(true) }/>
      }

      { editing &&
      <UpdateContactUtility
        confirmMessage="Add Contact"
        onConfirm={(newContact) => {
          setContacts([...contacts, newContact]);
          setEditing(false);
        }}
        onCancel={() => {
          setEditing(false);
        }}
      />
      }
    </React.Fragment>
  );
}

export default AddContactUtility;
