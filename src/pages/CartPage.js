import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  addDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import AlertModal from "../components/AlertModal";
import MobileLogout from "../components/MobileLogout";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return navigate("/login");

      const cartRef = collection(db, "carts", user.uid, "items");
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCartItems(items);
        setLoading(false);
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const handleRemove = async (item) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "products"), {
        title: item.title,
        description: item.description || "",
        price: item.price,
        image: item.image,
        ownerId: user.uid,
      });

      await deleteDoc(doc(db, "carts", user.uid, "items", item.id));

      setAlert({
        type: "success",
        title: "Success",
        message: "Item moved back to Store.",
      });
    } catch (error) {
      setAlert({
        type: "error",
        title: "Error",
        message: error.message,
      });
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
      .toFixed(2);
  };

  return (
    <div className="cart-page">
      {alert && (
        <AlertModal
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <h2>Your Cart</h2>

      <div className="back-to-store">
        <button type="button" onClick={() => navigate("/store")}>
          ← Back To The Store
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            Total: ${calculateTotal()}
          </div>
        </div>
      )}

      <MobileLogout />
    </div>
  );
}

export default CartPage;
