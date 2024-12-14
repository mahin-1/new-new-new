import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../url";
import { useParams } from "react-router";

export default function useGetPosts(
  pageNumber,
  section,
  setPageNumber,
  sort,
  order,
  user
) {
  const [allPosts, setAllPosts] = useState([
    "4",
    "9",
    "16",
    "18",
    "38",
    "39",
    "42",
    "44",
    "49",
    "57",
    "73",
    "94",
  ]);

  const [posts, setPosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (section == "Trending Posts" || !section) {
      setAllPosts([
        "4",
        "9",
        "16",
        "18",
        "38",
        "39",
        "42",
        "44",
        "49",
        "57",
        "73",
        "94",
      ]);
      setPosts(allPosts.slice(0, 5));
      setPageNumber(1);
    } else if (section == "questions") {
      axios
        .get(
          `${url.axios_url}/post/user/${
            params.userID.split("@")[1]
          }/1/${sort}/${order}`
        )
        .then((res) => {
          setAllPosts(res.data.map((a) => a.id));
        });
    } else if (section == "answers") {
      axios
        .get(
          `${url.axios_url}/post/user/${
            params.userID.split("@")[1]
          }/2/${sort}/${order}`
        )
        .then((res) => {
          setAllPosts(res.data.map((a) => a.id));
        });
    } else if (section == "comment") {
      axios
        .get(
          `${url.axios_url}/comment/user/${
            params.userID.split("@")[1]
          }/${sort}/${order}`
        )
        .then(async (res) => {
          let commentIDs = res.data.map((r) => r.id);
          setAllPosts(commentIDs);
        });
    } else if (section == "post-answers") {
      axios
        .get(`${url.axios_url}/post/parent/${params.postID}/${sort}/${order}`)
        .then(async (res) => {
          let commentIDs = res.data.map((r) => r.id);
          setAllPosts(commentIDs);
        })
        .catch((e) => {
          setAllPosts([]);
        });
    } else if (section == "user") {
      axios
        .get(
          `${url.axios_url}/post/user/${user.split("@")[1]}/1/${sort}/${order}`
        )
        .then(async (res) => {
          let commentIDs = res.data.map((r) => r.id);
          setAllPosts(commentIDs);
        });
    } else {
      axios
        .get(
          `${url.axios_url}/post/tag/${sort}/${order}?tags=${encodeURIComponent(
            section
          )}`
        )
        .then((res) => {
          setAllPosts(res.data.map((a) => a.id));
          setPageNumber(1);
        });
    }
  }, [section, sort, order]);

  useEffect(() => {
    setPosts(allPosts.slice(0, 5));
  }, [allPosts]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    setPosts((prevPosts) => {
      let last = prevPosts.length - 1;
      let append;
      if (last + 5 <= allPosts.length - 1) {
        append = allPosts.slice(last + 1, last + 6);
      } else append = allPosts.slice(last + 1);
      setLoading(false);
      return [...prevPosts, ...append];
    });
  }, [pageNumber]);
  return { loading, error, posts, hasMore };
}
