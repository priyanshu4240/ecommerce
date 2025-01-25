import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"AirPods"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"Watch"} heading={"Popular's Watches"}/>

      <VerticalCardProduct category={"Mobile"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"TV"} heading={"Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"Earphone"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"Speaker"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"Refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"Trimmer"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home