import Category from '../screens/MainScreen/CategoryScreen'
import Detail from '../screens/MainScreen/DetailScreen'
import Home from '../screens/MainScreen/HomeScreen'
import Ranking from '../screens/MainScreen/RankingScreen'

const ROOT_PATH = '/'

const HOME_ROUTE = [
  {
    name: 'Home',
    path: ROOT_PATH + 'main',
    component: Home
  },
  {
    name: 'Category',
    path: ROOT_PATH + 'category/:categoryid',
    component: Category
  },
  {
    name: 'Ranking',
    path: ROOT_PATH + 'ranking',
    component: Ranking
  },
  {
    name: 'Detail',
    path: ROOT_PATH + 'cosmetic/:id',
    component: Detail
  },
]

export { HOME_ROUTE }
