import React,{createContext,useEffect,useState,useRef, useCallback} from 'react'
import Navbar from '../../components/navbar/Navbar'
import NavbarDash from '../../components/navbar/NavbarDash'
import SidebarDash from '../../components/sidebar/SidebarDash'
import Sidebar from '../../components/sidebar/Sidebar'
import Postcard from '../../components/postcard/Postcard'
import styles from './Home.module.css'
import Feed from '../../components/Feed/Feed'
import { X } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

import { useSearchParams } from 'react-router-dom'

const Header = createContext();

function TagButton({setTag,tagname}){

  const handleClick = ()=>{
    setTag((current)=>current.filter((tagName)=>tagName!==tagname))
  }

  return(
    <div className={styles.tagitem}>
        {tagname}
        <div className={styles.cancel}>
        <X size={15} color="#0235ac" weight="bold" onClick={handleClick}/>
        </div>
    </div>
  )
}

function Home() {
  const [header,setHeader] = useState("Trending Posts");
  const [login,setLogin] = useState("false")
  const [query,setQuery] = useSearchParams()
  const [section,setSection] = useState('Trending Posts')
  const [taglist,setTagList] = useState([])
  const [user,setUser] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    setLogin(query.get("login"))
  },[login])

  useEffect(()=>{
    if(query.get('login')===null)
      navigate('/?login=false')
  },[])

  useEffect(()=>{
    if(taglist)
      {
        setSection(taglist.toString())

      }
  },[taglist])

  useEffect(()=>{
    if(section=='')
      setSection('Trending Posts')
  },[section])

  useEffect(()=>{
    if(user)
      {
        setSection('user')
      }
  },[user])

return (
    <Header.Provider value={{header,setHeader}}>
<div className={styles.wrapper}>
      <div className={styles.navbar}>
        {
          login=="false" ? <Navbar sec={setSection} setTaglist={setTagList} setUser={setUser}/>:<NavbarDash sec={setSection} setUser={setUser} setTaglist={setTagList}/>
        }
      </div>{
          login=="false" ? <Sidebar sec={setSection} taglist={taglist}/>:<SidebarDash sec={setSection} taglist={taglist}/>
        }
      <div className={styles.postcontainer}>
        <div style={{paddingLeft:"5%",display:"flex"}}>
          {
            taglist.map((tag)=>{
              return <TagButton key={tag} setTag={setTagList} tagname={tag} />
            })
          }
        </div>
        <div>
          <h2 style={{textAlign: "center", paddingBottom:"0vh", position:"sticky"}}>{header}</h2>
        </div>
       <Feed postcardtype={"home"} section={section} user={user}/>
      </div>
    </div>
    </Header.Provider>
    
  )
}

export {Home,Header}
