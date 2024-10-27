import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import ProductList from "../../component/ProductList";
import Breadcrumb from "../../component/Breadcrump";
import Filter from "../../component/Filter";
import Paginated from "../../component/Pagination";

const CategoryProduct = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(24);
  const [openFilter, setOpenFilter] = useState(false);
  const [currentCategorySubcategories, setCurrentCategorySubcategories] =
    useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/products?categoryId=${categoryId}`)
      .then((res) => {
        setProducts(res.data);
      });
  }, [categoryId]);

  useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);

      // Lấy subcategories của category hiện tại
      const currentCategory = res.data.find(
        (cat) => cat.id.toString() === categoryId
      );
      if (currentCategory) {
        setCurrentCategorySubcategories(currentCategory.subcategories);
      }
    });
  }, [categoryId]);

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

    return categoryMatch && priceMatch && occasionMatch;
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

  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id.toString() === categoryId);
    return category ? category.name : "Danh mục không xác định";
  };

  return (
    <div>
      <Header categories={categories}></Header>
      <Breadcrumb text={getCategoryName()}></Breadcrumb>
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ margin: "10px 50px" }}
      >
        <h2>
          {getCategoryName()}{" "}
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
            categories={currentCategorySubcategories}
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
      <div
        className="d-flex justify-content-start mb-4"
        style={{ marginLeft: "40px" }}
      >
        {categories.map((category) => (
          <div key={category.id} className="mx-2">
            <a
              href={`/products/category/${category.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {category.name} |
            </a>
          </div>
        ))}
      </div>
      <ProductList
        products={currentProducts}
        filterFn={(product) => true}
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

export default CategoryProduct;
