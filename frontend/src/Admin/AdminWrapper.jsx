import React from "react";
import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
  return (
    <div style={{ marginTop: "2rem" }}>
      {/* <h1>Admin</h1> */}
      <Outlet />
    </div>
  );
};

export default AdminWrapper;
