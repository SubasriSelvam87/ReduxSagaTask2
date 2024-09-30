import React from "react";
import StationaryTable from "./StationaryTable";
import CosmeticsTable from "./CosmeticsTable";

const ProductTable = ({
  products,
  availableProducts,
  handleProductChange,
  handleQuantityChange,
  removeProduct,
  type,
  showTable,
  handleShowTable,
  grandTotal,
  discountPercentage,
  gstPercentage,
}) => (
  <>
    {/* Toggle button to show or hide the table */}
    <button 
  className="d-block mx-auto btn btn-white"
  onClick={handleShowTable}
  style={{
    borderRadius: "5px",
    border: "2px solid #1a97f3",
    backgroundColor: "white",
    color: "blue", // This will be blue initially
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#0096c7"; // Blue shade on hover
    e.target.style.color = "white"; // Text changes to white on hover
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "white"; // Reverts back to white when not hovered
    e.target.style.color = "#0096c7"; // Text color is a blue shade after hover ends
  }}
>
  {showTable ? `Hide ${type} Table` : `Add ${type} Table`}
</button>


    {showTable && (
      <>
        {/* Product Table */}
        <table
          className="table mt-3 table-bordered"
          style={{ boxShadow: "0 10px 10px 10px rgba(183, 216, 247, 0.5)" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {type === "stationary" ? (
              <StationaryTable
                products={products}
                availableProducts={availableProducts}
                handleProductChange={handleProductChange}
                handleQuantityChange={handleQuantityChange}
                removeProduct={removeProduct}
              />
            ) : (
              <CosmeticsTable
                products={products}
                availableProducts={availableProducts}
                handleProductChange={handleProductChange}
                handleQuantityChange={handleQuantityChange}
                removeProduct={removeProduct}
              />
            )}
          </tbody>
        </table>

        {/* Grand Total, Discount, and GST */}
        <div
          className="mx-auto mt-5"
          style={{
            border: "1px solid #3ec0f4",
            width: "20%",
            borderRadius: "5px",
            boxShadow: "0 10px 10px 10px rgba(183, 216, 247, 0.5)",
          }}
        >
          <div className="GrandTotal p-3 d-block mx-auto">
            <p className="mr-3">Discount: {discountPercentage}%</p>
            <p className="mr-3">GST: {gstPercentage}%</p>
            <p>Grand Total: ₹ {grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </>
    )}
  </>
);

export default ProductTable;
