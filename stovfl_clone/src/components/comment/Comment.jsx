import React,{useEffect, useState} from 'react'
import styles from './Comment.module.css'
import useGetPostDetails from '../../hooks/useGetPostDetails'
import { Link, useSearchParams } from 'react-router-dom'
import getParsedTime from '../../../time'

function Comment({id}) {
  const state = useGetPostDetails({postID:id,type:"comment"})
  const [time,setTime] = useState()
  const [login,setLogin]=useState('')
  const [target,setTarget] = useState('')
  const [param,setParam] = useSearchParams()

  useState(()=>{
    if(param.get('login')=='false')
      setLogin('false')
    else
      setLogin('true')
  },[])


  useEffect(()=>{
    getParsedTime(state,setTime)
    setTarget(state.owner_display_name+'@'+state.owner_user_id);
  },[state])
  return (
    <div className={styles.container} style={{backgroundColor:"#f7f3f2",paddingTop:"1%",paddingBottom:"1%"}}>
      <div className={styles.left}>
        
      </div>
      <div className={styles.right}>
        <span style={{marginRight:"5%"}}>{state.text}</span><span style={{color:"blue",cursor:"pointer",marginRight:"2%"}}>-{login=='false'? <Link to='/login'>{state.owner_display_name}</Link>:<Link to={`/${param.get('uid')}/${target}`}>{state.owner_display_name}</Link> }</span> <span style={{color:"#9e9a99"}}>{time}</span>
      </div>
      <hr />
    </div>
  )
}

export default Comment
