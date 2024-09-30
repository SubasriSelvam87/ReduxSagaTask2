import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Form.css";
import Navbar from "./Navbar";
import ProductTable from "./ProductTable";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { postDataRequest, editDataRequest } from "../Redux/Action/action";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Required!"),
  email: Yup.string().email("*Invalid email address").required("*Required!"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "*Invalid Phone Number!")
    .required("*Required!"),
  date: Yup.date().required("*Date is required!"),
  address: Yup.string()
    .matches(
      /^[0-9]+\s*,\s*[a-zA-Z\s]+\s*,\s*[a-zA-Z\s]+$/,
      "Address must be in the format: DoorNo, Street Name, City"
    )
    .required("*Address is required!"),
});

const getTodayDate = () => new Date().toISOString().split("T")[0];

const useProductManagement = (availableProducts) => {
  const [products, setProducts] = useState([
    { id: 1, selectedProductId: null, quantity: 1, totalAmount: 0 },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);

  const gstPercentage = 2;
  const discountPercentage = 10;

  const calculateGrandTotal = (products) => {
    const totalAmount = products.reduce(
      (sum, product) => sum + product.totalAmount,
      0
    );
    const discount = (totalAmount * discountPercentage) / 100;
    const gst = ((totalAmount - discount) * gstPercentage) / 100;
    const finalTotal = totalAmount - discount + gst;
    setGrandTotal(finalTotal);
  };

  const handleQuantityChange = (id, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity,
              totalAmount: product.selectedProductId
                ? availableProducts.find(
                    (p) => p.id === product.selectedProductId
                  ).amount * quantity
                : 0,
            }
          : product
      )
    );
  };

  const handleProductChange = (id, productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              selectedProductId: productId,
              totalAmount:
                product.quantity *
                availableProducts.find((p) => p.id === productId).amount,
            }
          : product
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const addProduct = () => {
    const newId = products.length ? Math.max(products.map((p) => p.id)) + 1 : 1; // Ensure unique ID
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: newId,
        selectedProductId: null,
        quantity: 1,
        totalAmount: 0,
      },
    ]);
  };

  useEffect(() => {
    calculateGrandTotal(products);
  }, [products]);

  return {
    products,
    setProducts,
    grandTotal,
    handleQuantityChange,
    handleProductChange,
    removeProduct,
    addProduct,
    gstPercentage,
    discountPercentage,
  };
};

const FieldLevelValidationExample = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showStationaryTable, setShowStationaryTable] = useState(true);
  const [showCosmeticsTable, setShowCosmeticsTable] = useState(true);
  const [activeTab, setActiveTab] = useState("stationaryTable");

  const state = useSelector((state) => state.productReducer);

  const availableStationaryProducts = [
    { id: 1, name: "Brush Pen", amount: 280 },
    { id: 2, name: "Fountain Pen", amount: 140 },
    { id: 3, name: "Feather Pen", amount: 189 },
  ];

  const availableCosmeticProducts = [
    { id: 1, name: "Foundation", amount: 250 },
    { id: 2, name: "Cleanser", amount: 150 },
    { id: 3, name: "Lipstick", amount: 199 },
  ];

  const stationary = useProductManagement(availableStationaryProducts);
  const cosmetics = useProductManagement(availableCosmeticProducts);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    date: getTodayDate(),
    address: "",
    cosmetics: [],
    stationary: [],
    gstPercentage: 2,
    discountPercentage: 10,
  });

  const handleShowStationaryTable = (e) => {
    e.preventDefault();
    setShowStationaryTable((prevShowTable) => !prevShowTable);
  };

  const handleShowCosmeticsTable = (e) => {
    e.preventDefault();
    setShowCosmeticsTable((prevShowTable) => !prevShowTable);
  };

  useEffect(() => {
    if (state.obj) {
      setInitialValues({
        id: state.obj?.id,
        name: state.obj?.name || "",
        email: state.obj?.email || "",
        phoneNumber: state.obj?.phoneNumber || "",
        date: state.obj?.date || getTodayDate(),
        address: state.obj?.address || "",
        cosmetics: state.obj?.cosmetics || [],
        stationary: state.obj?.stationary || [],
      });

      // Patching cosmetics products
      if (state.obj.cosmetics && state.obj.cosmetics.length > 0) {
        const patchedCosmetics = state.obj.cosmetics.map((item) => ({
          id: item.productId,
          selectedProductId: item.productId,
          quantity: item.quantity,
          totalAmount: item.totalAmount,
        }));
        console.log("Patched Cosmetics:", patchedCosmetics);
        cosmetics.setProducts(patchedCosmetics); // Now this will work
      }

      if (state.obj.stationary && state.obj.stationary.length > 0) {
        const patchedStationary = state.obj.stationary.map((item) => ({
          id: item.productId,
          selectedProductId: item.productId,
          quantity: item.quantity,
          totalAmount: item.totalAmount,
        }));
        console.log("Patched Stationary:", patchedStationary);
        stationary.setProducts(patchedStationary); // Now this will work
      }
    }
  }, [state.obj]);

  const gstPercentage = 2;
  const discountPercentage = 10;

  const selectTab = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
  };

  const handleSubmit = (values) => {
    const hasSelectedStationaryProducts = stationary.products.some(
      (product) => product.selectedProductId !== null && product.quantity > 0
    );

    const hasSelectedCosmeticProducts = cosmetics.products.some(
      (product) => product.selectedProductId !== null && product.quantity > 0
    );

    if (!hasSelectedStationaryProducts && !hasSelectedCosmeticProducts) {
      toast.error("You must add at least one product to submit the form.", {
        theme: "dark",
      });
      return;
    }

    const grandTotalCosmetics = cosmetics.grandTotal;
    const grandTotalStationary = stationary.grandTotal;
    const discountCosmetics = (grandTotalCosmetics * 10) / 100;
    const discountStationary = (grandTotalStationary * 5) / 100;
    const gstCosmetics = ((grandTotalCosmetics - discountCosmetics) * 2) / 100;
    const gstStationary =
      ((grandTotalStationary - discountStationary) * 2) / 100;

    const formData = {
      ...values,
      grandTotalCosmetics,
      grandTotalStationary,
      discountCosmetics,
      discountStationary,
      gstCosmetics,
      gstStationary,
      cosmetics: cosmetics.products
        .filter((product) => product.selectedProductId)
        .map(({ selectedProductId, quantity }) => {
          const product = availableCosmeticProducts.find(
            (p) => p.id === selectedProductId
          );
          return {
            productId: selectedProductId,
            productName: product?.name,
            amount: product?.amount,
            quantity,
            totalAmount: product?.amount * quantity,
          };
        }),
      stationary: stationary.products
        .filter((product) => product.selectedProductId)
        .map(({ selectedProductId, quantity }) => {
          const product = availableStationaryProducts.find(
            (p) => p.id === selectedProductId
          );
          return {
            productId: selectedProductId,
            productName: product?.name,
            amount: product?.amount,
            quantity,
            totalAmount: product?.amount * quantity,
          };
        }),
    };

    if (state.obj?.id) {
      dispatch(editDataRequest(formData));
      toast.success("Edited successfully!");
    } else {
      dispatch(postDataRequest(formData));
      toast.success("Submitted successfully!");
    }

    navigate("/list", { state: formData });
  };

  return (
    <div className="container-fluid formBody">
      <h1 className="text-center">Sign Up</h1>
      <Formik
        className="formik"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => (
          <Form className="form w-75 mx-auto d-block   ">
            <div className="card formValues">
              <div className="row">
                <div className="col-6  ">
                  <label htmlFor="name">Name:</label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control "
                    id="name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div className="col-6">
                  <label htmlFor="email">E-mail:</label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="date">Date:</label>
                  <Field
                    name="date"
                    type="date"
                    id="date"
                    className="form-control"
                    readOnly
                  />
                  <ErrorMessage name="date" component="div" className="error" />
                </div>
              </div>

              <div className="row ">
                <div className="col-6 mx-auto d-block  ">
                  <label htmlFor="address">Address:</label>
                  <Field
                    name="address"
                    id="address"
                    type="text"
                    className="form-control "
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            </div>

            {/* Navbar Tabs */}
            <Navbar activeTab={activeTab} selectTab={selectTab} />

            {!showStationaryTable && (
              <button
                style={{
                  borderRadius: "5px",
                  border: "2px solid #1a97f3",
                  backgroundColor: "white",
                  color: "blue",
                }}
                onClick={handleShowStationaryTable}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#0096c7";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#0096c7";
                }}
              >
                Add Stationary Table
              </button>
            )}

            {activeTab === "stationaryTable" && showStationaryTable && (
              <ProductTable
                // products={stationaryProducts}
                products={stationary.products}
                availableProducts={availableStationaryProducts}
                handleProductChange={stationary.handleProductChange}
                handleQuantityChange={stationary.handleQuantityChange}
                removeProduct={stationary.removeProduct}
                type="stationary"
                showTable={showStationaryTable}
                handleShowTable={handleShowStationaryTable}
                addProduct={stationary.addProduct}
                grandTotal={stationary.grandTotal}
                discountPercentage={discountPercentage}
                gstPercentage={gstPercentage}
              />
            )}

            {!showCosmeticsTable && (
              <button
                style={{
                  borderRadius: "5px",
                  border: "2px solid #1a97f3",
                  backgroundColor: "white",
                  color: "blue",
                }}
                onClick={handleShowCosmeticsTable}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#0096c7";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#0096c7";
                }}
              >
                Add Cosmetics Table
              </button>
            )}

            {activeTab === "cosmeticsTable" && showCosmeticsTable && (
              <ProductTable
                // products={cosmeticsProducts}
                products={cosmetics.products}
                availableProducts={availableCosmeticProducts}
                handleProductChange={cosmetics.handleProductChange}
                handleQuantityChange={cosmetics.handleQuantityChange}
                removeProduct={cosmetics.removeProduct}
                type="cosmetics"
                showTable={showCosmeticsTable}
                handleShowTable={handleShowCosmeticsTable}
                addProduct={cosmetics.addProduct}
                grandTotal={cosmetics.grandTotal}
                discountPercentage={discountPercentage}
                gstPercentage={gstPercentage}
              />
            )}

            <div className="submitbtn mt-3">
              <button
                type="submit"
                className="my-3 mx-auto d-block btn btn-white "
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
                {state.obj ? "Update" : "Submit"} Form
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FieldLevelValidationExample;
