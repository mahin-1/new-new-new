import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import url from './url'
import axios from 'axios'

function Auth() {
  const navigate = useNavigate();
  const Aut=()=>{
    let token = document.cookie
    axios.get(`${url.axios_url}/checkToken/${token}`).then((res)=>{
        if(!res.data.success)
            navigate('/login')
    }).catch((e)=>{
        console.log(e)
        navigate('/login')
    })
  }
useEffect(()=>{
    Aut()
},[])
  
}

export default Auth