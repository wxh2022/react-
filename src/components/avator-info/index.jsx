import React from 'react'
import style from './index.module.css'
export default function AvatorInfo() {
  return (
    <div className={style.main}> 
       <div className={style.info}>
         <div><p>{localStorage.getItem('username')}</p><p className={style.usermessage}>{localStorage.getItem('chatname')}</p></div>
         <div><img className={style.avator} src={localStorage.getItem('avator')}/></div>  
       </div> 
       <hr className={style.area}/>
       <span >地区:  </span>
       <span>阿富汗</span>
    </div>
  )
}
