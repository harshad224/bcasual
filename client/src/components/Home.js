import React from "react";
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Sliders from "./Sliders"
import Categories from "./Categories";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import Products11 from "./Products11"

export default function Home() {
    return (
        <>
            <Announcement />
            <Navbar />
            <Sliders />
            <Categories />
            <Products11 />
            <Newsletter />
            <Footer />
        </>
    )
}