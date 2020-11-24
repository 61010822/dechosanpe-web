import React from 'react'
import { Layout, Space, Row, Col, Typography, Image, Input, Button } from 'antd'
const { Paragraph, Title } = Typography
const { Content } = Layout
export default function RegisterScreen () {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row justify="center">
        <Col style={{ background: 'white', padding: '20px' }} xs={24} md={12}>
            <Image width={100} preview={false} src={require('../assets/img/logo.png').default} />
            <Title level={3}>Register</Title>
            <Content style={{ textAlign: 'left' }}>
              <Space direction="vertical" style={{ width: '100%'}}>
                <Input placeholder="email" />
                <Row gutter={10}>
                  <Col xs={12}><Input.Password placeholder="Password" /></Col>
                  <Col xs={12}><Input.Password placeholder="Confirm" /></Col>
                </Row>
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
