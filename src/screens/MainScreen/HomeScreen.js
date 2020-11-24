import '../../assets/css/home.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Carousel, Row, Col, Divider, Typography, Image } from 'antd'
const { Title } = Typography

export default function HomeScreen () {
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
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  return (
    <>
      <Carousel>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Divider orientation="center">Trending</Divider>
      <a target="_blank" rel="noopener noreferrer" href="http://your_url_here.html">Link</a>
      <Divider orientation="center">Category Vote</Divider>
      <Row justify="center" gutter={[{ xs: 10, sm: 16, md: 24, lg: 32 }, 16]}>
        {
          Object.keys(categories).map(g => {
            console.log(g)
            return (
              <Col key={g} className="gutter-row" span={5}>
                <Link to={`category/${g}`}>
                  <div className="catagory-items">
                    <div className="catagories-thumbnail">
                      <Image preview={false} src={categories[g].icon.default}/>
                    </div>
                    <Title style={{
                      whiteSpace: 'nowrap',
                      marginLeft: '-100%',
                      marginRight: '-100%',
                      textAlign: 'center'
                    }} level={5}>{categories[g].name}</Title>
                  </div>
                </Link>
              </Col>
            )
          })
        }
      </Row>
    </>
  )
}
