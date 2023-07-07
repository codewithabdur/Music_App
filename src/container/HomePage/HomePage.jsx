import React from 'react'
import './HomePage.scss'
import {Container} from 'react-bootstrap'
import { Body,Footer } from '../../container'
import {Login} from  '../../components'

const Homepage = () => {
  return (
    <Container>
      <Body />
      <Footer />
    </Container>
  )
}

export default Homepage
