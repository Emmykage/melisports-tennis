import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { IoClose, IoGridOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getProduct,
  getProducts,
  searchedProducts,
  updateProduct,
} from "../../../redux/actions/product";
import Search from "../../../components/search/Search";
import AdminProductCard from "../../../components/card/AdminProductCard";
import AppLoader from "../../../components/loader/AppLoader";
import ProdDelModal from "../../../components/modal/ProdDelModal";
import { nairaFormat } from "../../../utils/nairaFormat";
import StatusButton from "../../../components/buttons/StatusButton";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    products,
    searched_products,
    message,
    error,
    loading,
    searchLoading,
  } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const timeoutRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    products.length === 0 && dispatch(getProducts());
  }, []);

  const toEdit = (id) => {
    dispatch(getProduct(id));
    navigate(`/admin/edit/${id}`);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\s+/g, " ");
    setSearch(cleanedValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(searchedProducts({ search: cleanedValue }));
    }, 500);
  };

  const handleSubmit = (formData) => {
    dispatch(updateProduct({ editId: selectedProduct.id, formData }))
      .unwrap()
      .then(() => {
        setOpenUpdateModal(false);
        setSelectedProduct(null);
        dispatch(getProducts());
      });
  };

  const filteredProduct =
    searched_products.length > 0 ? searched_products : products;

  if (!error) {
    return (
      <>
        <ProdDelModal
          open={openDelModal}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          onCancel={() => setSelectedProduct(null)}
        />

        <div className="relative">
          <div className=" flex sticky justify-between top-0 z-40 bg-white">
            <h2 className="font-normal text-lg text-gray-800 mb-4">Products</h2>
            <div className="flex-1 max-w-lg gap-4  flex items-center">
              <div className="flex flex-nowrap gap-2">
                <button
                  onClick={() => setView("list")}
                  className={`${view === "list" ? "bg-primary" : "bg-gray-300 "} rounded p-2`}
                >
                  <CiBoxList
                    className={`${view === "list" ? "text-white" : "text-gray-800 "} text-lg`}
                  />
                </button>{" "}
                <button
                  onClick={() => setView("grid")}
                  className={`${view === "grid" ? "bg-primary" : "bg-gray-300 "} rounded p-2`}
                >
                  <IoGridOutline
                    className={`${view === "grid" ? "text-white" : "text-gray-800 "} text-lg`}
                  />
                </button>
              </div>

              <Search
                search={search}
                className="flex-1"
                setSearch={setSearch}
                handleSearch={handleSearch}
              />
            </div>
          </div>

          {loading ? (
            <AppLoader />
          ) : products.length < 1 ? (
            <div>
              <header>
                <h1 className="warning-center">
                  {" "}
                  Please Add some products to your collection
                </h1>
              </header>
            </div>
          ) : view === "grid" ? (
            <div className="w-full ">
              <div className="w-full grid py-10  grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 my-6">
                {filteredProduct.map((product) => (
                  <AdminProductCard
                    product={product}
                    key={product.id}
                    toEdit={toEdit}
                    setSelectedProduct={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className=" rounded-lg my-10 border border-gray-200">
              <table className="min-w-full text-sm text-left text-gray-600">
                {/* Head */}
                <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3">Last Updated</th>
                    <th className="px-4 text-center  py-3">Status</th>
                    <th className="px-4 py-3 text-right sr-only">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-gray-200">
                  {filteredProduct.map((product, index) => (
                    <tr
                      key={product?.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="px-4 py-3 text-gray-500">{index + 1}</td>

                      <td className="px-4 py-3 capitalize font-medium text-gray-800">
                        {product?.name}
                      </td>

                      <td className="px-4 py-3 text-left font-semibold text-gray-800">
                        {nairaFormat(product?.price)}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {product?.last_updated}
                      </td>

                      <td className="px-4 py-3">
                        <StatusButton status={product?.status} />
                      </td>

                      <td className="px-4 py-3 text-right relative">
                        <button
                          onClick={() => setSelectedRow(product.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                        >
                          <BsThreeDotsVertical />{" "}
                        </button>
                        {product.id === selectedRow && (
                          <DropdownOptions
                            toEdit={toEdit}
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                            product={product}
                            setSelectedProduct={setSelectedProduct}
                            openDelModal={openDelModal}
                            openUpdateModal={openUpdateModal}
                            setOpenViewModal={setOpenViewModal}
                            setOpenUpdateModal={setOpenUpdateModal}
                            setSelectedRow={setSelectedRow}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <UpdatePriceModal
          onUpdate={handleSubmit}
          open={openUpdateModal}
          product={selectedProduct}
          onClose={() => setOpenUpdateModal(false)}
        />
        <QuickProductViewModal
          open={openViewModal}
          onClose={() => setOpenViewModal(false)}
          product={selectedProduct}
        />
      </>
    );
  }

  return (
    <div>
      <h2> {message}</h2>
    </div>
  );
};

const DropdownOptions = ({
  selectedRow,
  setSelectedRow,
  setSelectedProduct,
  product,
  setOpenUpdateModal,
  setOpenViewModal,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => setSelectedRow(null)}
        className="fixed  z-50 h-screen w-screen top-0 left-0 bg-gray-800/40 block "
      >
        {" "}
      </div>

      <div className="absolute top-0 right-full mr-2 bg-white p-2 border z-50 shadow-sm rounded-md min-w-[150px]">
        <ul className="text-left">
          <li
            onClick={() => {
              setSelectedProduct(product);
              setOpenViewModal(true);

              setSelectedRow(null);
            }}
            className="cursor-pointer hover:bg-gray-200 text-sm p-2"
          >
            Views
          </li>
          <li
            onClick={() => {
              setSelectedProduct(product);
              setOpenUpdateModal(true);

              setSelectedRow(null);
            }}
            className="cursor-pointer hover:bg-gray-200 text-sm p-2"
          >
            Update Price
          </li>
          <li
            className="cursor-pointer hover:bg-gray-200 text-sm p-2"
            onClick={() => navigate(`/admin/edit/${product?.id}`)}
          >
            Edit
          </li>
        </ul>
      </div>
    </>
  );
};

const UpdatePriceModal = ({ open, onClose, product, onUpdate, loading }) => {
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (product?.price) {
      setPrice(product.price);
    }
  }, [product]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product[price]", price);

    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Update Product Price
            </h2>

            <p className="text-sm text-gray-500">
              Change the current product price
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              value={product?.name || ""}
              disabled
              className="w-full rounded-lg border bg-gray-100 px-4 py-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-2 flex justify-between block text-sm font-medium text-gray-700">
              <span>New Price </span>

              <span>{nairaFormat(price)}</span>
            </label>

            <input
              type="text"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                const onlyNumbers = value.replace(/[^0-9]/g, "");

                setPrice(onlyNumbers);
              }}
              placeholder="Enter new price"
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Price"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const QuickProductViewModal = ({ open, onClose, product }) => {
  if (!open || !product) return null;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-normal text-gray-800">Product Preview</h2>

          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="grid gap-8 p-6 md:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl border bg-gray-50">
            <img
              src={product?.photo_urls[0]}
              alt={product?.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold capitalize text-gray-900">
                {product?.name}
              </h1>

              <p className="mt-2 text-sm text-gray-500">{product?.category}</p>
            </div>

            <div className="text-3xl font-bold text-primary">
              {nairaFormat(product?.price)}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-normal text-gray-700">
                Description
              </h3>

              <div
                className="prose prose-gray px-2 rounded-lg p-1 h-20 border overflow-auto max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description_body }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Stock</p>

                <h4 className="mt-1 text-lg font-semibold">
                  {product?.product_quantity || 0}
                </h4>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-500">Status</p>

                <h4 className="mt-1 text-lg font-semibold capitalize">
                  {product?.status}
                </h4>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-100"
              >
                Close
              </button>

              <button
                onClick={() => navigate(`/admin/edit/${product?.id}`)}
                className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
