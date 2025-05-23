import React, { useState } from "react";
import ProductList from "../components/ProductList";
import MobileLogout from "../components/MobileLogout";
import Spinner from "../components/Spinner";
import "./Store.css";

function Store() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="store-page">
      <main className="store-content">
        <div className="products-section">
          {!isEmpty && !loading && <h2 className="products-title">Products</h2>}
          {isEmpty && !loading && (
            <div className="no-products-wrapper">
              <p className="no-products-msg">Please Add a Product</p>
            </div>
          )}
          {loading && <Spinner />}
          <ProductList onEmpty={setIsEmpty} setLoading={setLoading} />
        </div>
      </main>
      <MobileLogout />
    </div>
  );
}

export default Store;
