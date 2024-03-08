import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { AppContext } from "../../context";

export default function Page() {
    const { user, setUser } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get("http://localhost:5173/signup")
            .then((response) => {
                // if (localStorage.getItem("user")) window.location = "/";

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/signup", {
                username: e.target.username.value,
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                password_confirmation: e.target.password_confirmation.value,
                phone: e.target.phone.value,
                address: e.target.address.value,
            })
            .then((response) => {
                window.location = "/login";
                console.log(response.data);
            })
            .catch((error) => {
                toast("Invalid data inserted !");
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
                        <Typography variant="h3">Register</Typography>
                        <form onSubmit={handleSubmit} method="POST">
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
                                        label="First Name"
                                        type="text"
                                        name="first_name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Last Name"
                                        type="text"
                                        name="last_name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Email"
                                        type="email"
                                        name="email"
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
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Confirm Password"
                                        type="password"
                                        name="password_confirmation"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Phone"
                                        type="text"
                                        name="phone"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Address"
                                        type="text"
                                        name="address"
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
                                    <Link to="/login">
                                        Already have an account ? Login !
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                    <ToastContainer />
                </div>
            )}
            <ToastContainer />
        </>
    );
}
