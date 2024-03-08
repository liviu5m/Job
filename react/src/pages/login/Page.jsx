import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { AppContext } from "../../context";

export default function Page() {
    let { user, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    window.onload = function () {
        // if (user.email != "") window.location = "/";

        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/login", {
                username: e.target.username.value,
                password: e.target.password.value,
            })
            .then(({ data }) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        id: data.user.id,
                        username: data.user.username,
                        first_name: data.user.first_name,
                        last_name: data.user.last_name,
                        email: data.user.email,
                        phone: data.user.phone,
                        address: data.user.address,
                    })
                );
                window.location = "/";
            })
            .catch((error) => {
                toast("Wrong credentials !");
                console.log("Error:", error);
            });
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="login-container">
                    <Container maxWidth="sm">
                        <Typography variant="h3">Login</Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Username"
                                        name="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Password"
                                        type="password"
                                        name="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                    <Link to="/signup">
                                        Don't have an account ? Create One !
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                        <ToastContainer />
                    </Container>
                </div>
            )}
            <ToastContainer />
        </>
    );
}
