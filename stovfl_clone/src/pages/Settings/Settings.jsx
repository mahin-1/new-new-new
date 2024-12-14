import React,{useEffect, useRef,useState} from 'react'
import styles from './Settings.module.css'
import NavbarDash from '../../components/navbar/NavbarDash'
import SidebarDash from '../../components/sidebar/SidebarDash'
import DOMPurify from 'dompurify'
import useGetUser from '../../hooks/useGetUser'
import Auth from '../../../Auth'
import axios from 'axios'
import url from '../../../url'
import { useParams } from 'react-router-dom'


function Settings() {

  Auth()
  const {details,userProfilePic,userName} = useGetUser();
  const [image,setImage] = useState("/man.png")

  const [imageStyle,setImageStyle] = useState(styles.pic)
  const [bodyStyle,setBodyStyle] =useState(styles.wrapper)
  const bodyRef = useRef(null)
  const iRef = useRef(null)
  const prRef = useRef(null)
  const handleImageUpload =async ()=>{
      const picture = await iRef.current.files[0];
      const url = URL.createObjectURL(picture)
      setImage(url)
  }
  const nameRef=useRef(null)
  const locRef=useRef(null)
  const webRef=useRef(null)
  const passRef=useRef(null)
  const repassRef=useRef(null)
  const [aboutMe,setAboutMe] =useState(details.aboutMe)

 const aboutRef = useRef(null)

 useEffect(()=>{
  setAboutMe(details.aboutMe)
 },[details.aboutMe])

 useEffect(()=>{
 },[])

 const setHTML = ()=>{
  setAboutMe(aboutRef.current.value)
}

const params = useParams()

const handleUpdate = async()=>{
  const token = document.cookie
  const data={
    token: token,
    location: locRef.current.value,
    website_url: webRef.current.value,
    about_me: aboutRef.current.value,
    display_name: nameRef.current.value
  }
  let res = await axios.patch(`${url.axios_url}/user/${params.userID.split('@')[1]}`,data)
}

const handlePassword = async()=>{
  if(passRef.current.value==repassRef.current.value&&passRef.current.value)
    {
      let token = document.cookie
      let res= await axios.patch(`${url.axios_url}/pass/${params.userID.split('@')[1]}`,{
        password: passRef.current.value,
        token: token
      })
    }
}
  return (
    <div className={bodyStyle} ref={bodyRef}>
    <div className={styles.navbar}>
    <NavbarDash/>
    </div>
    <SidebarDash/>
      <div className={styles.profilepanel}>
            <div className={styles.informationPanel}>
                <h2 style={{textAlign:"center"}}>Your Details</h2>
                <div className={styles.info}>
                <div className={styles.image}>
                 <label htmlFor="filefield"><img src={userProfilePic} style={{opacity: "1"}} ref={prRef} alt="" className={imageStyle} /></label> 
                  <input type="file"  className={styles.fileselect} ref={iRef} id='filefield' accept='image/*' onChange={handleImageUpload}/>
                 <div className={styles.resize}><button className={"btn btn-primary "+styles.resizebtn} onClick={()=>{if(imageStyle==styles.pic2){
                  setImageStyle(styles.pic3);
                  setBodyStyle(styles.wrapper1);
                 }
                  else{
                    setImageStyle(styles.pic2);
                    setBodyStyle(styles.wrapper2);
                  }
                  }}>Resize</button></div> 
                </div>
                <div className={styles.data}>
                  <div className={styles.listitem}>
                    <input type="text" ref={nameRef} className={styles.inputfield} defaultValue={details.display_name}/>
                    <button className={'btn btn-primary '+ styles.changebtn} onClick={handleUpdate}>Change</button>
                  </div>
                  <div className={styles.listitem}>
                  <input type="text" ref={locRef} className={styles.inputfield} defaultValue={details.location} placeholder='Location' spellCheck={false}/>
                  <button className={'btn btn-primary '+ styles.changebtn} onClick={handleUpdate}>Change</button>

                  </div>
                  <div className={styles.listitem}>
                  <input type="text" className={styles.inputfield} ref={webRef} defaultValue={details.website} spellCheck={false} placeholder='Website'/>
                  <button className={'btn btn-primary '+ styles.changebtn} onClick={handleUpdate}>Change</button>

                  </div>
                  <div className={styles.listitem}>
                  <input type="password"className={styles.inputfield} ref={passRef} placeholder='Enter new password to reset'  />

                  </div>
                  <div className={styles.listitem}>
                  <input type="password" className={styles.inputfield} ref={repassRef} placeholder='Re-enter new password to reset' />
                  <button className={'btn btn-primary '+ styles.changebtn} onClick={handlePassword}>Change</button>

                  </div>
                </div>
                </div>
            </div>
            <div className={styles.aboutMePanel}>
                  <h2 style={{textAlign:"center"}}>About Me</h2>
                  <textarea ref = {aboutRef} name="description" rows="10" className={styles.text} placeholder='About Me (in HTML)' onChange={setHTML} defaultValue={aboutMe}></textarea>
        <h2>Preview</h2>
        <div className={styles.preview} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(aboutMe)}}></div>

            </div>
            <button className={'btn btn-primary '+styles.submitbtn} onClick={handleUpdate}>Submit</button>
      </div>
    </div>
  )
}

export default Settings
