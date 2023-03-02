import React from "react";
import { Route, Routes } from "react-router-dom";
import AddItem from "../../app/AddItem/AddItem";
import AdminPage from "../../app/adminpage/AdminPage";
import Home from "../../app/home/Home";
import OneItem from "../../app/oneItem/oneItem";
import OneUser from "../../app/oneUser/OneUser";
import SetUser from "../../app/setUser/setUser";
import UpdateItem from "../../app/updateItem/updateItem";
import UserPage from "../../app/UserPage/UserPage";
import routes from "../../shared/constants/routes";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.MANEGEUSER} element={<AdminPage />} />
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.USER} element={<UserPage />} />
      <Route path={routes.USER + "/:id"} element={<OneUser />} />
      <Route path={routes.SETUSER} element={<SetUser />} />
      <Route path={routes.ADDITEM + "/:id"} element={<AddItem />} />
      <Route path={routes.UPDATEITEM + "/:id"} element={<UpdateItem />} />
      <Route path={routes.ONEITEM + "/:id"} element={<OneItem />} />
    </Routes>
  );
}
