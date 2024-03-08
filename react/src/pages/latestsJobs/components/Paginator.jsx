import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../context";

export default function Paginator() {
    const { setJobs, jobs, filter } = useContext(AppContext);
    const data = jobs;
    let links = [];

    const updateJobList = (e) => {
        e.preventDefault();
        axios
            .get(e.target.href, {
                params: filter,
            })
            .then((response) => {
                setJobs(response.data.jobs);
            });
    };

    for (let i = 1; i <= data.last_page; i++) {
        links.push(
            <li key={i} className="page-item">
                <a
                    className="page-link"
                    href={data.links[i].url}
                    onClick={updateJobList}
                >
                    {i}
                </a>
            </li>
        );
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <button
                        className="page-btn"
                        disabled={data.links[0].url == null ? "disabled" : ""}
                    >
                        <a
                            className="page-link"
                            href={data.links[0].url}
                            onClick={updateJobList}
                        >
                            Previous
                        </a>
                    </button>
                </li>
                {links}
                <li className="page-item">
                    <button
                        className="page-btn"
                        disabled={data.links[data.last_page+1].url == null ? "disabled" : ""}
                    >
                        <a
                            className="page-link"
                            href={data.links[data.last_page + 1].url}
                            onClick={updateJobList}
                        >
                            Previous
                        </a>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
