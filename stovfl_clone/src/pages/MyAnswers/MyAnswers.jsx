import React,{useRef,useState} from 'react'
import styles from './MyAnswers.module.css'
import NavbarDash from '../../components/navbar/NavbarDash'
import SidebarDash from '../../components/sidebar/SidebarDash'
import Feed from '../../components/Feed/Feed'
import Auth from '../../../Auth'

function MyAnswers() {
Auth()

  return (
    <div className={styles.wrapper}>
    <div className={styles.navbar}>
    <NavbarDash/>
    </div>
    <SidebarDash/>
    <div className={styles.postcontainer}>
        <div>
          <h2 style={{textAlign: "center", paddingBottom:"0vh", position:"sticky"}}>My Answers</h2>
        </div>
        <Feed postcardtype={"answer"} section={"answers"}/>
      </div>
    </div>
  )
}

export default MyAnswers
