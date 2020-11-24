import React, { useState, useEffect } from 'react'
import { CATEGORIES } from '../../config/category'
import { Divider, Typography, Image, Rate } from 'antd'

import firebase from 'firebase/app'
import 'firebase/firestore'

const { Title } = Typography

export default function RankingScreen () {
  const [categories, setCategories] = useState(CATEGORIES)
  const [ranking, setRanking] = useState({})
  const [cosmetics, setCosmetics] = useState({})

  const calculateAverageStar = ratingObject => {
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

      let topCosmetic = {}
      // loop through categories id and then sort find the top rate
      Object.keys(categories).forEach(catego => {
        const topOfCategory = Object.keys(cosmeticstmp).filter(cid => {
          if (!cosmeticstmp[cid].category) return false
            return cosmeticstmp[cid].category.indexOf(catego) !== -1
        }).sort((id1, id2) => {
          // sorting algorithm
          const firstStar = calculateAverageStar(cosmeticstmp[id1].rating)
          const secStar = calculateAverageStar(cosmeticstmp[id2].rating)
          if (firstStar < secStar) return 1
          if (firstStar > secStar) return -1
          return 1
        })
        topCosmetic[catego] = topOfCategory
      })
      setCosmetics((prevState) => ({
        ...cosmeticstmp
      }));
      setRanking((prevState) => ({
        ...topCosmetic
      }));
      
    })
    return () => { unsub && unsub() }
  }, [categories])

  return (
    <>
      {
        Object.keys(categories).map(cat => {
          return <>
            <Divider orientation="left">{categories[cat].name}</Divider>
            {
              ranking[cat] ? ranking[cat].map(r => {
                console.log(cosmetics[r])
                return <div style={{ display: 'flex', margin: '20px', height: '180px', background: 'white', marginTop: '5px', borderRadius: '18px' }}>
                  <Image width={150} src={cosmetics[r].image}/>
                  <div style={{ display: 'flex', marginLeft: '40px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Title level={4}>{cosmetics[r].name}</Title>
                    <Title level={5}>Price: {cosmetics[r].price}</Title>
                    <Rate disabled value={calculateAverageStar(cosmetics[r].rating)} />
                  </div>
                </div>
              }): null
            }
          </>
        })
      }
    </>
  )
}
