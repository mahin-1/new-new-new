import React, { useCallback, useEffect, useRef, useState } from "react";
import Postcard from "../postcard/Postcard";
import styles from "./Feed.module.css";
import useGetPosts from "../../hooks/useGetPosts";

function Feed({ postcardtype,section,user }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy,setSortBy] = useState("creation_date")
  const [order,setOrder] = useState("desc");
  const [orderScore,setOrderScore] = useState("desc");
  const [orderDate,setDate] = useState("desc");
  const [header,setHeader] = useState('Trending');
  const { loading, error, posts, hasMore } = useGetPosts(pageNumber,section,setPageNumber,sortBy,order,user);
  
useEffect(()=>{
  setPageNumber(1)
},[section])

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

  const handleSort= (e)=>{
    if(e=='date')
      {
        setSortBy('creation_date')
        if(orderDate=='desc')
          {
            setDate('asc')
            setOrder('asc')
          }
          else{
            setDate('desc')
            setOrder('desc')
          }
      }
    else
      {
        setSortBy('score')
        if(orderScore=='desc')
          {
            setOrderScore('asc')
            setOrder('asc')
          }
          else{
            setOrderScore('desc')
            setOrder('desc')
          }
      }
  }
  return (
    <div>
      {posts.length>0&& <div style={{display:"flex",justifyContent:"right",paddingRight:"7%"}}>
        <div className={styles.sort}>
          Date
          <button className={"btn-primary btn " + styles.order} onClick={()=>{handleSort('date')}}>
            {orderDate}
          </button>
        </div>
        <div className={styles.sort}>
          Score
          <button className={"btn-primary btn " + styles.order} onClick={()=>{handleSort('score')}}>
            {orderScore}
          </button>
          </div>
      </div>}
      <ul className={styles.list}>
        
        { posts.length>0?
          posts.map((post, index) => {
            if (index + 1 == posts.length) {
              return (
                <li
                  ref={lastPostElement}
                  key={post}
                  className={styles.card}
                >
                  <Postcard
                    type={postcardtype}
                    postID={post}
                  />
                </li>
              );
            } else {
              return (
                <li className={styles.card} key={post}>
                  <Postcard
                    type={postcardtype}
                    postID={post}
                  />
                </li>
              );
            }
          }):<><div style={{marginTop:"20%",textAlign:"center"}}> <h1>; {postcardtype=='comment'||postcardtype=='answer'||postcardtype=='question'?`You have no ${postcardtype}s ;`:'No results ;'}</h1> </div></>

        }
      </ul>
    </div>
  );
}

export default Feed;
