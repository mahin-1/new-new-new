import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../url";
import useGetPostDetails from "./useGetUser";

function useSearch(e) {
  const controller = new AbortController();
  const [searchResults, setSearchResults] = useState([]);
  const searchByTag = async () => {
    let tags = await axios.get(
      `${url.axios_url}/tagsearch?tag=${e.slice(1, e.length)}`
    );
    tags = tags.data.map((tag) => tag.tag_name);
    setSearchResults(tags);
  };

  const searchByUser = async () => {
    let tags = await axios.get(
      `${url.axios_url}/usersearch?id=${e.slice(1, e.length)}`
    );
    tags = tags.data.map((tag) => tag.user_name);
    setSearchResults(tags);
  };
  useEffect(() => {
    if (e.startsWith("#")) {
      searchByTag();
    } else if (e.startsWith("@")) {
      searchByUser();
    } else {
      //search by title
    }
  }, [e]);
  return [searchResults, setSearchResults];
}

export default useSearch;
