import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
    const { id } = useParams();
    const [job, setJob] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/job/${id}`)
            .then((res) => {
                setJob(res.data);
            })
            .catch((err) => {
                toast("Please select a file");
                console.log(err);
            });
    }, []);

    const apply = (e) => {
        e.preventDefault();
        console.log(e.target.file.files[0]);
        const formData = new FormData();
        formData.append("file", e.target.file.files[0]);
        formData.append("jobId", id);

        axios
            .post(`http://localhost:8000/api/job/${id}/cv`, formData)
            .then((res) => {
                console.log(res.data);
                toast("Apply was successful");
            })
            .catch((err) => {
                toast("Please select a file for CV");
                console.log(err);
            });
    };

    return (
        <>
            {!job ? (
                <Loading />
            ) : (
                <>
                    <div className="container container-card">
                        <div class="card">
                            <h5 class="card-header">{job.category}</h5>
                            <div class="card-body">
                                <h5 class="card-title">{job.title}</h5>
                                <p class="card-text">{job.description}</p>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <a href="#" class="btn btn-primary">
                                        Apply
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={apply}
                        id="modal"
                        encType="multipart/form-data"
                    >
                        <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1
                                            class="modal-title fs-5"
                                            id="exampleModalLabel"
                                        >
                                            Apply with CV
                                        </h1>
                                        <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <input
                                                class="form-control"
                                                type="file"
                                                id="formFile"
                                                name="file"
                                            />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ToastContainer />
                </>
            )}
        </>
    );
}
