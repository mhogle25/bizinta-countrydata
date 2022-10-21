import { useRef } from "react";

const SearchInputField = ({ setSearchInputFieldValue }) => {
  const inputField = useRef();

  return (
    <div className="SearchBar">
      <input
        className="bp4-input"
        ref={inputField}
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchInputFieldValue(event.target.value)
        }}
      />
    </div>
  )
}

export default SearchInputField;
