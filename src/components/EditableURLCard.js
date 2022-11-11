import { Button, Card, H6 } from "@blueprintjs/core";
import { useState } from "react";
import { useCountryUrl } from "../utilities/local-storage";

const heading = "URL: ";

const isValidUrl = (url = "") => {
  return url.startsWith("http://") || url.startsWith("https://") || url === "";
};


const EditableURLCard = ({ countryCode }) => {
  let [ url, setUrl ] = useCountryUrl(countryCode);

  const [ clicked, setClicked ] = useState(false);
  const [ data, setData ] = useState(url);
  const [ showError, setShowError ] = useState(false);

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
              setUrl(data);
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
            setData(url);
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

export default EditableURLCard;
