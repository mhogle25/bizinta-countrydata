import { useState, useCallback } from "react";
import { Dialog, Classes, UL } from '@blueprintjs/core';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

const CountryInfo = ({country}) => {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const handleButtonClick = () => setDialogOpen(!dialogOpen);
  const handleClose = useCallback(() => { setDialogOpen(false); }, [])

  return (
    <>
      <tr key={country.code} onClick={handleButtonClick}>
        <td>{country.emoji}</td>
        <td>{country.name}</td>
        <td>{country.capital}</td>
      </tr>
      <Dialog isOpen={dialogOpen} onClose={handleClose}>
        <div className={ Classes.DIALOG_BODY }>
          <UL>
            { country.name ? <li>Name: {country.name}</li> : null }
            { country.native ? <li>Native Name: {country.native}</li> : null }
            { country.code ? <li>Code: {country.code}</li> : null }
            { country.phone ? <li>Phone Prefix: {country.phone}</li> : null }
            { country.continent.code ? <li>Continent: {country.continent.name}</li> : null }
            { country.continent.code ? <li>Continent Code: {country.continent.code}</li> : null }
            { country.capital ? <li>Capital City: {country.capital}</li> : null }
            { country.currency ? <li>Currency: {country.currency}</li> : null }
            { country.emoji ? <li>Flag: {country.emoji}</li> : null }
          </UL>
        </div>
      </Dialog>
    </>
  )
}

export default CountryInfo;
