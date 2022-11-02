import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () => {
    const [authenticated, setAuthenticated] = useState<string | null>(null);

    useEffect(() => {
        const apiSecret = localStorage.getItem("secret");
        if (apiSecret) {
            setAuthenticated(apiSecret);
        }
    }, []);

    return (
        <>
            <h1>aUTHED </h1>
        </>
    );
};

export default Home;
