import React,{useRef,useState} from 'react'
import styles from './MyQuestions.module.css'
import NavbarDash from '../../components/navbar/NavbarDash'
import SidebarDash from '../../components/sidebar/SidebarDash'
// import Postcard from '../../components/postcard/Postcard'
import Feed from '../../components/Feed/Feed'
import Auth from '../../../Auth'

function MyQuestions() {

  Auth()
  const [section,setSection] = useState("questions")
  return (
    <div className={styles.wrapper}>
    <div className={styles.navbar}>
    <NavbarDash/>
    </div>
    <SidebarDash/>
    <div className={styles.postcontainer}>
        <div>
          <h2 style={{textAlign: "center", paddingBottom:"0vh", position:"sticky"}}>My Questions</h2>
        </div>
        <Feed postcardtype={"question"} section={section}/>
      </div>
    </div>
  )
}

export default MyQuestions
