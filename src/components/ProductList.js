import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import AlertModal from "./AlertModal";

function ProductList({ onEmpty, setLoading }) {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(collection(db, "products"), where("ownerId", "==", user.uid));
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(list);
        if (onEmpty) onEmpty(list.length === 0);
        if (setLoading) setLoading(false);
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, [onEmpty, setLoading]);

  const handleAddToCart = async (product) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // 1. Add to cart collection
      const refCart = doc(db, "carts", user.uid, "items", product.id);
      await setDoc(refCart, {
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
        description: product.description || "",
      });

      // 2. Remove from products collection
      await deleteDoc(doc(db, "products", product.id));

      // 3. Success alert
      setAlert({
        type: "success",
        title: "Success",
        message: "Product moved to cart successfully.",
      });
    } catch (error) {
      setAlert({
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      await deleteDoc(doc(db, "products", product.id));
      setAlert({
        type: "success",
        title: "Success",
        message: "Product deleted.",
      });
    } catch (err) {
      setAlert({
        type: "error",
        title: "Error",
        message: err.message,
      });
    }
  };

  return (
    <>
      {alert && (
        <AlertModal
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {products.length > 0 && (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <button
                className="delete-btn"
                onClick={() => handleDeleteProduct(product)}
              >
                ×
              </button>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductList;
