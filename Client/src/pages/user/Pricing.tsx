import React from 'react'
import Navbar from '../../components/user/navbar'
import Pricing_details from '../../components/user/pricing_details'

const Pricing = () => {
  return (
    <>
      <Navbar currentPage='pricing'/>
      <Pricing_details/>
    </>
  )
}

export default Pricing
