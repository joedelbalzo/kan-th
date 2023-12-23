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
import { readableDate } from "../Components/functions";
import Loading from "../assets/Loading";

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
        if (response.status == 200) {
          setLoading(false);
        }
      } catch (error) {
        return null;
      }
    }
    fetchUsersAndSetState();
  }, []);

  loading == false ? console.log("users loaded") : null;

  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedField, setSortedField] = useState(null);

  useEffect(() => {
    setSortedUsers(users);
  }, [users]);

  const sortData = (field) => {
    const sorted = [...sortedUsers].sort((a, b) => {
      let valA = a[field] || "";
      let valB = b[field] || "";

      if (field === "createdAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      // Compare values
      if (valA < valB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valA > valB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedUsers(sorted);
    setSortedField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const renderSortIndicator = (field) => {
    if (sortedField === field) {
      return sortOrder === "asc" ? " ▲" : " ▼";
    }
    return "";
  };

  const renderCell = (user, field) => user[field] || "No Input";

  const styles = {
    header: {
      fontSize: "16px",
      borderBottom: "2px solid #183333",
      padding: 10,
      borderRight: "1px solid gray",
    },
    fields: {
      fontSize: "14px",
      borderBottom: "1px solid grey",
      padding: 10,
      borderRight: "1px solid gray",
      wordWrap: "normal",
    },
  };

  return (
    <div style={{ overflow: "auto" }}>
      <AdminNav />
      <Link to="/admin" className="image-upload-buttons">
        {" "}
        &larr; Back{" "}
      </Link>
      <h3 className="admin-header">Here's the list of Users</h3>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <div style={{ overflowX: "auto" }}>
          {loading && <Loading />}
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={styles.header} onClick={() => sortData("username")}>
                  Username {renderSortIndicator("username")}
                </th>
                <th style={styles.header} onClick={() => sortData("firstName")}>
                  First Name {renderSortIndicator("firstName")}
                </th>
                <th style={styles.header} onClick={() => sortData("lastName")}>
                  Last Name {renderSortIndicator("lastName")}
                </th>
                <th style={styles.header} onClick={() => sortData("email")}>
                  Email {renderSortIndicator("email")}
                </th>
                <th style={styles.header} onClick={() => sortData("businessName")}>
                  Business Name {renderSortIndicator("businessName")}
                </th>
                <th style={{ borderBottom: "2px solid black", padding: 10 }} onClick={() => sortData("createdAt")}>
                  Created On {renderSortIndicator("createdAt")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.fields}>{renderCell(user, "username")}</td>
                  <td style={styles.fields}>{renderCell(user, "firstName")}</td>
                  <td style={styles.fields}>{renderCell(user, "lastName")}</td>
                  <td style={styles.fields}>{renderCell(user, "email")}</td>
                  <td style={styles.fields}>{renderCell(user, "businessName")}</td>
                  <td style={styles.fields}>{readableDate(renderCell(user, "createdAt"))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
