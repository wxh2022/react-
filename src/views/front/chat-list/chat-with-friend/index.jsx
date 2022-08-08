import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'

export default function ChatWithFriend(props) {
  const [chat,setChat]= useState([])
  const textRef = useRef()
  const chatContentRef = useRef()
 
  useEffect(()=>{
    setChat(props.user.content)
  },[props])    //props如果在这不写的话，在数据来之前就已经执行完渲染了。
  useEffect(()=>{    //渲染完之后scrollHeight才增加
    chatContentRef.current.scrollTop=chatContentRef.current.scrollTop=chatContentRef.current.scrollHeight-chatContentRef.current.clientHeight
  },[chat])
  const uniqueGet = async()=>{
    const uni1= new Promise((resolved,rejected)=>{
      axios.get(`http://localhost:3000/concat?loginId=${localStorage.getItem('id')}&userId=${props.user.id}`).then(
        (response)=>resolved(response.data),
        (error)=>rejected(error)
      )
    })
    const uni2= new Promise((resolved,rejected)=>{
      axios.get(`http://localhost:3000/concat?loginId=${props.user.id}&userId=${localStorage.getItem('id')}`).then(
        (response)=>resolved(response.data),
        (error)=>rejected(error)
      )
    })
    const uniqueId = await uni1
    if(uniqueId.length>0){
      return uni1
    }else{
      return uni2
    }
  }

  const PatchData = (unique,content)=>{
    return new Promise((resolved,rejected)=>{
      axios.patch(`http://localhost:3000/concat/${unique}`,{content:content}).then(
        response=>resolved(response.data),
        error=>rejected(error)
      )
    })
  }
  const textChange = async(event)=>{
    if(event.keyCode===13){
      if(event.target.value.length>1){
        if(props.user.loginId == localStorage.getItem('id')){
          const newChat = [...chat,{"id1":event.target.value}]
          setChat(newChat)
          const uni =await uniqueGet()

          const resPatch = await PatchData(uni[0].id,newChat)
        }else{
          const newChat = [...chat,{"id2":event.target.value}]
          setChat(newChat)
          const uni =await uniqueGet()
 
          const resPatch = await PatchData(uni[0].id,newChat)
        }
      }else{
        message.error('请输入内容')
      }
      textRef.current.value=''
    }
  }
  return (
    <div className={styles.main}>
        <div className={styles.header}>
            <h1>{props.user.username}</h1>
            <div className={styles.imgset}></div>
        </div>
        <div className={styles.chatarea} ref={chatContentRef}>
            <ul>
              {
              chat?.map((word,index)=>{
                return(
                <li key={index}>
                  {
                    props.user.loginId == localStorage.getItem('id')?
                  word.id1?
                    <div className={styles.right}><p className={styles.chatRightword}>{word.id1}</p><img className={styles.chatRightImg} src={localStorage.getItem('avator')}/></div>
                    :<div className={styles.left}><img className={styles.chatLeftImg} src={props.user.avator}/><p className={styles.chatLeftword}>{word.id2}</p></div>
                    :word.id1?<div className={styles.left}><img className={styles.chatLeftImg} src={props.user.avator}/><p className={styles.chatLeftword}>{word.id1}</p></div>
                    :<div className={styles.right}><p className={styles.chatRightword}>{word.id2}</p><img className={styles.chatRightImg} src={localStorage.getItem('avator')}/></div>
                  }
                   </li> 
              )})
              }
            </ul>
        </div>
        <div className={styles.footer}>
            <div className={styles.application}>
              <div className={styles.leftApplication}>
                <div className={styles.xiaolian}></div>
                <div className={styles.wenjian}></div>
                <div className={styles.jianqie}></div>
                <div className={styles.xiaoxi}></div>
              </div>
              <div className={styles.leftApplication}>
              <div className={styles.dianhua}></div>
              <div className={styles.shipin}></div>
              </div>
            </div>
            <textarea ref={textRef} onKeyUp={textChange} className={styles.chattextarea} />
        </div>
    </div>
  )
}
