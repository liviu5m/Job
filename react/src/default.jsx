import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "./context";

export const updateLocalStorage = () => {
    const id = JSON.parse(localStorage.getItem("user")).id;

    axios
        .get("http://localhost:8000/api/get_user", {
            params: {
                id,
            },
        })
        .then(({ data }) => {
            console.log(data);
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
        });
};

export function getAllCategories() {
    const { jobCategories, setJobCategories } = useContext(AppContext);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/get_categories")
            .then(({ data: { categories } }) => {
                setJobCategories(categories);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
}

export function getAllJobs() {
    const { jobs, setJobs, filter } = useContext(AppContext);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/jobs/get", {
                params: filter,
            })
            .then(({ data }) => {
                setJobs(data.jobs);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [filter]);
}
