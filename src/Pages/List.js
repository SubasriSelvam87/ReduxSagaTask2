import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllRequest,
  deleteDataRequest,
  getIdRequest,
  clearFormData,
  viewDataRequest,
} from "../Redux/Action/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = useSelector((state) => state.productReducer.formData);

  // Fetch form data on component mount
  const get = useCallback(() => {
    dispatch(getAllRequest());
  }, [dispatch]);

  useEffect(() => {
    get();
  }, [get]);
  console.log("Datas:", formData);

  const handleEdit = (id) => {
    dispatch(getIdRequest(id));
    navigate(`/Form/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteDataRequest(id));
    toast.error("Deleted Successfully", {
      theme: "dark",
      position: "top-right",
    });
    get();
  };


  
  const handleView = (id) => {
    console.log("Handling view for ID: ", id);
    if (!id) {
        console.error("Invalid ID: ", id);
        return; // Exit early if the ID is invalid
    }

    const selectedForm = formData.find((form) => form.id === id);

    if (selectedForm) {
        const cosmeticsData = selectedForm.cosmetics?.map(({ productId, productName, amount, totalAmount, quantity }) => ({
            productId,
            productName,
            amount,
            totalAmount,
            quantity,
        })) || [];

        const stationaryData = selectedForm.stationary?.map(({ productId, productName, amount, totalAmount, quantity }) => ({
            productId,
            productName,
            amount,
            totalAmount,
            quantity,
        })) || [];

        // Prepare view data
        const viewData = {
            ...selectedForm,
            cosmeticsData,
            stationaryData,
            grandTotalCosmetics: selectedForm.grandTotalCosmetics || 0,
            grandTotalStationary: selectedForm.grandTotalStationary || 0,
            gstCosmetics: selectedForm.gstCosmetics || 0,
            gstStationary: selectedForm.gstStationary || 0,
            discountCosmetics: selectedForm.discountCosmetics || 0,
            discountStationary: selectedForm.discountStationary || 0,
        };

        // Dispatch the action with viewData
        dispatch(viewDataRequest({id,viewData})); // Dispatch with viewData

        // Navigate to the View page
        navigate(`/View/${id}`);
        console.log("Selected ID: ", id);
        console.log("Stationary Datas:", stationaryData);
        console.log("Cosmetics Datas:", cosmeticsData);
    } else {
        console.error("Form not found for ID: ", id);
    }
};

  

  const handleAdd = () => {
    dispatch(clearFormData());
    navigate("/form");
  };

  return (
    <div className="container-fluid " >
      <h1 className="text-center mt-2">Submitted Forms</h1>
    <table className="table table-bordered w-75 mx-auto mt-4" style={{ width: "100%", borderCollapse: "collapse",boxShadow:"1px 1px 10px 5px rgb(174, 176, 177)" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Phone Number
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Address
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(formData) && formData.length > 0 ? (
  formData.map((form) => {
    if (!form.id) {
      console.error("Form has no valid ID:", form);
    }
    return (
      <tr key={form.id}>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {form.name}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {form.email}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {form.phoneNumber}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {form.address}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {form.date}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
          <button style={{
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
      }} onClick={() => handleDelete(form.id)}>Delete</button>
          &nbsp;
          <button style={{
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
      }} onClick={() => handleEdit(form.id)}>Edit</button>
          &nbsp;
          <button style={{
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
      }} onClick={() => handleView(form.id)}>View</button>
        </td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="6" style={{ textAlign: "center", padding: "8px" }}>
      No data available
    </td>
  </tr>
)}
</tbody>

      </table>
      <button
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
        className="btn btn-secondary mt-3 d-flex mx-auto"
        onClick={handleAdd}
      >
        ADD NEW
      </button>
    </div>
  );
};

export default List;
