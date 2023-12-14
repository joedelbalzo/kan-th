//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports

//Store Imports
import { fetchUsers } from "../store";

//Component Style Imports
import "./AdminStyles.css";
import AdminNav from "./AdminNav";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  if (!auth.id) {
    return null;
  }

  useEffect(() => {
    async function fetchUsersAndSetState() {
      try {
        const response = await dispatch(fetchUsers());
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    }
    fetchUsersAndSetState();
  }, []);

  loading == false ? console.log("USERS", users) : null;

  return (
    <div>
      <Link to="/admin" className="image-upload-buttons">
        {" "}
        &larr; Back
      </Link>
      <h3 className="admin-header">Here's the list of Users</h3>
      {users.map((user) => {
        return (
          <div>
            <ul>
              <li key={user.id}>Username: {user.username}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
