const CountryInfoGeneralPanel = ({country}) => {

  const createRow = (header, value) => {
    return (
      <tr>
        <td>{header}</td>
        <td>{value}</td>
      </tr>
    )
  }

  return (
    <div className="CountryInfoGeneralPanel">
      <table
        className="bp4-html-table bp4-html-table-striped"
        style={{width:"100%", marginLeft:"auto", marginRight:"auto"}}
      >
        <tbody>
        {country.emoji ? createRow("Flag", country.emoji) : null}
        {country.name ? createRow("Name", country.name) : null}
        {country.native ? createRow("Native Spelling", country.native) : null}
        {country.phone ? createRow("Phone Extension", country.phone) : null}
        {(country.continent !== null) && (country.continent.name !== null) ? createRow("Continent", country.continent.name) : null}
        {country.capital ? createRow("Capital", country.capital) : null}
        {country.currency ? createRow("Currency", country.currency) : null}
        </tbody>
      </table>
    </div>
  );
}

export default CountryInfoGeneralPanel;
