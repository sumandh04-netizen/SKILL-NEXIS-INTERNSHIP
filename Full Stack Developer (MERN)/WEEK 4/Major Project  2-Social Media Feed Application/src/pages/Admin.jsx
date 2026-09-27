import { useEffect, useState } from "react";
import api from "../services/api";

export default function Admin() {
    const [data, setData] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAdminData = async () => {
            try {
                setLoading(true);
                setError("");

                const [dashboardResponse, usersResponse] = await Promise.all([
                    api.get("/admin"),
                    api.get("/admin/users"),
                ]);

                setData(dashboardResponse.data.data);
                setUsers(usersResponse.data.data || []);
            } catch (err) {
                console.error("Failed to load admin dashboard:", err);

                setError(
                    err.response?.data?.message ||
                        "Unable to load the admin dashboard."
                );
            } finally {
                setLoading(false);
            }
        };

        loadAdminData();
    }, []);

    const handleToggleStatus = async (user) => {
        try {
            const status =
                user.status === "suspended" ? "active" : "suspended";

            await api.put(`/admin/users/${user._id}`, {
                status,
            });

            setUsers((currentUsers) =>
                currentUsers.map((item) =>
                    item._id === user._id
                        ? {
                              ...item,
                              status,
                          }
                        : item
                )
            );
        } catch (err) {
            console.error("Failed to update user status:", err);

            setError(
                err.response?.data?.message ||
                    "Unable to update the user's status."
            );
        }
    };

    if (loading) {
        return (
            <div className="page-loader">
                Loading admin dashboard…
            </div>
        );
    }

    if (error) {
        return (
            <section className="page-section">
                <div className="card">
                    <h2>Admin Dashboard</h2>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    if (!data) {
        return (
            <section className="page-section">
                <div className="card">
                    <h2>No dashboard data</h2>
                    <p>
                        The admin dashboard did not return any data.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="page-section">
            <div className="page-heading">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>
                        Manage users, content, reports and platform
                        activity.
                    </p>
                </div>
            </div>

            <div className="metrics-grid">
                <div className="metric card">
                    <span>Total Users</span>
                    <b>{data.users ?? 0}</b>
                </div>

                <div className="metric card">
                    <span>Posts</span>
                    <b>{data.posts ?? 0}</b>
                </div>

                <div className="metric card">
                    <span>Open Reports</span>
                    <b>{data.reports ?? 0}</b>
                </div>
            </div>

            <div className="card table-card">
                <h3>Users</h3>

                {users.length === 0 ? (
                    <div className="empty-state">
                        <p>No users found.</p>
                    </div>
                ) : (
                    users.map((user) => (
                        <div
                            className="table-row"
                            key={user._id}
                        >
                            <div>
                                <b>
                                    {user.fullName || "Unknown User"}
                                </b>

                                <span>
                                    @{user.username || "unknown"}
                                </span>
                            </div>

                            <span>
                                {user.role || "user"}
                            </span>

                            <span
                                className={
                                    user.status === "active"
                                        ? "status ok"
                                        : "status"
                                }
                            >
                                {user.status || "unknown"}
                            </span>

                            <button
                                type="button"
                                className="outline-btn"
                                onClick={() =>
                                    handleToggleStatus(user)
                                }
                            >
                                {user.status === "suspended"
                                    ? "Restore"
                                    : "Suspend"}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}