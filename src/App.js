import React from 'react'
import RootRouter from './routers/RootRouter'
import { firebaseConfig } from './config/firebase'
import './App.css'

import firebase from 'firebase/app'
firebase.initializeApp(firebaseConfig)

function App () {
  return (
    <div className="App">
      <RootRouter />
    </div>
  )
}

export default App
