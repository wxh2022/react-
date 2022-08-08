import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AvatorInfo from '../avator-info'
import style from './index.module.css'

export default function LeftNav() {
    const [visInfo,setVisInfo] = useState(false)
    const avatorRef = useRef()
    
    useEffect(()=>{
        window.addEventListener('click',(e)=>{
            if(avatorRef.current?.contains(e.target)){
                setVisInfo(true)
            }else{
                setVisInfo(false)
            }
        })
        return()=>{
            window.removeEventListener('click',()=>{})
        }
    },[])
  return (
    <div className={style.main}>
        <div ref={avatorRef}><img className={style.avator} src={localStorage.getItem('avator')}/>
        {visInfo && <div className={style.avatorinfo}><AvatorInfo/></div>}
        </div>
        <Link to='chat-list' className={style.avator1}></Link>
        <Link to='contact-list' className={style.avator2}></Link>
        <div className={style.avator3}></div>
        <div className={style.avator4}></div>
        <div className={style.avator5}></div>
        <div className={style.avator6}></div>
        <div className={style.avator7}></div>
        <div className={style.avator8}></div>
        
    </div>
  )
}
