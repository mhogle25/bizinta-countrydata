import { Button, Card, H6 } from "@blueprintjs/core";
import { useState } from "react";
import { useCountryComment } from "../utilities/local-storage";

const heading = "Comment: "

const EditableCommentCard = ({ countryCode }) => {
  let [ comment, setComment ] = useCountryComment(countryCode);
  const [ clicked, setClicked ] = useState(false);
  const [ data, setData ] = useState(comment);


  const renderHeading = () => {
    return <H6 className="bp4-heading">{heading}</H6>;
  }

  const renderButtons = () => {
    return(
      <div style={{ marginTop: "10px" }}>
        <Button
          onClick={() => {
            setComment(data);
            setClicked(false)
          }}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            setData(comment);
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

export default EditableCommentCard;
