import {createBrowserRouter } from "react-router-dom";
import Signup from "../components/Signup.jsx";
import Accounts from "../components/SettlementAccounts.jsx"
import AddAccount from "../components/AddAccount.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Signup />,
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