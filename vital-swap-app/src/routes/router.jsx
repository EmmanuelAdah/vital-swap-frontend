import {createBrowserRouter } from "react-router-dom";
import Authentication from "../components/Authentication.jsx";
import Accounts from "../components/SettlementAccounts.jsx"
import AddAccount from "../components/AddAccount.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication />,
    },
    {
        path: "/accounts",
        element: <Accounts />,
    },
    {
        path: "/accounts/add",
        element: <AddAccount />,
    }
])

export default router;