import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../component/Header";
import Slider from "../../../component/Slider";
import FeaturedCategories from "../../../component/FeaturedCategories";
import SaleProducts from "../../../component/SaleProduct";
import NewArrivals from "../../../component/NewArrivals";
import OccasionTabs from "../../../component/OccasionTabs";
import Banner from "../../../component/Banner";
import Footer from "../../../component/Footer";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:9999/sliders").then((res) => {
      setSliders(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  function setCategoryName(categoryId) {
    let name = "";
    categories.map((x) => {
      if (x.id === categoryId) {
        name = x.name;
      }
    });
    return name;
  }
  return (
    <div>
      <Header categories={categories}></Header>
      <Slider sliders={sliders}></Slider>
      <FeaturedCategories categories={categories}></FeaturedCategories>
      <SaleProducts products={products}></SaleProducts>
      <Banner></Banner>
      <NewArrivals products={products}></NewArrivals>
      <img
        src="../assets/user/image/banner03.png"
        alt="banner01"
        style={{ width: "100%" }}
      />
      <OccasionTabs products={products}></OccasionTabs>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
