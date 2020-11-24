import React from 'react'
import { Layout, Space, Row, Col, Typography, Image, Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'

const { Paragraph, Title } = Typography
const { Content } = Layout
export default function LoginScreen () {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row justify="center">
        <Col style={{ background: 'white', padding: '20px' }} xs={24} md={12}>
            <Image width={100} preview={false} src={require('../assets/img/logo.png').default} />
            <Paragraph>Need an account ? <Link to="/register">Register</Link></Paragraph>
            <Content style={{ textAlign: 'left' }}>
              <Space direction="vertical" style={{ width: '100%'}}>
                <Form layout="vertical">
                  <Form.Item label="E-Mail : ">
                    <Input placeholder="email" />
                  </Form.Item>
                  <Form.Item label="Password : ">
                    <Input.Password placeholder="password" />
                  </Form.Item>
                </Form>
                <Button type="primary" block>
                  Sign In
                </Button>
              </Space>
            </Content>
        </Col>
      </Row>
    </Layout>
  )
}
