import React, { useRef } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Space, Upload } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const avator = useRef()

  const registerPost = function (values) {
    return new Promise(
      (resovled, rejected) => {
        //  console.log('开始执行post')
        axios.post('http://localhost:3000/users', values).then(
          response => resovled(response.data),
          error => rejected(error)
        )
      })
  }
  //promise 在程序渲染到时候就加载了
  const registerGet = new Promise(
    (resovled, rejected) => {
      axios.get(`http://localhost:3000/users`).then(
        response => resovled(response.data),
        error => rejected(error)
      )
    })
  const clearWord = () => {
    form.resetFields()
  }

  const onFinish = async (values) => {
    try {
      const res1 = await registerGet;
      //  console.log('res1出来了')
      console.log(avator.current)
      const res2 = await registerPost(Object.assign(Object.assign(values, { id: res1.length + 1 }),{avator:avator.current}))
      // console.log('res2出来了')
      
      navigate('/login')
    } catch (error) {
      message.error('服务器发生未知错误，请稍后重试'+error)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
 
  const handleChange = async(info) => {
    //  console.log(inputRef.current.files[0])
    //  let reader = new FileReader();
    //  reader.onload =function(e){
    //   let data =e.target.result;
    //   console.log(data)
    //   imgRef.current.src=data
    //  } 
    //  reader.readAsDataURL(inputRef.current.files[0])
    const reader = new Promise((resolved)=>{
      const fileReader = new FileReader()
      fileReader.readAsDataURL(info.file)
      fileReader.onload = ()=>resolved(fileReader.result)
    })
    avator.current = await reader
  }
  const handlePreview = async (file) => {
    message.success('这是你当前的个人头像哦')
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="chatname"
        name="chatname"
        rules={[
          {
            required: true,
            message: 'Please input your chatname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="avator"
        name="avator"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Upload
          listType="picture"
          // defaultFileList={[...fileList]}
          className="upload-list-inline"
          beforeUpload={() => { return false }}
          onChange={handleChange}
          onPreview={handlePreview}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space size='large'>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button onClick={clearWord} type="ghost" danger >
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>


  )
}
