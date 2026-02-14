import {createBrowserRouter } from "react-router-dom";
import Authentication from "../components/Authentication.jsx";
import Dashboard from "../components/SettlementAccounts.jsx"
import AddAccount from "../components/AddAccount.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/accounts/add",
        element: <AddAccount />,
    }
])

export default router;