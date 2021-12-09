import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { termSet } from "../actions";

function SearchBar(props: any) {
  const dispatch = useDispatch();

  const term = useSelector((state: any) => {
    return state.videoReducer;
  });
  const onInputChange = (term: any) => {
    dispatch(termSet(term));
    props.onSearchTermChange(term);
  };
  return (
    <div className="search-bar">
      <input
        value={term}
        onChange={(event) => onInputChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
