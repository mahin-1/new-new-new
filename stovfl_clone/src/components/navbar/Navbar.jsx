import React,{useRef,useEffect,useState} from 'react'
import styles from './Navbar.module.css'
import {MagnifyingGlass} from 'phosphor-react'
import {Link,useParams,useSearchParams} from 'react-router-dom'
import axios from 'axios'
import url from '../../../url'
import useSearch from '../../hooks/useSearch'

function Navbar({sec,setTaglist,taglist,setUser}) {

  const inputRef = useRef()
  const [entry,setEntry] = useState('')
  const [searchRes,setSearchRes] = useSearch(entry)
  const [height,setHeight] = useState('40vh')
  const inpRef = useRef()
  const par = useParams()
  const [search,setSearch] = useSearchParams()

  const handleSearchChange =(e)=>{
    setEntry(e.target.value)
    if(e.target.value.length>0)
      {
        inputRef.current.style.visibility="visible" 
      }
    else
    {
      inputRef.current.style.visibility="hidden"
    }
  }

  useEffect(()=>{
    if(searchRes.length<10)
        {
          const length = searchRes.length*4;
          setHeight(`${length}vh`)
        }
    else{
      setHeight('40vh')
    }
  },[searchRes])

  const handleSearch=(e,item)=>{
    if(e=="#")
      setTaglist((old)=> [...old,inpRef.current.value])
    else
      setUser(item)
  
  }



  return (
    
    <div>
 <div className={styles.Navbar}>
    <div className={styles.name}>
      <Link to='/?login=false' className={styles.linkstyle}><img src="/se-icon.png" alt="no-image" className={styles.icon}/></Link>
      <div>
      <Link to='/?login=false' className={styles.linkstyle}><span className={styles.queue}>Queue</span><span className={styles.underflow}>Underflow</span></Link>
      </div>
    </div>
    <div className={styles.searchwrapper}>
      <div className={styles.searchicon} >
      <MagnifyingGlass className={styles.magnifying} size={28} color="#812222" weight="regular" />
      </div>
    <input type="text" ref={inpRef} className={styles.search} placeholder='Search' onChange={handleSearchChange}/>
    <div ref={inputRef} style={{visibility:"hidden",zIndex:"10",position:"relative",top:"150%",right:"4%",minWidth:"77.8%",minHeight:height,overflowY:"auto",maxHeight:height,backgroundColor:"white"}} className={styles.suggest}> 
    <ul style={{listStyle:"none",paddingLeft:"0",fontSize:"16px"}}>

      {searchRes.map((item,i)=>{
        return <li key={i}><div style={{minHeight:"4vh",display:"flex",alignItems:"center",cursor:"pointer"}} className={styles.searchitem} onClick={()=>{
          inputRef.current.style.visibility="hidden"
          setSearchRes([])
          const extract = inpRef.current.value.slice(0,1)
          inpRef.current.value=item
          handleSearch(extract,item)
          handleSearchChange({target:{value:item}})
        }}>{item}</div></li>
      })}
    </ul> 
    </div>
    </div>
    <div className={styles.signin}>
   <Link to='/register'><button type="button" className={"btn btn-primary "+styles.loginbtn}>SignUp</button></Link> 
   <Link to='/login'><button type="button" className={"btn btn-primary "+styles.loginbtn}>Login</button></Link> 
    </div>
      </div>
    </div>

   
  )
}

export default Navbar
