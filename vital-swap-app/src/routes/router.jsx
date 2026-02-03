import {createBrowserRouter } from "react-router-dom";
import Signup from "../components/Signup.jsx";
import Accounts from "../components/SettlementAccounts.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Signup />,
    },
    {
        path: "/accounts",
        element: <Accounts />,
    }
])

export default router;