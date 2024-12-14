import React,{useState} from 'react'
import NavbarDash from '../../components/navbar/NavbarDash'
import styles from './Dashboard.module.css'
import SidebarDash from '../../components/sidebar/SidebarDash'
import AboutMe from '../../components/AboutMe/AboutMe'
import MyStats from '../../components/MyStats/MyStats'
import Auth from '../../../Auth'

function Dashboard() {

Auth()

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
      <NavbarDash/>
      </div>
      <SidebarDash/>
      <div className={styles.container}>
      <div className={styles.statswrapper}><MyStats/></div>
      <div className={styles.aboutmecontainer}>
      <AboutMe/>
      </div>
      </div>
      
    </div>
  )
}

export default Dashboard
