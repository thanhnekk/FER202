import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/Header";
import Breadcrump from "../../component/Breadcrump";
import Footer from "../../component/Footer";
import ProductInfor from "../../component/ProductInfor";
import RelateProduct from "../../component/RelateProduct";
const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get("http://localhost:9999/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:9999/products/" + id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("err"));
  }, []);
  useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (cat) => cat.id.toString() === categoryId.toString()
    );
    return category ? category.name : "";
  };
  return (
    <div>
      <Header categories={categories}></Header>
      <Breadcrump
        text={product.name}
        prevtext={getCategoryName(product.categoryId)}
        prevlink={`/products/category/${product.categoryId}`}
      ></Breadcrump>
      <ProductInfor product={product} listproduct={products}></ProductInfor>

      <Footer></Footer>
    </div>
  );
};
export default ProductDetail;
