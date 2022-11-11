import { Button, Card, Classes, H6, InputGroup, TextArea } from "@blueprintjs/core";
import { useState } from "react";

const Container = ({ title, onClick, children }) => (
  <Card interactive={ onClick != null }
        onClick={ onClick }
        >
    <H6>{ title }</H6>
    { children }
  </Card>
);

function PropertyViewer({ title, countryCode, useDatum, startEditing, nullText }) {
  let [ value ] = useDatum(countryCode);

  return (
    <Container title={ title } onClick={ startEditing }>
      { value || <i className={ Classes.TEXT_MUTED }>{ nullText }</i> }
    </Container>
  );
}

const PropertyEditor = ({ title, countryCode, useDatum, stopEditing, validate, multiLine }) => {
  let [ storedValue, setStoredValue ] = useDatum(countryCode);
  let [ value, setValue ] = useState(storedValue);
  let [ showError, setShowError ] = useState(false);

  let error = showError && validate != null ? validate(value) : null;

  let handleUpdate = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let error = validate?.(value);

    if (error) {
      setShowError(true);
    } else {
      setStoredValue(value);
      stopEditing();
    }
  };

  let Editor = multiLine ? TextArea : InputGroup;

  return (
    <Container title={ title }>
      <form onSubmit={ handleUpdate }>
        <Editor fill
                value={ value }
                onChange={ (e) => setValue(e.target.value) }
                />
      </form>

      <div>
        <Button onClick={ handleUpdate } disabled={ error != null } intent="primary">Update</Button>
        <Button onClick={ stopEditing }>Cancel</Button>
      </div>

      { error != null &&
      <p style={{ color: "red", marginTop: "10px" }}>{ error }</p>
      }
    </Container>
  )
};

function CountryPropertyEditor(props) {
  let [ editing, setEditing ] = useState(false);

  return editing ? <PropertyEditor {...props} stopEditing={ () => setEditing(false) } />
                 : <PropertyViewer {...props} startEditing={ () => setEditing(true) } />;
}

export default CountryPropertyEditor;
