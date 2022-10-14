const CountryInfoLanguagePanel = ({ list }) => {
  return (
    <table
      className="bp4-html-table bp4-html-table-bordered bp4-html-table-condensed bp4-html-table-striped"
      style={{ width:"100%", marginLeft:"auto", marginRight:"auto" }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Native Spelling</th>
          <th>Right to Left</th>
        </tr>
      </thead>
      <tbody>
      {list.map((language) => {
        return (
          <tr key={language.name.toLowerCase() + '-language-info'}>
            <td>{language.name}</td>
            <td>{language.native}</td>
            <td>{language.rtl ? "Yes" : "No"}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export default CountryInfoLanguagePanel;
