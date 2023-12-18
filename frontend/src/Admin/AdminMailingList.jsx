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
import { readableDate } from "../Components/functions";

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
    console.log(list);
  }, []);

  if (!list) {
    return null;
  }

  loading == false ? console.log("emails all loaded", list) : null;

  const copyEmails = () => {
    const emails = list.map((user) => {
      return user.email;
    });
    navigator.clipboard.writeText(emails);
  };

  return (
    <div>
      <AdminNav />
      <Link to="/admin" className="image-upload-buttons">
        {" "}
        &larr; Back
      </Link>
      <h3 className="admin-header">List of Mailing List Emails</h3>

      {list && (
        <div style={{ fontSize: "12px", width: "80%", margin: "auto", textAlign: "center" }}>
          Right now, there are {list.length} emails on your list.
        </div>
      )}
      <button onClick={copyEmails} className="login-button" id="copy-to-clipboard" style={{ fontSize: "14px", height: "36px" }}>
        Copy All Emails to Clipboard
      </button>
      <div>
        <ul>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ gridColumn: "1", textDecoration: "underline" }}> Email Address: </div>
            <div style={{ gridColumn: "2", textDecoration: "underline" }}>Join Date:</div>
          </div>
          {list.map((user) => {
            return (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", lineHeight: "28px" }}>
                <div style={{ gridColumn: "1" }}> {user.email} </div>
                <div style={{ gridColumn: "2" }}>{readableDate(user.createdAt)}</div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminMailingList;
