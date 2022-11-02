import { Button, ButtonGroup, Callout, Card, H4, Icon } from "@blueprintjs/core";

const ContactInfo = ({ onEdit, onDelete, currentContactInfo, setCurrentContactInfo }) => {
  const renderBackButton = () => {
    return (
      <span style={{ width: "10%" }}>
        <Button
          onClick={() => {
            setCurrentContactInfo(null);
          }}
        >
          <span
            className="bp4-icon-small bp4-icon-arrow-left"
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              height: "100%"
            }}
          />
        </Button>
      </span>
    )
  }

  const renderContactInfo = () => {
    return (
      <span style={{ width: "80%", marginLeft: "15px", marginRight: "15px" }}>
        <H4>Name</H4>
        <p>{currentContactInfo.name}</p>
        <H4>Email</H4>
        <p>{currentContactInfo.email}</p>
        <Callout>{currentContactInfo.comment}</Callout>
      </span>
    )
  }

  const renderOptionsButtons = () => {
    return (
      <span
        style={{ width: "10%" }}
      >
        <ButtonGroup vertical={true}>
          <Button
            onClick={onEdit}
          >
            <Icon icon="edit"/>
          </Button>
          <Button
            intent="danger"
            onClick={onDelete}
          >
            <Icon icon="trash"/>
          </Button>
        </ButtonGroup>
      </span>
    )
  }

  const renderContent = () => {
    return (
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left"
          }}
        >
          {renderBackButton()}
          {renderContactInfo()}
          {renderOptionsButtons()}
        </div>
      </Card>
    )
  }

  return renderContent();
}

export default ContactInfo;
