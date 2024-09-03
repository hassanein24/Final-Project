import React from 'react'
import style from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
export default function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
