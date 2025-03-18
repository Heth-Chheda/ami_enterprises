import { getUserInformation } from "@/store/slices/authenticationSlice";
import { getProductById } from "@/store/slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = ({ type }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.authentication.user);
  const product = useSelector((state) => state.product.product);

  useEffect(() => {
    if (type === "user") {
      dispatch(getUserInformation(id));
    } else if (type === "product") {
      dispatch(getProductById(id));
    }
  }, [dispatch, id, type]);

  useEffect(() => {
    if (type === "user" && user) {
      setFormData(user);
    } else if (type === "product" && product) {
      setFormData(product);
    }
  }, [user, product, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if (type === "user") {
    //   await dispatch(updateUser({ id, data: formData }));
    // } else if (type === "product") {
    //   await dispatch(updateProduct({ id, data: formData }));
    // }
    navigate("/dashboard"); // ✅ Redirect after updating
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Edit {type === "user" ? "User" : "Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPage;
