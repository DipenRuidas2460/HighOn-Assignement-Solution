import React from "react";
import { useGlobalContext } from "../context/NoteState";

function Search() {
  const {dispatch} = useGlobalContext();
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            dispatch({
              type: "SEARCH_QUERY",
              payload: e.target.value,
            });
          }}
        />
      </form>
    </div>
  );
}

export default Search;
