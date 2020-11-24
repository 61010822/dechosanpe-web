import '../../assets/css/category.css'

import firebase from 'firebase/app'
import 'firebase/firestore'

import { CATEGORIES } from '../../config/category'

import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Typography, Image, Col, Button } from 'antd'

const { Title, Paragraph } = Typography

export default function CategoryScreen () {
  const { categoryid } = useParams()
  const [categories, setCategories] = useState(CATEGORIES)
  const [cosmetics, setCosmetics] = useState({})

  useEffect(() => {
    const cosmeticstmp = {}
    const db = firebase.firestore()
    const ref = db.collection('cosmetics')

    // turn on listener when infomation changes change states
    const unsub = ref.onSnapshot(cosmeticDocs => {
      
      cosmeticDocs.docChanges().forEach((c) => {
          cosmeticstmp[c.doc.id] = c.doc.data()
      })
      setCosmetics(prevState => ({
        ...cosmeticstmp
      }))
    })
    return () => { unsub && unsub() }
  }, [])

  return (
    <>
      <Row style={{ textAlign: 'left' }} gutter={[{ xs: 10, sm: 16, md: 24, lg: 32 }, 16]}>
        <Col xs={24}>
          <Title style={{paddingLeft: '10px'}} level={3}>{categories[categoryid].name}</Title>
        </Col>
        {
          Object.keys(cosmetics).filter(cosid => {
            if (!cosmetics[cosid].category) return false
            return cosmetics[cosid].category.indexOf(categoryid) !== -1
          }).map(c => {
            return (
              <Col key={c} xs={12} md={6}>
                <div className="cosmetic-items">
                  <div className="cosmetic-thumbnails">
                    <Image src={cosmetics[c].image}/>
                  </div>
                  <Title level={5}>{cosmetics[c].name}</Title>
                  <Paragraph>{cosmetics[c].detail}</Paragraph>
                  <Link to={`/cosmetic/${c}`}>
                    <Button type="default" block>
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
