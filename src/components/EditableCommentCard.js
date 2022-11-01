import { Button, Card, H6 } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { COMMENT_KEY, COUNTRY_STORAGE_KEY } from "../utilities/macros";

const heading = "Comment: "

const EditableCommentCard = ({ countryCode }) => {
  const [ clicked, setClicked ] = useState(false);
  const [ data, setData ] = useState("");

  useEffect(
    () => {
      refreshData(countryCode, setData);
    },
    [countryCode, setData]
  )

  const renderHeading = () => {
    return <H6 className="bp4-heading">{heading}</H6>;
  }

  const renderButtons = () => {
    return(
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => {
            localStorage.setItem(`${COUNTRY_STORAGE_KEY}/${countryCode}/${COMMENT_KEY}`, data);
            setClicked(false)
          }}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            refreshData(countryCode, setData);
            setClicked(false);
          }}
          intent="danger"
        >
          Cancel
        </Button>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <Card>
        <form>
          {renderHeading()}
          <textarea
            className="bp4-input bp4-fill"
            value={data}
            onChange={(event) => {
              setData(event.target.value);
            }}
          />
          {renderButtons()}
        </form>
      </Card>
    )
  }

  const renderText = () => {
    return (
      <Card
        interactive={true}
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        {renderHeading()}
        <p>
          {data === "" ? <i>Enter {COMMENT_KEY}...</i> : data}
        </p>
      </Card>
    )
  }

  const render = () => {
    return clicked ? renderForm() : renderText();
  }

  return render();
}

const refreshData = (countryCode, setData) => {
  const newData = localStorage.getItem(`${COUNTRY_STORAGE_KEY}/${countryCode}/${COMMENT_KEY}`);
  if (newData)
    setData(newData);
  else
    setData("");
}

export default EditableCommentCard;
