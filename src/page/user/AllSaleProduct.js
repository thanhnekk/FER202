import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import ProductList from "../../component/ProductList";
import Breadcrumb from "../../component/Breadcrump";
import Filter from "../../component/Filter";
import Paginated from "../../component/Pagination";

const AllSaleProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [openFilter, setOpenFilter] = useState(false);

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

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedPriceRange((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
    setCurrentPage(1);
  };

  const handleOccasionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOccasion((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
    setCurrentPage(1);
  };

  const filterFn = (product) => {
    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.categoryId.toString());
    const priceMatch =
      selectedPriceRange.length === 0 ||
      selectedPriceRange.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });
    const occasionMatch =
      selectedOccasion.length === 0 ||
      selectedOccasion.includes(product.occasion);
    const saleMatch = product.isSale;
    return categoryMatch && priceMatch && occasionMatch && saleMatch;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = products.filter(filterFn);
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header categories={categories}></Header>
      <Breadcrumb text="Sản phẩm giảm giá"></Breadcrumb>
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ margin: "10px 50px" }}
      >
        <h2>
          Sản phẩm giảm giá
          <span
            style={{
              marginLeft: "20px",
              fontSize: "24px",
              fontStyle: "italic",
              fontWeight: "lighter",
            }}
          >
            {filteredProducts.length} sản phẩm
          </span>
        </h2>

        <div style={{ marginLeft: "auto" }}>
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            selectedPriceRange={selectedPriceRange}
            handlePriceRangeChange={handlePriceRangeChange}
            selectedOccasion={selectedOccasion}
            handleOccasionChange={handleOccasionChange}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
        </div>
      </div>
      <ProductList
        products={currentProducts}
        filterFn={(product) => product.isSale}
        title="Sản phẩm"
        isShowAll={true}
      />
      <div
        className="d-flex justify-content-center"
        style={{ margin: "20px 0" }}
      >
        <Paginated
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllSaleProduct;
