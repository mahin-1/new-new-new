import React,{useContext} from 'react'
import styles from './Trending.module.css'
import {Header} from '../../pages/Home/Home'

function Trending(props) {
  const {header,setHeader} = useContext(Header)
  const handleClick =(e)=>{
    props.func(e)
  }
  return (
    <div>
       <h3>{props.title}</h3>
        <ul className={styles.list}>
        <li className={styles.tag}><button className={styles.tagbtn} onClick={()=> {console.log("clicked") ;setHeader("Design"); handleClick('Design')}}>Design</button></li>
        <li className={styles.tag}><button className={styles.tagbtn} onClick={()=> {console.log("clicked") ;setHeader("java"); handleClick('java')}}>java</button></li>
        <li className={styles.tag}><button className={styles.tagbtn} onClick={()=> {console.log("clicked") ;setHeader("c#"); handleClick('c#')}}>c#</button></li>
        <li className={styles.tag}><button className={styles.tagbtn} onClick={()=> {console.log("clicked") ;setHeader("design-patterns"); handleClick('design-patterns')}}>design-patterns</button></li>
        <li className={styles.tag}><button className={styles.tagbtn} onClick={()=> {console.log("clicked") ;setHeader("c++"); handleClick('c++')}}>c++</button></li>
        <li className={styles.tag}><button className={styles.tagbtn} onClick={()=> {console.log("clicked") ;setHeader("Trending Posts")}}>Surprise Me</button></li>
        </ul>
    </div>
  )
}

export default Trending
