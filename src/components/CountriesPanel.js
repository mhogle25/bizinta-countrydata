//import { useQuery, useLazyQuery, gql } from "@apollo/client"

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import { Column, Table2 } from "@blueprintjs/table";
import { HotkeysProvider } from "@blueprintjs/core";

const CountriesPanel = ({id}) => {
  return (
    <div className="CountriesPanel">
      <HotkeysProvider>
        <Table2 numRows={5}>
          <Column name="Flag"/>
          <Column name="Name"/>
          <Column name="Capital"/>
        </Table2>
      </HotkeysProvider>
    </div>
  )
}

export default CountriesPanel;
