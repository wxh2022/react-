import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import styles from './index.module.css'
import axios from 'axios';
import ChatWithFriend from './chat-with-friend';
import { Link, Outlet } from 'react-router-dom';

export default function ChatList() {
    const [chatChange,setChatChange] = useState({})
    const { Search } = Input;
    const onSearch = (e) => {
        console.log(e.target.value)
    }
    const [chatData,setChatData] = useState([])
    const [newData,setNewData] = useState(0)
    useEffect(()=>{
        let newData1 = []
        const getFriends =async ()=>{
            const friendsGet = new Promise((resolved,rejected)=>{
                axios.get(`http://localhost:3000/concat?_expand=user&loginId=${localStorage.getItem('id')}&time=always`).then(
                    (response)=>resolved(response.data),
                    (error)=>rejected(error)
                )
            })
            newData1 = [...await friendsGet]
            setChatData(newData1)
        }
        const getFriends1 =async ()=>{
            const friendsGet = new Promise((resolved,rejected)=>{
                axios.get(`http://localhost:3000/concat?_expand=user&userId=${localStorage.getItem('id')}&time=always`).then(
                    (response)=>resolved(response.data),
                    (error)=>rejected(error)
                )
            })
            const centerData = await friendsGet
            centerData.map(async item=>{
                const friendsGet = new Promise((resolved,rejected)=>{
                    axios.get(`http://localhost:3000/users?id=${item.loginId}`).then(
                        (response)=>resolved(response.data),
                        (error)=>rejected(error)
                    )
                })
                let centerData1 = await friendsGet
                centerData1[0].content = item.content
                centerData1[0].loginId = item.loginId
                newData1 = newData1.concat(centerData1)
                setChatData(newData1)
            })  
        }
        getFriends()
        getFriends1()
    },[newData])

    const changeChatFriend = (item)=>{
        setNewData(newData+1)
        setChatChange({id:item.id||item.user.id,username:item.username||item.user.username,avator:item.avator||item.user.avator,content:item.content,loginId:item.loginId})
    }
    return (
        <div className={styles.ind}>
            <div className={styles.main}>
            <Search
                className={styles.search}
                placeholder="搜索"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />
            <ul>
            {
                chatData.map((item,index)=>{
                    return ( <li key={item.user?item.user.id:item.id} className={styles.chatlist} onClick={()=>{changeChatFriend(item)}}>
                        <img className={styles.chatavator} src={item.user?item.user.avator:item.avator} />
                        <div>
                        <p className={styles.chatword1}>{item.user?item.user.username:item.username}</p>
                        <p className={styles.chatword2}>这里是内容,需改成动态的哦...</p>
                        </div>
                         </li>)
                })
            }
            </ul>
            </div>
            <ChatWithFriend user={chatChange}/>
        </div>
    )
}
