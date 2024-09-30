import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();

  // Access the selected form data from Redux state
  const viewData = useSelector((state) => state.productReducer.viewData);
  console.log("View Data:", viewData);

  if (!viewData) {
    return <div>Loading...</div>; // Show a loading message if viewData is undefined
  }

  // Financial Calculations
  const grandTotalCosmetics = viewData.grandTotalCosmetics || 0;
  const grandTotalStationary = viewData.grandTotalStationary || 0;
  const totalGSTCosmetics = viewData.gstCosmetics || 0;
  const totalGSTStationary = viewData.gstStationary || 0;
  const totalDiscountCosmetics = viewData.discountCosmetics || 0;
  const totalDiscountStationary = viewData.discountStationary || 0;

  const grandTotal = grandTotalCosmetics + grandTotalStationary;
  const totalGST = totalGSTCosmetics + totalGSTStationary;
  const totalDiscount = totalDiscountCosmetics + totalDiscountStationary;

  return (
    <div className="container" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Invoice Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: "0", fontSize: "24px" }}>Nivetha Cosmetics& Stationary Shop</h1>
        <p style={{ margin: "0" }}>180, SadayarKovil,Mannargudi Rd,Thanjavur</p>
        <p style={{ margin: "0" }}>Phone: +91 9981728197</p>
        <p style={{ margin: "0" }}> PIN: 614 088</p>
      </div>

      {/* Invoice & Customer Details */}
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p><strong>Invoice No:</strong> S01</p>
            <p><strong>Bill To:</strong> Nivetha Mathivanan </p>
            <p><strong>Address:</strong> 180, SadayarKovil,Mannargudi Rd,Thanjavur</p>
            <p><strong>Date:</strong> {viewData.date}</p>
          </div>
          <div>
            <p><strong>Invoice Date:</strong> {viewData.date}</p>
            <div><strong>Name:</strong> {viewData.name}</div>
            <div><strong>Email:</strong> {viewData.email}</div>
            <div><strong>Phone Number:</strong> {viewData.phoneNumber}</div>
            <div><strong>Address:</strong> {viewData.address}</div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ borderBottom: "2px solid black" }}>Cosmetics Products</h2>
        {viewData.cosmeticsData?.length > 0 ? (
          <>
          <table
            style={{
              width: "100%",
              border: "1px solid black",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Product Name</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Price per Unit</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Tax</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {viewData.cosmeticsData.map((product, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.productName}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.quantity}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.amount}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>5%</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
           <div style={{ border: "1px solid black", padding: "10px" }}>
           <h3>Financial Summary</h3>
           <p><strong>Grand Total (Cosmetics):</strong> ₹{grandTotalCosmetics}</p>
           {/* <p><strong>Grand Total (Stationary):</strong> ₹{grandTotalStationary}</p> */}
           <p><strong>Total Grand Total:</strong> ₹{grandTotal}</p>
           <p><strong>GST (Cosmetics):</strong> ₹{totalGSTCosmetics}</p>
           {/* <p><strong>GST (Stationary):</strong> ₹{totalGSTStationary}</p> */}
           <p><strong>Total GST:</strong> ₹{totalGST}</p>
           <p><strong>Discount (Cosmetics):</strong> ₹{totalDiscountCosmetics}</p>
           {/* <p><strong>Discount (Stationary):</strong> ₹{totalDiscountStationary}</p> */}
           <p><strong>Total Discount:</strong> ₹{totalDiscount}</p>
         </div>
         </>
        ) : (
          <p>No cosmetics products available.</p>
        )}

        <h2 style={{ borderBottom: "2px solid black" }}>Stationary Products</h2>
        {viewData.stationaryData?.length > 0 ? (
          <>
          <table
            style={{
              width: "100%",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Product Name</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Price per Unit</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Tax</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {viewData.stationaryData.map((product, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.productName}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.quantity}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.amount}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>5%</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{product.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ border: "1px solid black", padding: "10px" }}>
        <h3>Financial Summary</h3>
        {/* <p><strong>Grand Total (Cosmetics):</strong> ₹{grandTotalCosmetics}</p> */}
        <p><strong>Grand Total (Stationary):</strong> ₹{grandTotalStationary}</p>
        <p><strong>Total Grand Total:</strong> ₹{grandTotal}</p>
        {/* <p><strong>GST (Cosmetics):</strong> ₹{totalGSTCosmetics}</p> */}
        <p><strong>GST (Stationary):</strong> ₹{totalGSTStationary}</p>
        <p><strong>Total GST:</strong> ₹{totalGST}</p>
        {/* <p><strong>Discount (Cosmetics):</strong> ₹{totalDiscountCosmetics}</p> */}
        <p><strong>Discount (Stationary):</strong> ₹{totalDiscountStationary}</p>
        <p><strong>Total Discount:</strong> ₹{totalDiscount}</p>
      </div>
          </>
        ) : (
          <p>No stationary products available.</p>
        )}
      </div>

      {/* Financial Summary */}
      

      <button
      className="btn btn-primary mx-auto d-block"
        onClick={() => navigate("/list")}
        style={{
          borderRadius: "5px",
          border: "2px solid #1a97f3",
          backgroundColor: "white",
          color: "blue",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#0096c7";
          e.target.style.color = "white";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#0096c7";
        }}
      >
        Back to List
      </button>
    </div>
  );
};

export default View;
