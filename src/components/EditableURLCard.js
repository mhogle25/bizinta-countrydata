import { Button, Card, H6 } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { countryUrlKey } from "../utilities/local-storage";

const heading = "URL: ";

const isValidUrl = (url = "") => {
  return url.startsWith("http://") || url.startsWith("https://") || url === "";
};


const EditableURLCard = ({ countryCode }) => {
  const [ clicked, setClicked ] = useState(false);
  const [ data, setData ] = useState("");
  const [ showError, setShowError ] = useState(false);

  useEffect(
    () => {
      refreshData(countryCode, setData);
    },
    [countryCode, setData]
  );

  const renderHeading = () => {
    return <H6 className="bp4-heading">{heading}</H6>;
  }

  const renderError = () => {
    return showError ? <p style={{ color: "red", marginTop: "10px" }}>Invalid URL. URLs must be http or https.</p> : null;
  }

  const renderButtons = () => {
    return (
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => {
            if (isValidUrl(data)) {
              localStorage.setItem(countryUrlKey(countryCode), data);
              setShowError(false);
              setClicked(false);
            } else {
              setShowError(true);
            }
          }}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            refreshData(countryCode, setData);
            setClicked(false);
            setShowError(false);
          }}
          intent="danger"
        >
          Cancel
        </Button>
      </div>
    )
  }

  const renderEdit = () => {
    return (
      <Card>
        <form>
          {renderHeading()}
          <input
            className="bp4-input bp4-fill"
            value={ data }
            onChange={(event) => {
              setData(event.target.value);
            }}
          />
          {renderButtons()}
          {renderError()}
        </form>
      </Card>
    )
  }

  const renderText = () => {
    return (
      <Card
        interactive={ true }
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        {renderHeading()}
        <p>
          { data === "" ? <i>Enter URL...</i> : data }
        </p>
      </Card>
    )
  }

  const render = () => {
    return clicked ? renderEdit() : renderText();
  }

  return render();
}

const refreshData = (countryCode, setData) => {
  const newData = localStorage.getItem(countryUrlKey(countryCode));
  if (newData)
    setData(newData);
  else
    setData("");
}

export default EditableURLCard;
