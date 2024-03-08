import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Page";
import Login from "./pages/login/Page";
import Signup from "./pages/signup/Page";
import Profile from "./pages/profile/Page";
import Logout from "./pages/logout/Page";
import CreateJob from "./pages/createJob/Page";
import LatestJobs from "./pages/latestsJobs/Page";
import Job from "./pages/job/Page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/create_job",
                element: <CreateJob />,
            },
            {
                path: "/",
                element: <LatestJobs />,
            },
            {
                path: "/job/list",
                element: <LatestJobs />,
            },
            {
                path: "/job/list",
                element: <LatestJobs />,
            },
            {
                path: "/job/:id",
                element: <Job />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);

export default router;
