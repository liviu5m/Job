import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { getAllJobs } from "../../default";
import Paginator from "./components/Paginator";
import Filter from "./components/Filter";

export default function LatestJobs() {
    const { jobs, filter } = useContext(AppContext);

    getAllJobs();

    const { data } = jobs;

    const jobsContainer = data
        ? data.map((job) => {
              return (
                  <div key={job.id} className="card">
                      <div className="card-body">
                          <h5 className="card-title">{job.title}</h5>
                          <h6 className="card-subtitle mb-2 text-body-secondary">
                              Category: {job.category}
                          </h6>
                          <p className="card-text">{job.description}</p>
                          <h5 className="card-title">City: {job.city}</h5>
                      </div>
                      <a className="btn btn-primary" href={`/job/${job.id}`} role="button">
                          <span>Open Page</span>
                          <i className="fa-solid fa-location-arrow"></i>
                      </a>
                  </div>
              );
          })
        : "";
    return (
        <div className="container jobs-home-page">
            <Filter />
            {data ? (
                <div>
                    <h1>Latest Jobs</h1>
                    <div className="jobs-container">{jobsContainer}</div>
                    <Paginator data={jobs} />
                </div>
            ) : (
                "No Jobs Found"
            )}
        </div>
    );
}
