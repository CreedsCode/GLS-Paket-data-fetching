import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireApiKey({ children }: { children: JSX.Element }) {
    // let { user } = useAuth();
    let location = useLocation();
    const apiSecret = localStorage.getItem("secret");
    if (!apiSecret) {
        return <Navigate to="/setup" state={{ from: location }} replace />;
    } else {
        return children;
    }
}
