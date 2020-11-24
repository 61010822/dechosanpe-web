import '../../assets/css/category.css'
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Typography, Image, Col, Button } from 'antd'
const { Title, Paragraph } = Typography

export default function CategoryScreen () {
  const { categoryid } = useParams()
  const [categories, setCategories] = useState({
    1: {
      name: 'lip',
      icon: require('../../assets/category/lip.png')
    },
    2: {
      name: 'eye',
      icon: require('../../assets/category/eye.png')
    },
    3: {
      name: 'skin care',
      icon: require('../../assets/category/skincare.png')
    }
  })
  const [cosmetics, setCosmetics] = useState({
    1: {
      name: 'lancome',
      detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore`,
      image: require('../../assets/category/lip/lancome.png'),
      category: ['1'],
      price: 1800
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
      <Row style={{ textAlign: 'left' }} gutter={[{ xs: 10, sm: 16, md: 24, lg: 32 }, 16]}>
        <Col xs={24}>
          <Title style={{paddingLeft: '10px'}} level={3}>{categories[categoryid].name}</Title>
        </Col>
        {
          Object.keys(cosmetics).filter(cosid => {
            return cosmetics[cosid].category.indexOf(categoryid) !== -1
          }).map(c => {
            return (
              <Col key={c} xs={12} md={6}>
                <div className="cosmetic-items">
                  <div className="cosmetic-thumbnails">
                    <Image src={cosmetics[c].image.default}/>
                  </div>
                  <Title level={5}>{cosmetics[c].name}</Title>
                  <Paragraph>{cosmetics[c].detail}</Paragraph>
                  <Link to={`/cosmetic/${c}`}>
                    <Button type="primary" block>
                      More Detail
                    </Button>
                  </Link>
                </div>
              </Col>
            )
          })
        }
      </Row>
    </>
  )
}
