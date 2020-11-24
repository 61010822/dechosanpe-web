import React, { useEffect, useState } from 'react'
import { Layout, Space, Row, Col, Typography, Image, Input, Button, Form, message } from 'antd'
import { Link, Redirect } from 'react-router-dom'

import firebase from 'firebase/app'
import 'firebase/auth'

const { Paragraph } = Typography
const { Content } = Layout


export default function LoginScreen () {
  const [form] = Form.useForm()
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuth(true)
      } else {
        setAuth(false)
      }
    })
    return () => { unsub() }
  }, [])

  const handleLogin = async () => {
    const email = form.getFieldValue('email')
    const password = form.getFieldValue('password')
    console.log(email)
    if (email && password) {
      const auth = firebase.auth()
      try {
        await auth.signInWithEmailAndPassword(email, password)
        message.success('Login Success')
      } catch (error) {
        message.error(error.message)
      }
    } else {
      message.error('Please insert Email and password')
    }
  }

  if (auth) return <Redirect to="/" />

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row justify="center">
        <Col style={{ background: 'white', padding: '20px' }} xs={24} md={12}>
            <Image width={100} preview={false} src={require('../assets/img/logo.png').default} />
            <Paragraph>Need an account ? <Link to="/register">Register</Link></Paragraph>
            <Content style={{ textAlign: 'left' }}>
              <Space direction="vertical" style={{ width: '100%'}}>
                <Form form={form} layout="vertical">
                  <Form.Item name="email" label="E-Mail : ">
                    <Input placeholder="email" />
                  </Form.Item>
                  <Form.Item name="password" label="Password : ">
                    <Input.Password placeholder="password" />
                  </Form.Item>
                </Form>
                <Button onClick={handleLogin} type="primary" block>
                  Sign In
                </Button>
              </Space>
            </Content>
        </Col>
      </Row>
    </Layout>
  )
}
