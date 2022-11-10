import { Button, Card, H6 } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { countryCommentKey } from "../utilities/local-storage";

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
            localStorage.setItem(countryCommentKey(countryCode), data);
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
          {data === "" ? <i>Enter comment...</i> : data}
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
  const newData = localStorage.getItem(countryCommentKey(countryCode));
  if (newData)
    setData(newData);
  else
    setData("");
}

export default EditableCommentCard;
