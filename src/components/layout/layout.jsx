import { Outlet, Link } from "react-router-dom";
import AppHeader from "../app-header/app-header.jsx";


export const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  )

}