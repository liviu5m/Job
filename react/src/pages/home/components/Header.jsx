import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

export default function Header() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <AppBar position="static">
            <Toolbar className="header__toolbar">
                <Typography variant="h6">
                    <Link to="/">
                        J<span className="logo-design">obs</span>
                    </Link>
                </Typography>
                <div>
                    <Button color="inherit">
                        <Link className="link-icon" to="/create_job">
                            <i className="fa-solid fa-plus"></i>
                            <span>Add A Job</span>
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/job/list">Jobs List</Link>
                    </Button>
                    {user ? (
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {user.username}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link to="/profile">
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                        >
                                            Profile
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/logout">
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                        >
                                            Logout
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Button color="inherit">
                                <Link to="/login">Log in</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/signup">Sign up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}
