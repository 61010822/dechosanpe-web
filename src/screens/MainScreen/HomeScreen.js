import '../../assets/css/home.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemsCarousel from 'react-items-carousel';
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { CATEGORIES } from '../../config/category'

import firebase from 'firebase/app'
import 'firebase/firestore'

import { Carousel, Row, Col, Divider, Typography, Image, Rate } from 'antd'
const { Title } = Typography

export default function HomeScreen () {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 50

  const [categories, setCategories] = useState(CATEGORIES)
  
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  const [cosmetics, setCosmetics] = useState({})
  const [topCosmetic, setTop] = useState([])
  const colculateAverageStar = ratingObject => {
    if (ratingObject && Object.keys(ratingObject).length > 0) {
      const rating = Object.values(ratingObject);
      const sum = rating.reduce((a, b) => {
        return a + b;
      }, 0);
      const average = sum / rating.length;
      const star = (Math.ceil(average * 2) / 2).toFixed(1);
      return parseFloat(star);
    } else return 0;
  }

  useEffect(() => {
    const cosmeticstmp = {}
    const db = firebase.firestore()
    const ref = db.collection('cosmetics')

    // turn on listener when infomation changes change states
    // find the most rate of cosmetic
    const unsub = ref.onSnapshot(cosmeticDocs => {
      
      cosmeticDocs.docChanges().forEach((c) => {
          cosmeticstmp[c.doc.id] = c.doc.data()
      })

      let topCosmetic = []
      // loop through categories id and then sort find the top rate
      Object.keys(categories).forEach(catego => {
        const topOfCategory = Object.keys(cosmeticstmp).filter(cid => {
          if (!cosmeticstmp[cid].category) return false
            return cosmeticstmp[cid].category.indexOf(catego) !== -1
        }).sort((id1, id2) => {
          // sorting algorithm
          const firstStar = colculateAverageStar(cosmeticstmp[id1].rating)
          const secStar = colculateAverageStar(cosmeticstmp[id2].rating)
          if (firstStar < secStar) return 1
          if (firstStar > secStar) return -1
          return 1
        })
        if (topOfCategory.length > 0) topCosmetic = [...topCosmetic, topOfCategory[0]]
      })
      setCosmetics((prevState) => ({
        ...cosmeticstmp,
      }));
      setTop(prevState => ([
        ...topCosmetic
      ]))
    })
    return () => { unsub && unsub() }
  }, [categories])
  

  return (
    <>
      <Carousel style= {{margin:'20px'}}>
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
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={2}
          gutter={20}
          leftChevron={<LeftOutlined style={{ fontSize: 30}} />}
          rightChevron={<RightOutlined style={{ fontSize: 30}} />}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {
            topCosmetic.map(topid => (
            <Link to={`/cosmetic/${topid}`}>
              <div style={{ height: 320}}>
                <Image width={150} preview={false} src={cosmetics[topid].image} />
                <Title level={4}>{cosmetics[topid].name}</Title>
                <Title level={5}>{categories[cosmetics[topid].category[0]].name}</Title>
                <Rate disabled value={colculateAverageStar(cosmetics[topid].rating)} />
              </div>
            </Link>
            ))
          }
        </ItemsCarousel>
      </div>
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
