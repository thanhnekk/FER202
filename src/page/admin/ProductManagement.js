import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminRoute from "../../routes/AdminRoute";
import { Modal, Button, Form, Table } from "react-bootstrap";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    inStock: 0,
    status: "Activate",
    occasion: "",
    images: [],
    categoryId: 1,
    subcategoryId: 1,
    salePrice: null,
    isSale: false,
    isNew: true,
    soldQuantity: 0,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9999/products").then((res) => {
      setProducts(res.data);
    });
    axios.get("http://localhost:9999/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || newProduct.inStock <= 0) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
      return;
    }
    axios.post("http://localhost:9999/products", newProduct).then((res) => {
      setProducts([...products, res.data]);
      setNewProduct({
        name: "",
        price: "",
        inStock: 0,
        status: "Activate",
        occasion: "",
        images: [],
        categoryId: 1,
        subcategoryId: 1,
        salePrice: null,
        isSale: false,
        isNew: true,
        soldQuantity: 0,
      });
      setShowAddModal(false);
    });
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = () => {
    axios
      .put(`http://localhost:9999/products/${editProduct.id}`, editProduct)
      .then((res) => {
        setProducts(
          products.map((product) =>
            product.id === editProduct.id ? res.data : product
          )
        );
        setEditProduct(null);
        setShowEditModal(false);
      });
  };

  const handleDeleteProduct = (id) => {
    const updatedProduct = products.find((product) => product.id === id);
    updatedProduct.status = "Deleted";
    axios
      .put(`http://localhost:9999/products/${id}`, updatedProduct)
      .then(() => {
        setProducts(
          products.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
      });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminRoute>
      <div className="product-management">
        <h2>Quản Lý Sản Phẩm</h2>

        <input
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Thêm Sản Phẩm
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Giá Khuyến Mãi</th>
              <th>Số lượng</th>
              <th>Danh mục</th>
              <th>Trạng thái</th>
              <th>Hình ảnh</th>
              <th>Khuyến mãi</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}₫</td>
                <td>{product.salePrice ? `${product.salePrice}₫` : "N/A"}</td>
                <td>{product.inStock}</td>
                <td>
                  {
                    categories.find((cat) => cat.id === product.categoryId)
                      ?.name
                  }
                  {" - "}
                  {
                    categories
                      .find((cat) => cat.id === product.categoryId)
                      ?.subcategories.find(
                        (sub) => sub.id === product.subcategoryId
                      )?.name
                  }
                </td>
                <td>{product.status}</td>
                <td>{product.images.join(", ")}</td>
                <td>{product.isSale ? "Có" : "Không"}</td>
                <td>{product.isNew ? "Mới" : "Không mới"}</td>
                <td>
                  <Button onClick={() => handleEditProduct(product)}>
                    Chỉnh Sửa
                  </Button>
                  {product.status !== "Deleted" && (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Xóa
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal thêm sản phẩm */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm Sản Phẩm Mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập giá sản phẩm"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductStock">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập số lượng sản phẩm"
                  value={newProduct.inStock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, inStock: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductCategory">
                <Form.Label>Danh mục</Form.Label>
                <Form.Control
                  as="select"
                  value={newProduct.categoryId}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      categoryId: parseInt(e.target.value),
                      subcategoryId: categories.find(
                        (cat) => cat.id === parseInt(e.target.value)
                      )?.subcategories[0].id, // Tự động chọn subcategory đầu tiên
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProductSubcategory">
                <Form.Label>Phân loại</Form.Label>
                <Form.Control
                  as="select"
                  value={newProduct.subcategoryId}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      subcategoryId: parseInt(e.target.value),
                    })
                  }
                >
                  {categories
                    .find((cat) => cat.id === newProduct.categoryId)
                    ?.subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              {/* Các trường thông tin khác cho sản phẩm */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleAddProduct}>
              Thêm
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal chỉnh sửa sản phẩm */}
        {editProduct && (
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Chỉnh Sửa Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formEditProductName">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formEditProductPrice">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formEditProductStock">
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="number"
                    value={editProduct.inStock}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        inStock: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formEditProductCategory">
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Control
                    as="select"
                    value={editProduct.categoryId}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        categoryId: parseInt(e.target.value),
                        subcategoryId: categories.find(
                          (cat) => cat.id === parseInt(e.target.value)
                        )?.subcategories[0].id, // Tự động chọn subcategory đầu tiên
                      })
                    }
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formEditProductSubcategory">
                  <Form.Label>Phân loại</Form.Label>
                  <Form.Control
                    as="select"
                    value={editProduct.subcategoryId}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        subcategoryId: parseInt(e.target.value),
                      })
                    }
                  >
                    {categories
                      .find((cat) => cat.id === editProduct.categoryId)
                      ?.subcategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
                {/* Các trường khác */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Đóng
              </Button>
              <Button variant="primary" onClick={handleUpdateProduct}>
                Cập Nhật
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </AdminRoute>
  );
};

export default ProductManagement;
