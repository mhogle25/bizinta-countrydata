import { useRef } from "react";
import { createSearchParams } from "react-router-dom";

const SearchInputField = ({ setSearchParams }) => {
  const inputField = useRef();

  return (
    <div className="SearchBar">
      <input
        className="bp4-input"
        ref={inputField}
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchParams(createSearchParams({ continent: 'WO', input: event.target.value }));
        }}
        onFocus={(event) => {
          setSearchParams(createSearchParams({ continent: 'WO', input: event.target.value }));
        }}
      />
    </div>
  )
}

export default SearchInputField;
