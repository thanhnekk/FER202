import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/Header";
import Breadcrump from "../../component/Breadcrump";
import Footer from "../../component/Footer";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9999/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  return (
    <div>
      <Header categories={categories}></Header>
      <Footer></Footer>
    </div>
  );
};
export default ProductDetail;
