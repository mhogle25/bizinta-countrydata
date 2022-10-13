import { useState, useCallback } from "react";
import { Dialog, Classes /*, Tabs, Tab */} from '@blueprintjs/core';

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
          Test
        </div>
      </Dialog>
    </>
  )
}

export default CountryInfo;
