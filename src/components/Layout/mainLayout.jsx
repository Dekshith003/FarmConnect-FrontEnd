import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <Outlet /> {/* renders the child route component */}
      </main>
      <Footer />
    </>
  );
}
