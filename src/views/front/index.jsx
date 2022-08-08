import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import LeftNav from '../../components/left-nav'
import styles from './index.module.css'

export default function Front() {

  return (
    <div className={styles.main}>
    <LeftNav />
    <Outlet />
    </div>
  )
}
