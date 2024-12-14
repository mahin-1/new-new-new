import React from 'react'
import styles from './Sidebar.module.css'
import Trending from '../trending/Trending'
import { Link } from 'react-router-dom'

function Sidebar(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ask}>
       <Link to='/login'><button className={'btn btn-primary '+styles.askbtn}>Ask A Question</button></Link> 
      </div>
      <div className={styles.trending}>
       <Trending title="Trending" func={props.sec}/>
      </div>
    </div>
  )
}

export default Sidebar
