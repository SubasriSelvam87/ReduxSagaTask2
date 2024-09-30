// import React from "react";

// const CosmeticsTable = ({
//   products,
//   // availableProducts,
//   availableCosmeticsProducts,
//   handleProductChange,
//   handleQuantityChange,
//   removeProduct,
// }) => {
//   return (
//     <>

//         {products.map((product, index) => (
//           <tr key={product.id}>
//             <td>{index + 1}</td>
//             <td>
//               <select
//                 value={product.selectedProductId || ""}
//                 onChange={(e) =>
//                   handleProductChange(product.id, parseInt(e.target.value))
//                 }
//               >
//                 <option value="" disabled>
//                   Select Product
//                 </option>
//                 {availableCosmeticsProducts.map((p) => (
//                   <option key={p.id} value={p.id}>
//                     {p.name}
//                   </option>
//                 ))}
//               </select>
//             </td>
//             <td>
//               <input
//                 type="number"
//                 value={product.quantity}
//                 min="1"
//                 onChange={(e) =>
//                   handleQuantityChange(product.id, parseInt(e.target.value))
//                 }
//                 disabled={!product.selectedProductId}
//               />
//             </td>
//             <td>
//               ₹
//               {product.selectedProductId
//                 ? availableCosmeticsProducts.find(
//                     (p) => p.id === product.selectedProductId
//                   ).amount
//                 : 0}
//             </td>
//             <td>₹ {product.totalAmount.toFixed(2)}</td>
//             <td>
//               <button
//                 className="btn btn-danger"
//                 onClick={() => removeProduct(product.id)}
//               >
//                 Remove
//               </button>
//             </td>
//           </tr>
//         ))}

//     </>
//   );
// };

// export default CosmeticsTable;

// CosmeticsTable.js (example for one table)
// import React from "react";




import React from "react";

const CosmeticsTable = ({
  products = [],
  availableProducts = [],
  handleProductChange,
  handleQuantityChange,
  removeProduct,
}) => {
  return (
    <>
      {products?.map((product) => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>
            <select
              value={product.selectedProductId || ""}
              onChange={(e) =>
                handleProductChange(product.id, parseInt(e.target.value))
              }
            >
              <option value="" disabled>
                Select Product
              </option>
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                handleQuantityChange(product.id, parseInt(e.target.value))
              }
              disabled={!product.selectedProductId}
            />
          </td>
          <td>
            ₹
            {availableProducts.find((p) => p.id === product.selectedProductId)
              ?.amount || 0}
          </td>
          <td>₹{product.totalAmount?.toFixed(2)}</td>
          <td>
            <button
              type="button"
              className="btn btn-white"
              style={{
                border: "2px solid red",
                color: "red",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={() => removeProduct(product.id)}
              onMouseOver={(e) =>  {
                e.target.style.backgroundColor = "red";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) =>{
                e.target.style.backgroundColor = "white";
                e.target.style.color = "red";
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};
export default CosmeticsTable;
