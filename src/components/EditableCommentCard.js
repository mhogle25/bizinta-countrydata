import { Button, Card } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { COMMENT_KEY, COUNTRY_STORAGE_KEY } from "../imports/macros";

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
    return <h6 className="bp4-heading">{heading}</h6>;
  }

  const renderEdit = () => {
    return (
      <div>
        <Card>
          {renderHeading()}
          <textarea
            className="bp4-input bp4-fill"
            value={data}
            onChange={(event) => {
              setData(event.target.value);
            }}
          />
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
            {data === "" ? <i>Enter {COMMENT_KEY}...</i> : data}
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
  const newData = localStorage.getItem(`${COUNTRY_STORAGE_KEY}/${countryCode}/${COMMENT_KEY}`);
  if (newData)
    setData(newData);
  else
    setData("");
}

export default EditableCommentCard;
