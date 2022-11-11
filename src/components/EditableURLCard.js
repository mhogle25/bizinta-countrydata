import { useCountryUrl } from "../utilities/local-storage";
import CountryPropertyEditor from "./CountryPropertyEditor";


const isValidUrl = (url = "") => {
  return url.startsWith("http://") || url.startsWith("https://") || url === "";
};

function validateUrl(url) {
  return isValidUrl(url) ? null : "Invalid URL. URLs must start with http or https.";
}

const EditableURLCard = ({ countryCode }) => {
  return (
    <CountryPropertyEditor title="URL:"
                           countryCode={ countryCode }
                           useDatum={ useCountryUrl }
                           nullText="(no URL)"
                           validate={ validateUrl }
                           />
  );
}

export default EditableURLCard;
