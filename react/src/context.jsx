import React, { useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [jobCategories, setJobCategories] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState({
        title: "",
        description: "",
        category: "",
    });

    return (
        <AppContext.Provider
            value={{ jobCategories, setJobCategories, jobs, setJobs, filter, setFilter }}
        >
            {children}
        </AppContext.Provider>
    );
};
