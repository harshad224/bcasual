import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../css/productlist.css'
import Announcement from "./Announcement";
import Navbar from "./Navbar";
import Products from "./Products";


export default function ProductList() {

    const location = useLocation()

    const cat = location.pathname.split("/")[2]
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState({ color: "color", size: "size", material: "material" })

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `/api/product?category=${cat}` : '/api/product/')
                setProducts(res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [cat])



    // useEffect(()=> {
    //     if (sort === 'newest') {

    //     }
    // })
    const handleFilter = (event) => {
        const { name, value } = event.target
        return setFilters({ ...filters, [name]: value })
    }

    console.log(filters)
    return (
        <>
            <Announcement />
            <Navbar />
            <div className="filteroption">
                <div className="jackets">Jackets</div>
                <div>
                    <label className="filters">Filter:</label>
                    <select className="colorr" id="colorr" name="color" value={filters.color} onChange={handleFilter}>
                        <option>color</option>
                        <option>white</option>
                        <option>green</option>
                        <option>orange</option>
                        <option>red</option>
                        <option>blue</option>
                    </select>
                    <select className="size" id="size" name="size" value={filters.size} onChange={handleFilter}>
                        <option>size</option>
                        <option>x</option>
                        <option>xs</option>
                        <option>xl</option>
                        <option>xxl</option>
                        <option>xxxl</option>
                    </select>
                    <select className="materiallabel" id="materiallabel" name="material" value={filters.material} onChange={handleFilter}>
                        <option>material</option>
                        <option>jeans</option>
                        <option>cotton</option>
                        <option>leather</option>
                        <option>linen</option>
                        <option>silk</option>
                    </select>
                    <select className="sortlabel" id="sortlabel" name="sort" value={filters.sort} onChange={handleFilter}>
                        <option>newest</option>
                        <option>popular</option>
                    </select>
                </div>
            </div>
            <div className="space"></div>
            <Products cat={cat} filters={filters} products={products} />
        </>
    )
}