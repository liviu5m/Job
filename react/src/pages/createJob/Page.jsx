import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "../../default.jsx";
import { AppContext } from "../../context.jsx";
import axios from "axios";

export default function Page() {
    const { jobCategories } = useContext(AppContext);

    if (!localStorage.getItem("user")) window.location = "/login";

    const getCategories = () => {
        getAllCategories();
    };

    getCategories();

    const categoriesOptions = jobCategories.map((category) => {
        return <option value={category.id}>{category.name}</option>;
    });

    const createJob = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/job/create", {
                title: e.target.title.value,
                description: e.target.description.value,
                city: e.target.city.value,
                category: e.target.category.value,
                user_id: JSON.parse(localStorage.getItem("user")).id,
            })
            .then(({ data }) => {
                toast("Job created successfull !");
                e.target.title.value = "";
                e.target.description.value = "";
                e.target.city.value = "";
                e.target.category.value = "";
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container profile">
            <div className="profile-info-edit">
                <h2>Create A Job</h2>
                <form onSubmit={createJob}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                            City
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                        />
                    </div>
                    <div className="mb-3">
                        <select name="category" class="form-select">
                            <option value="" selected>
                                Select Category...
                            </option>
                            {categoriesOptions}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
