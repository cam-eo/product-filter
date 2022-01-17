import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Filter from '../components/Filter'
import Products from '../components/Products'
import { StateProvider } from '../stateManagement/StateProvider';
import reducer, { initialState } from '../stateManagement/reducer';


export default function Home() {
  return (
    <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <div className={styles.container}>
      <Header />
      <Filter />
      <Products />
    </div>
    </StateProvider>
  </React.StrictMode>

  )
}
