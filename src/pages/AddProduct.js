import React, { useState } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/AlertModal";
import MobileLogout from "../components/MobileLogout";
import "./AddProduct.css";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      return setAlert({ type: "error", title: "Error", message: "Please log in." });
    }

    if (!title || !description || !price || !imageFile) {
      return setAlert({ type: "error", title: "Error", message: "Please fill all fields." });
    }

    try {
      setUploading(true);
      const imageRef = ref(storage, `product-images/${user.uid}/${imageFile.name}_${Date.now()}`);
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);

      await addDoc(collection(db, "products"), {
        title,
        description,
        price: parseFloat(price),
        image: imageURL,
        ownerId: user.uid,
      });

      setAlert({ type: "success", title: "Success", message: "Product added!" });
      setTitle("");
      setDescription("");
      setPrice("");
      setImageFile(null);
    } catch (error) {
      setAlert({ type: "error", title: "Error", message: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-product-page">
      {alert && (
        <AlertModal
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="add-product-wrapper">
        <div className="back-to-store">
          <button type="button" onClick={() => navigate("/store")}>
            ← Back To The Store
          </button>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <h2>Add New Product</h2>
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>

      <MobileLogout />
    </div>
  );
}

export default AddProduct;
