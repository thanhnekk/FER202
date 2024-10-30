import React, { useState , useEffect} from "react";
import Header from "../../component/Header";
import Breadcrump from "../../component/Breadcrump";
import axios from "axios";
import ProductList from "../../component/ProductList";
const SearchResult = ({products}) => {
    const [categories, setCategories] = useState([])
useEffect(() => {
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);
    return (
        <div>
            <Header categories={categories}></Header>
            <Breadcrump text="Tìm kiếm"></Breadcrump>
        <div className="container">
            <h1>Kết quả tìm kiếm:</h1>
                {products.length > 0 ? (
                    <div>
                    {/* <div style={{ marginLeft: "auto" }}>
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
                  </div> */}

                <ProductList
                  products={products}
                  filterFn={(product) => product.isSale}
                  title="Sản phẩm"
                  isShowAll={true}
                />
                <div
                  className="d-flex justify-content-center"
                  style={{ margin: "20px 0" }}
                >
                  {/* <Paginated
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  /> */}
                  </div>
                  </div>
                ) : (
                    <p>Không tìm thấy sản phẩm nào.</p>
                )}
        </div>
        </div>
    );
};export default SearchResult