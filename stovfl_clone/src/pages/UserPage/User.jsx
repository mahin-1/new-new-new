import React,{useEffect, useRef,useState} from 'react'
import { useSearchParams,useParams } from 'react-router-dom'
import styles from './User.module.css'
import NavbarDash from '../../components/navbar/NavbarDash'
import SidebarDash from '../../components/sidebar/SidebarDash'
import DOMPurify from 'dompurify'
import useGetUser from '../../hooks/useGetUser'
import Auth from '../../../Auth'
import axios from 'axios'
import url from '../../../url'
import MyStats from '../../components/MyStats/MyStats'

function User() {
    Auth()
    const {details,userProfilePic,userName} = useGetUser();
    const [aboutMe,setAboutMe] =useState(details.aboutMe)
    

    const params = useParams();
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

    useEffect(()=>{
        setAboutMe(user.details.aboutMe)
    },[user])

    useEffect(()=>{
        const id = params.targetID
        axios.get(`${url.axios_url}/user/${id}`).then((res) => {
            axios
              .get(
                `${url.axios_url}/post/user/${
                  params.userID.split("@")[1]
                }/1/creation_date/desc`
              )
              .then((res2) => {
                axios
                  .get(
                    `${url.axios_url}/post/user/${
                      params.userID.split("@")[1]
                    }/2/creation_date/desc`
                  )
                  .then((res3) => {
                    axios
                      .get(
                        `${url.axios_url}/comment/user/${
                          params.userID.split("@")[1]
                        }/creation_date/desc`
                      )
                      .then((res4) => {
                        setUser({
                          userName: res.data.display_name,
                          userProfilePic: res.data.profile_image_url
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
    },[])

  return (
    <div className={styles.wrapper} >
    <div className={styles.navbar}>
    <NavbarDash/>
    </div>
    <SidebarDash/>
      <div className={styles.profilepanel}>
            <div className={styles.informationPanel}>
                <h2 style={{textAlign:"center"}}>My Details</h2>
                <div className={styles.info}>
                <div className={styles.image}>
                 <img src={user.userProfilePic} style={{opacity: "1"}} alt="" className={styles.pic} />                
                </div>
                <div>
                <div className={styles.data}>
                  <div className={styles.listitem}>
                    <div className={styles.inputfield} >Name: <span style={{color:"gray",paddingLeft:"5%"}}>{user.details.display_name}</span></div>
                  </div>
                  <div className={styles.listitem}>
                  <div className={styles.inputfield} >Location: <span style={{color:"gray",paddingLeft:"5%"}}>{user.details.location}</span></div>
                  </div>
                  <div className={styles.listitem}>
                  <div className={styles.inputfield} >Website: <span style={{color:"gray",paddingLeft:"5%"}}><a href={user.details.website}>{user.details.website}</a></span></div>

                  </div>
                  
                </div>
            
                </div>
                
                </div>
            </div>
            <div className={styles.aboutMePanel}>
        <h2 style={{marginTop:"10%"}}>About Me</h2>
        <div className={styles.preview} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(aboutMe)}}></div>

            </div>
      </div>
    </div>
  )
}

export default User
