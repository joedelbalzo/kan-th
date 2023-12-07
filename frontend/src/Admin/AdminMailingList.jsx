//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports

//Store Imports
import { fetchMailingList } from "../store";

//Component Style Imports
import "./AdminStyles.css";
import AdminNav from "./AdminNav";

const AdminMailingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  if (!auth.id) {
    return null;
  }

  useEffect(() => {
    async function fetchListAndSetState() {
      try {
        const response = await dispatch(fetchMailingList());
        setList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mailing list:", error);
        setLoading(false);
      }
    }
    fetchListAndSetState();
  }, []);

  loading == false ? console.log("list", list) : null;

  return (
    <div>
      <AdminNav />
      <Link to="/admin" className="image-upload-buttons">
        {" "}
        &larr; Back
      </Link>
      <h3 className="admin-header">Email List of People who are interested. Joe, sort this by most recent.</h3>
      <div>
        <ul>
          {" "}
          {list.map((user) => {
            return <li key={user.id}>{user.email}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminMailingList;
