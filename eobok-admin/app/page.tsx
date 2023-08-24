"use client";

import Header from "@/components/Header";
import NewCompany from "@/components/NewCompany";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Page() {
  const MyContext = React.createContext("");
  return (
    <div className="w-full h-full">
      <div className="header fixed w-full top-0 z-50">
        <Header />
      </div>
      <div className="flex">
        <div className="side-bar h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="contents">
          <NewCompany />
        </div>
      </div>
      <div>
        <MyContext.Provider value={""}></MyContext.Provider>
      </div>
    </div>
  );
}
