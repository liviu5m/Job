import React from "react";
import Header from "../home/components/Header";
import axios from "axios";
import { updateLocalStorage } from "../../default";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
    const user = JSON.parse(localStorage.getItem("user"));

    const updateUser = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/profile/edit_data", {
                id: user.id,
                username: e.target.username.value,
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                address: e.target.address.value,
            })
            .then((res) => {
                toast("Profile data updated !");
                updateLocalStorage();
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updatePassword = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/profile/edit_password", {
                id: user.id,
                current_password: e.target.current_password.value,
                password: e.target.password.value,
                password_confirmation: e.target.password_confirmation.value,
            })
            .then((res) => {
                toast("Password updated !");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        e.target.current_password.value = "";
        e.target.password.value = "";
        e.target.password_confirmation.value = "";
    };

    return (
        <>
            <div className="container profile">
                <div className="profile-info-edit">
                    <h2>Modify Profile Data</h2>
                    <form onSubmit={updateUser} method="POST">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                defaultValue={user.username}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                defaultValue={user.first_name}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                defaultValue={user.last_name}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                defaultValue={user.email}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                defaultValue={user.phone}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                defaultValue={user.address}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Edit
                        </button>
                    </form>
                </div>
                <div className="profile-password-edit">
                    <h2>Modify Profile Password</h2>
                    <form method="POST" onSubmit={updatePassword}>
                        <div className="mb-3">
                            <label
                                htmlFor="current_password"
                                className="form-label"
                            >
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="current_password"
                                name="current_password"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password_confirmation"
                                className="form-label"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password_confirmation"
                                name="password_confirmation"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Edit
                        </button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
