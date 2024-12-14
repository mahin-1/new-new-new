import React, { useEffect } from 'react'
import styles from './MyStats.module.css'
import { Student,ArrowUp,ArrowDown,Question,PencilSimpleLine,ChatsCircle } from 'phosphor-react'
import useGetUser from '../../hooks/useGetUser'

function MyStats() {

  const {details} = useGetUser()
  return (
    <div className={styles.wrapper}>
        <h2>My Statistics</h2>
        <ul className={styles.statslist}>
            <li className={styles.listitem}>

            <Student size={24} color="#0235ac" weight="bold" /> <span>My reputation: {details.upvotes-details.downvotes}</span> 
            </li>
            <li className={styles.listitem}>
            <ArrowUp size={24} color="#0235ac" weight="bold" /> <span>Number of Upvotes: {details.upvotes}</span>
            </li>
            <li className={styles.listitem}>
            <ArrowDown size={24} color="#0235ac" weight="bold" /> <span>Number of Downvotes: {details.downvotes}</span>
            </li>
            <li className={styles.listitem}><Question size={24} color="#0235ac" weight="bold" /> <span>Number of Questions Asked: {details.quescount}</span></li>
            <li className={styles.listitem}><PencilSimpleLine size={24} color="#0235ac" weight="bold" /> <span>Number of Answers Given: {details.anscount}</span></li>
            <li className={styles.listitem}><ChatsCircle size={24} color="#0235ac" weight="bold" /> <span>Number of Comments: {details.comments}</span></li>
        </ul>
    </div>
  )
}

export default MyStats
