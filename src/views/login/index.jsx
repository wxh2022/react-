import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'

export default function Login() {
  console.log("执行了")
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(localStorage.getItem('token')!==''){
  //     navigate('/front')
  //   }
  // },[])
  const loginGet = function (value) {
    return new Promise(
      (resovled, rejected) => {
        //  console.log('开始执行post')
        axios.get(`http://localhost:3000/users?chatname=${value}`).then(
          response => resovled(response.data),
          error => rejected(error)
        )
      })
  }
  const onFinish = async (values) => {
    try {
      const res = await loginGet(values.username)
      if(res[0].password === values.password) {
        message.success('登录成功')
        localStorage.setItem('avator',res[0].avator)
        localStorage.setItem('username',res[0].username)
        localStorage.setItem('chatname',res[0].chatname)
        localStorage.setItem('id',res[0].id)
        navigate('/front')
      } else {
        message.error('密码错误，请重试!')
      }
    } catch (error) {
      console.log(error)
      message.error('不存在此用户，请点击注册')
    }

  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to='/register'>注册</Link>
      </Form.Item>
    </Form>
  )
}
