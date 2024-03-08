import React from "react";
import { Navigate } from "react-router-dom";

export default function Page() {
    localStorage.removeItem("user");
    return <Navigate to="/login" />;
}
