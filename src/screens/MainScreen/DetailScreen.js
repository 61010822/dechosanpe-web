import React, { useState, useEffect } from "react";
import {
  Image,
  Row,
  Col,
  Typography,
  Divider,
  Rate,
  Input,
  Button,
  Popover,
  message,
  Avatar,
} from "antd";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const { Title, Paragraph } = Typography;

export default function DetailScreen() {
  const { id } = useParams();
  const [cosmetics, setCosmetics] = useState({});
  const [isRate, setIsRate] = useState(false);
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  useEffect(() => {
    const cosmetics = {};
    const db = firebase.firestore();
    const ref = db.collection("cosmetics");

    // turn on listener when infomation changes change states
    const unsub = ref.onSnapshot((cosmeticDocs) => {
      cosmeticDocs.forEach((c) => {
        cosmetics[c.id] = c.data();
      });
      setCosmetics((prevState) => ({
        ...cosmetics,
      }));
    });
    return () => {
      unsub && unsub();
    };
  }, []);

  // check if cosmetics is not yet query from db or not exsts
  if (!cosmetics[id])
    return (
      <>
        <Paragraph>No Product</Paragraph>
      </>
    );

  const content = (
    <Paragraph style={{ maxWidth: "300px" }}>
      {cosmetics[id].more_detail}
    </Paragraph>
  );

  const handleRate = () => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    let peopleRate = cosmetics[id].rating ? cosmetics[id].rating : {};
    if (!Object.keys(peopleRate).includes(user.uid)) {
      peopleRate = {
        ...peopleRate,
        [user.uid]: rating,
      };
      db.collection("cosmetics")
        .doc(id)
        .set(
          {
            rating: peopleRate,
          },
          { merge: true }
        );
      message.success("rate success!");
      setIsRate(false);
    } else {
      message.error("you've already rated this product");
    }
  };

  const handleComment = () => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    let peopleComments = cosmetics[id].comments ? cosmetics[id].comments : [];
    peopleComments = [...peopleComments, {email: user.email, comment}]
    db.collection('cosmetics').doc(id).set({
      comments: peopleComments
    }, { merge: true })
    message.success("comment success!");
  };

  return (
    <>
      <Row>
        <Col xs={24} md={12}>
          <div className="cosmetic-detail-thumbnail">
            <Image src={cosmetics[id].image} />
          </div>
        </Col>
        <Col
          style={{ textAlign: "left", paddingRight: "20px" }}
          xs={24}
          md={12}
        >
          <Title level={4}>{cosmetics[id].name}</Title>
          <Paragraph>{cosmetics[id].detail}</Paragraph>
          <Title level={5}>PRICE: {cosmetics[id].price} Bath</Title>
          <Divider />
          <Title level={4}>SHADE</Title>
          <Row glutter={5}>
            {cosmetics[id].shade &&
              cosmetics[id].shade.map((s) => {
                return (
                  <Col span={4}>
                    <div className="square" style={{ background: s }}></div>
                  </Col>
                );
              })}
          </Row>
          <Divider />
          <Popover placement="left" content={content} trigger="click">
            <Button type="default">MORE DETAIL</Button>
          </Popover>
          <Divider />
          <Title level={4}>RANKING</Title>
          <Rate
            allowHalf
            onFocus={() => {
              setIsRate(true);
            }}
            onChange={(value) => {
              setRating(value);
            }}
            defaultValue={(() => {
              if (
                cosmetics[id].rating &&
                Object.keys(cosmetics[id].rating).length > 0
              ) {
                const rating = Object.values(cosmetics[id].rating);
                const sum = rating.reduce((a, b) => {
                  return a + b;
                }, 0);
                const average = sum / rating.length;
                const star = (Math.ceil(average * 2) / 2).toFixed(1);
                return parseFloat(star);
              } else return 0;
            })()}
          />
          {isRate ? (
            <>
              <Paragraph>Do you want to rate this product ?</Paragraph>
              <Button onClick={handleRate} type="default">
                Yes
              </Button>
              <Button
                onClick={() => {
                  setIsRate(false);
                }}
                style={{ marginLeft: "10px" }}
              >
                No
              </Button>
            </>
          ) : null}
          <Divider />
          <Title level={4}>Comments</Title>
          {
            cosmetics[id].comments && cosmetics[id].comments.map(c => (
              <Row style={{ marginTop: '10px' }}>
                <Avatar
                  style={{ backgroundColor: "grey", verticalAlign: "middle" }}
                  size="large"
                >
                  {c.email.charAt(0)}
                </Avatar>
                <div style={{ marginLeft: "10px", width: '80%' }}>
                  <Title level={5}>{c.email}</Title>
                  <Paragraph>
                    {c.comment}
                  </Paragraph>
                </div>
              </Row>
            ))
          }
          <Input.TextArea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Comment"
            bordered={false}
          />
          {
            comment ? <Button onClick={handleComment} type="default">Comment</Button>: null
          }
        </Col>
      </Row>
    </>
  );
}
