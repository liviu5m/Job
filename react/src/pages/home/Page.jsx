import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import "../../main.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { AppContext } from "../../context";
import { Outlet } from "react-router-dom";

export default function Home() {
    const { user, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get("http://localhost:5173/")
            .then((response) => {
                // if (!localStorage.getItem("user")) window.location = "/login";
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Header />
                    <Outlet />
                </div>
            )}
            <ToastContainer />
        </>
    );
}
