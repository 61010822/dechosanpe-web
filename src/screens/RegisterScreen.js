import React, { useState, useEffect } from 'react'
import { Layout, Space, Row, Col, Typography, Image, Input, Button, Form, message } from 'antd'
import { Redirect } from 'react-router-dom'

import firebase from 'firebase/app'
import 'firebase/auth'

const { Title } = Typography
const { Content } = Layout

export default function RegisterScreen () {
  const [form] = Form.useForm()
  const [emailError, setEmailError] = useState({})
  const [passwordError, setPasswordError] = useState({})
  const [confirmError, setConfirmError] = useState({})
  const auth = firebase.auth()
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    })
    return () => { unsub() }
  }, [])

  const _validateEmail = email => {
    if (typeof email === 'string') email = email.trim()
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (reg.test(email) === false) {
        return false
    }
    return true
  }

  const handleRegister = () => {
    // get data from form
    const email = form.getFieldValue('email')
    const password = form.getFieldValue('password')
    const confirm = form.getFieldValue('confirm')
    console.log(!_validateEmail(email))
    if (!_validateEmail(email)) {
      setEmailError({
          error: "error",
          msg: 'Email has wrong format'
        }
      )
    } else {
      setEmailError({})
    }

    console.log(!password || password.length < 6)
    if (!password || password.length < 6) {
      setPasswordError({
        error: "error",
        msg: 'Password must be 6 more length'
      })
    } else {
      setPasswordError({})
    }

    if (password !== confirm) {
      setPasswordError({
        error: "error",
        msg: 'password does not match'
      })
      setConfirmError({
        error: "error",
        msg: 'password does not match'
      })
    } else {
      if (!passwordError.msg === 'Password must be 6 more length') setPasswordError({})
      setConfirmError({})
    }

    if (!passwordError.error && !emailError.error && !emailError.error) {
      auth.createUserWithEmailAndPassword(email, password).then((user) => {
        // Signed in 
        // ...
        message.success('Register Successful')
      })
      .catch((error) => {
        // var errorCode = error.code;
        const errorMessage = error.message;
        // ..
        message.error(errorMessage)
      })
    }
  }

  if (isAuth) return <Redirect to="/" />

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row justify="center">
        <Col style={{ background: 'white', padding: '20px' }} xs={24} md={12}>
            <Image width={400} preview={false} src={require('../assets/img/logo.png').default} />
            <Title level={3}>Register</Title>
            <Content style={{ textAlign: 'center' }}>
              <Space direction="vertical" style={{ width: '70%'}}>
                <Form form={form}>
                  <Form.Item name="email" validateStatus={emailError.error} help={emailError.msg}>
                    <Input placeholder="email" />
                  </Form.Item>
                  <Form.Item name="password" validateStatus={passwordError.error} help={passwordError.msg}>
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item name="confirm" validateStatus={confirmError.error} help={confirmError.msg}>
                    <Input.Password placeholder="Confirm" />
                  </Form.Item>
                </Form>
                <Button onClick={handleRegister} type="primary" block>
                  Sign In
                </Button>
              </Space>
            </Content>
        </Col>
      </Row>
    </Layout>
  )
}
