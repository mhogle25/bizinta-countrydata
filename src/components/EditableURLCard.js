import { Button, Card } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { COUNTRY_STORAGE_KEY, URL_KEY } from "../imports/macros";

const heading = "URL: "
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
  )

  const renderHeading = () => {
    return <h6 className="bp4-heading">{heading}</h6>;
  }

  const renderError = () => {
    return showError ? <p style={{ color:"red", marginTop:"10px"}}>Invalid URL. URLs must be http or https.</p> : null;
  }

  const renderEdit = () => {
    return (
      <div>
        <Card>
          {renderHeading()}
          <input
            className="bp4-input bp4-fill"
            value={data}
            onChange={(event) => {
              setData(event.target.value);
            }}
          />
          <Button
            onClick={() => {
              if (isValidUrl(data)) {
                localStorage.setItem(`${COUNTRY_STORAGE_KEY}/${countryCode}/${URL_KEY}`, data);
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
          {renderError()}
        </Card>
      </div>
    )
  }

  const renderText = () => {
    return (
      <div>
        <Card
          interactive={true}
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          {renderHeading()}
          <p>
            {data === "" ? <i>Enter {URL_KEY}...</i> : data}
          </p>
        </Card>
      </div>
    )
  }

  const render = () => {
    return clicked ? renderEdit() : renderText();
  }

  return render();
}

const refreshData = (countryCode, setData) => {
  const newData = localStorage.getItem(`${COUNTRY_STORAGE_KEY}/${countryCode}/${URL_KEY}`);
  if (newData)
    setData(newData);
  else
    setData("");
}

export default EditableURLCard;
