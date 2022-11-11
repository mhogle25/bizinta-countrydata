import { HTMLTable } from "@blueprintjs/core";

function CountryInfoLanguagePanel({ languages }) {
  return (
    <div className="CountryInfoLanguagePanel">
      <HTMLTable bordered striped condensed style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Native Spelling</th>
            <th>Right to Left</th>
          </tr>
        </thead>

        <tbody>
        { languages.map((language) => {
          return (
            <tr key={ language.name }>
              <td>{ language.name }</td>
              <td>{ language.native }</td>
              <td>{ language.rtl ? "Yes" : "No"}</td>
            </tr>
          )
        })}
        </tbody>
      </HTMLTable>
    </div>
  )
}

export default CountryInfoLanguagePanel;
