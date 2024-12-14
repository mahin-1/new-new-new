import React, { useEffect,useState } from 'react'
import styles from './SidebarDash.module.css'
import Trending from '../trending/Trending'
import { useLocation,Link,useSearchParams,useParams } from 'react-router-dom'

function SidebarDash(props) {

  const location = useLocation()
  const [sec,setSec]=useState('Trending Posts')
  const [param,setParams] = useSearchParams()
  const user = useParams()
  const id = location.pathname=="/"?param.get("uid"):location.pathname.includes('posts')?param.get("uid"):user.userID
  return (
    <div className={styles.wrapper}>
      <div className={styles.ask}>
        <Link to={`/${id}/ask`}><button className={'btn btn-primary '+styles.askbtn}>Ask A Question</button></Link>
      </div>
      <div>
      </div>
      <div className={styles.trending}>
      <ul className={styles.list}>
        <li className={styles.tag}><Link to={`/${id}`}><button className={styles.tagbtn} >About Me</button></Link> </li>
        <li className={styles.tag}><Link to={`/${id}/questions`}><button className={styles.tagbtn} >My Questions</button></Link> </li>
        <li className={styles.tag}><Link to={`/${id}/answers`}><button className={styles.tagbtn} >My Answers</button></Link></li>
        <li className={styles.tag}><Link to={`/${id}/comments`}><button className={styles.tagbtn} >My Comments</button></Link></li>
        </ul>
      </div>
      {
        location.pathname=="/" &&<div className={styles.trending}>
        <Trending title="Trending" func={props.sec}/>
       </div>
      }
    </div>
  )
}

export default SidebarDash
