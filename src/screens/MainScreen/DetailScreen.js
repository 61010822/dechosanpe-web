import React, { useState } from 'react'
import { Image, Row, Col, Typography, Divider, Rate, Input } from 'antd'
import { useParams } from 'react-router-dom'
const { Title, Paragraph } = Typography

export default function DetailScreen () {
  const { id } = useParams()
  const [cosmetics, setCosmetics] = useState({
    1: {
      name: 'lancome',
      detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore`,
      image: require('../../assets/category/lip/lancome.png'),
      category: ['1'],
      price: 1800,
      shade: ['#D5212E', '#C62121', '#8D0101', '#680101']
    },
    2: {
      name: 'nars',
      detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore`,
      image: require('../../assets/category/lip/nars.png'),
      category: ['1'],
      price: 1100
    }
  })
  return (
    <>
      <Row>
        <Col xs={24} md={12}>
          <div className="cosmetic-detail-thumbnail">
            <Image src={cosmetics[id].image.default} />
          </div>
        </Col>
        <Col style={{ textAlign: 'left', paddingRight: '20px' }} xs={24} md={12}>
          <Title level={4}>{cosmetics[id].name}</Title>
          <Paragraph>{cosmetics[id].detail}</Paragraph>
          <Title level={5}>Price: {cosmetics[id].price}</Title>
          <Divider/>
          <Title level={4}>Shade</Title>
          <Row glutter={5}>
            {
              cosmetics[id].shade && cosmetics[id].shade.map(s => {
                return <Col span={4}>
                        <div className="square" style={{ background: s }}></div>
                      </Col>
              })
            }
          </Row>
          <Divider/>
          MORE DETAIL
          <Divider/>
          <Title level={4}>RANKING</Title>
          <Rate allowHalf defaultValue={2.5} />
          <Divider/>
          <Title level={4}>Comments</Title>
          <Input.TextArea placeholder="Comment" bordered={false} />
        </Col>
      </Row>
    </>
  )
}
