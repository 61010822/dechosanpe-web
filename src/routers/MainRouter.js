import React from "react";
import { Layout, Typography, Popover, Button } from "antd";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { HOME_ROUTE } from "./router";
import { HomeOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
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
      <p>USERNAME : ____</p>
      <Button type="link" block>
        LOG OUT
      </Button>
    </div>
  )
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
                  style={{ marginRight: "10px", fontSize: "20px", float: "left" }}
                />
              </Link>
              <Link to="/ranking">
                <HeartOutlined style={{ fontSize: "20px", float: "left" }} />
              </Link>
            </div>
          </HeaderSection>
          <HeaderSection>
            {/* Screen Header */}
            <Title
              level={5}
              style={{ whiteSpace: "nowrap", lineHeight: "normal" }}
            >
              DECHOSONPE
            </Title>
          </HeaderSection>
          <HeaderSection>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <Popover placement="bottomRight" content={content} trigger="click">
                <UserOutlined
                  style={{ fontSize: "20px" }}
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
          {"Copyright © "} DECHOSONPE {new Date().getFullYear()}
          {"."}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RootRouter;
