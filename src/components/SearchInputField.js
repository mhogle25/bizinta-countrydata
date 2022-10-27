import { useRef } from "react";
import { createSearchParams } from "react-router-dom";

const FAST_TYPING_TIMEOUT = 500;

const SearchInputField = ({ searchParams, setSearchParams }) => {
  const inputField = useRef();

  return (
    <div className="SearchBar">
      <input
        className="bp4-input"
        ref={inputField}
        type="search"
        placeholder="Search..."
        onChange={(event) => {
          setTimeout(
            () => {
              setSearchParams(createSearchParams({ continent: searchParams.get('continent'), input: event.target.value }));
            },
            FAST_TYPING_TIMEOUT
          )
        }}
        onFocus={(event) => {
          setSearchParams(createSearchParams({ continent: searchParams.get('continent'), input: event.target.value }));
        }}
      />
    </div>
  )
}

export default SearchInputField;
