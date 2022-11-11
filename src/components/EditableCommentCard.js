import { useCountryComment } from "../utilities/local-storage";
import CountryPropertyEditor from "./CountryPropertyEditor";

const EditableCommentCard = ({ countryCode }) => {
  return (
    <CountryPropertyEditor title="Comment:"
                           countryCode={ countryCode }
                           useDatum={ useCountryComment }
                           nullText="(no comment)"
                           multiLine
                           />
  );
}

export default EditableCommentCard;
