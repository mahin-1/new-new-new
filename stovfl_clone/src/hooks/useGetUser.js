import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../url";
import { useSearchParams, useParams } from "react-router-dom";

function useGetUser() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState({
    userName: "",
    userProfilePic: "/man.png",
    details: {
      display_name: "",
      upvotes: "",
      downvotes: "",
      quescount: "",
      anscount: "",
      comments: "",
      location: "",
      website: "",
      aboutMe: "",
    },
  });

  useEffect(() => {
    let id = searchParams.get("uid") ? searchParams.get("uid") : params.userID;
    axios.get(`${url.axios_url}/user/${id}`).then((res) => {
      axios
        .get(
          `${url.axios_url}/post/user/${id.split("@")[1]}/1/creation_date/desc`
        )
        .then((res2) => {
          axios
            .get(
              `${url.axios_url}/post/user/${
                id.split("@")[1]
              }/2/creation_date/desc`
            )
            .then((res3) => {
              axios
                .get(
                  `${url.axios_url}/comment/user/${
                    id.split("@")[1]
                  }/creation_date/desc`
                )
                .then((res4) => {
                  setUser({
                    userName: res.data.display_name,
                    userProfilePic:
                      res.data.profile_image_url !== undefined &&
                      res.data.profile_image_url !== null
                        ? res.data.profile_image_url
                        : "/man.png",
                    details: {
                      display_name: res.data.display_name,
                      upvotes: res.data.up_votes,
                      downvotes: res.data.down_votes,
                      location: res.data.location,
                      website: res.data.website_url,
                      aboutMe: res.data.about_me,
                      quescount: res2.data.length,
                      anscount: res3.data.length,
                      comments: res4.data.length,
                    },
                  });
                });
            });
        });
    });
  }, []);
  return user;
}

export default useGetUser;
