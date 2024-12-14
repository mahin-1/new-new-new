import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  useLocation,
  useSearchParams,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import NavbarDash from "../../components/navbar/NavbarDash";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarDash from "../../components/sidebar/SidebarDash";
import styles from "./Post.module.css";
import { ArrowUp, ArrowDown, Pencil } from "phosphor-react";
import Comment from "../../components/comment/Comment";
import DetailedPost from "../../components/DetailedPost/DetailedPost";
import axios from "axios";
import url from "../../../url";
import useGetPosts from "../../hooks/useGetPosts";

function Post() {
  const [params, setParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, posts, hasMore } = useGetPosts(
    pageNumber,
    "post-answers",
    setPageNumber,
    "creation_date",
    "desc"
  );
  const desRef = useRef(null);

  const [des, setDes] = useState("");

  const setHTML = () => {
    setDes(desRef.current.value);
  };
  const login = params.get("login");
  const urlparams = useParams();

  const observer = useRef();
  const lastPostElement = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = document.cookie;
    const data = {
      body: des,
      owner_user_id: params.get("uid").split("@")[1],
      token: token,
      post_type_id: 2,
      score: 0,
      parent_id: urlparams.postID,
    };
    const res = await axios.post(`${url.axios_url}/post`, data);
    if (res.data.success && !res.data.success) navigate("/login");
  };

  return (
    <div className={styles.wrappermain}>
      <div className={styles.navbar}>
        {login == "true" ? <NavbarDash /> : <Navbar />}
      </div>
      {login == "true" && <SidebarDash />}
      {login != "true" && (
        <div className={styles.wrapper}>
          <div className={styles.ask}>
            <Link to={`/?login=false`}>
              <button className={"btn btn-primary " + styles.askbtn}>
                Ask A Question
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className={styles.postcontainer}>
        <DetailedPost type={"question"} postID={urlparams.postID} />
        <h2>{posts.length} Answers</h2>
        {
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {posts.map((post, index) => {
              if (index + 1 == posts.length) {
                return (
                  <li ref={lastPostElement} key={post} className={styles.card}>
                    <DetailedPost postID={post} type="answer" />
                  </li>
                );
              } else {
                return (
                  <li className={styles.card} key={post}>
                    <DetailedPost type="answer" postID={post} />
                  </li>
                );
              }
            })}
          </ul>
        }

        <div style={{ width: "100%" }}>
          <h4>Your Answer</h4>
          <div className={styles.inputs}>
            <textarea
              ref={desRef}
              spellCheck="false"
              name="description"
              rows="10"
              className={styles.text}
              placeholder="Enter your answer"
              onChange={setHTML}
              style={{ width: "100%", fontSize: "18px" }}
            ></textarea>
            <h4>Preview</h4>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: des }}
            ></div>
            <button
              className={"btn btn-primary"}
              style={{
                width: "10%",
                marginBottom: "5%",
                paddingTop: "1%",
                paddingBottom: "1%",
                fontSize: "18px",
              }}
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
