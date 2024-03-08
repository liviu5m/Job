import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { getAllCategories } from "../../../default";
import axios from "axios";

export default function Filter() {
    const { jobCategories, setJobs, setFilter, filter } = useContext(AppContext);

    const getCategories = () => {
        getAllCategories();
    };

    getCategories();
    const categoriesOptions = jobCategories.map((category) => {
        return (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        );
    });

    const filterOptions = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    // useEffect(() => {
    //     if (
    //         filter.title != "" ||
    //         filter.description != "" ||
    //         filter.category != ""
    //     ) {
    //         axios
    //             .post("http://localhost:8000/api/job/filter", filter)
    //             .then((res) => {
    //                 setJobs(res.data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }, [filter]);

    return (
        <aside>
            <h3>Filter</h3>
            <form onChange={filterOptions}>
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
                    <select name="category" className="form-select">
                        <option value="">Select Category...</option>
                        {categoriesOptions}
                    </select>
                </div>
            </form>
        </aside>
    );
}
