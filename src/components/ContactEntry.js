const ContactEntry = ({ contactData, setCurrentContactInfo }) => {
  return (
    <div
      className="bp4-card bp4-interactive"
      onClick={(event) => {
        setCurrentContactInfo(contactData)
      }}
      onMouseOver={(event) => {

      }}
      onMouseOut={(event) => {

      }}
    >
      <div style={{ display: "flex" }}>
        <span style={{ flex: "1", textAlign: "left" }}>
          {contactData.name}
        </span>
        <span style={{ flex: "1", textAlign: "right" }}>
          {contactData.email}
        </span>
      </div>
    </div>
  )
}

export default ContactEntry;
