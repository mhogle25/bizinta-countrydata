import EditableCommentCard from "./EditableCommentCard";
import EditableURLCard from "./EditableURLCard";
import { HTMLTable } from "@blueprintjs/core";

function createRow(header, value) {
  if (!value)
    return null;

  return (
    <tr>
      <td>{ header }</td>
      <td>{ value }</td>
    </tr>
  );
}

const CountryInfoGeneralPanel = ({ country }) => (
  <div className="CountryInfoGeneralPanel">
    <HTMLTable striped style={{ width: '100%' }}>
      <tbody>
        { createRow("Flag",            country.emoji) }
        { createRow("Name",            country.name) }
        { createRow("Native Spelling", country.native) }
        { createRow("Phone Extension", country.phone) }
        { createRow("Continent",       country.continent?.name) }
        { createRow("Capital",         country.capital) }
        { createRow("Currency",        country.currency) }
      </tbody>
    </HTMLTable>

    <EditableCommentCard countryCode={ country.code }/>
    <EditableURLCard countryCode={ country.code }/>
  </div>
);

export default CountryInfoGeneralPanel;
