const ContactEntry = ({ name, email, comment }) => {
  return (
    <div
      className="bp4-card bp4-interactive"
      onClick={() => {
        console.log(comment);
      }}
    >
      <div style={{ display: "flex" }}>
        <span style={{ flex: "1", textAlign: "left" }}>
          {name}
        </span>
        <span style={{ flex: "1", textAlign: "right" }}>
          {email}
        </span>
      </div>
    </div>
  )
}

export default ContactEntry;
