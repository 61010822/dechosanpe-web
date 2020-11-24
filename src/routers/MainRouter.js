import React, { useEffect } from "react";
import { Layout, Typography, Popover, Button, message } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { HOME_ROUTE } from "./router";
import { HomeOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
import firebase from 'firebase/app'
import 'firebase/auth'

const { Title } = Typography;

const { Header, Footer, Content } = Layout;

const HeaderSection = (props) => {
  return (
    <div style={{ width: "calc(100% / 3)", height: "100%" }}>
      {props.children}
    </div>
  );
};

const RootRouter = () => {
  const [auth, setAuth] = React.useState(null)
  const [user, setUser] = React.useState({})

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setAuth(true)
      } else {
        setAuth(false)
      }
    })
    return () => { unsub() }
  }, [])

  const styles = {
    header: {
      lineHeight: 0,
      background: "#f0f2f5",
      display: "flex",
      padding: "16px 10px",
    },
    layout: { minHeight: "100vh" },
    defaultTrigger: { display: "none" },
    hamburgerButton: {
      transform: "scale(0.7)",
      padding: 0,
      float: "right",
    },
  };
  const content = (
    <div>
      <p>USERNAME : {user.email}</p>
      <Button onClick={async () => {
        const auth = firebase.auth()
        try {
          await auth.signOut()
          message.success('sign out successful')
        } catch (error) {
          message.error(error.message)
        }
      }} type="default" block>
        LOG OUT
      </Button>
    </div>
  )
  
  if (auth === null) {
    // loading before check status
    return (
      <Layout>
        <Title level={5}>LOADING</Title>
      </Layout>
    )
  } else if (auth === false) return <Redirect to="/login" /> // redirect if user is not loged in
  

  return (
    <Layout style={styles.layout}>
      <Layout>
        <Header style={styles.header}>
          <HeaderSection>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <HomeOutlined
                  style={{ marginRight: "25px",marginLeft:"25px", fontSize: "20px", float: "left" ,color: "black"}}
                />
              </Link>
              <Link to="/ranking">
                <HeartOutlined style={{ fontSize: "20px", float: "left",color:"black" }} />
              </Link>
            </div>
          </HeaderSection>
          <HeaderSection>
            {/* Screen Header */}
            <Title
              level={5}
              style={{ whiteSpace: "nowrap", lineHeight: "normal" ,fontSize:"20px"}}
            >
              DECHOSANPÉ
            </Title>
          </HeaderSection>
          <HeaderSection>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Popover placement="bottomRight" content={content} trigger="click">
                <UserOutlined
                  style={{ marginRight:"25px",fontSize: "20px" }}
                />
              </Popover>
            </div>
          </HeaderSection>
        </Header>
        <Content>
          <Switch>
            {HOME_ROUTE.map((r) => (
              <Route key={r.name} path={r.path} component={r.component} />
            ))}
            <Redirect from="/" to={HOME_ROUTE[0].path} />
          </Switch>
        </Content>
        <Footer>
          {"Copyright © "} DECHOSANPÉ {new Date().getFullYear()}
          {"."}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootRouter;
