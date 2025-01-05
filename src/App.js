import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateAccount from "./routes/create-account";
import Login from "./routes/login";
import Home from "./routes/Home";
import TodayDone from "./routes/TodayDone";
import NotYet from "./routes/NotYet";
import MyState from "./routes/MyState";
import PrivateRoute from "./components/PrivateRoute";
import CheckOtherDay from "./routes/CheckOtherDay";
import OtherDayDone from "./routes/OtherDayDone";
import Statistics from "./routes/Statistics";
import Admin from "./routes/Admin";
import BibleTracker from "./routes/BibleTracker";


function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoute element={<Home />} />,
        },
        {
            path: "/todayDoen",
            element: <PrivateRoute element={<TodayDone />} />,
        },
        {
            path: "/notyet",
            element: <PrivateRoute element={<NotYet />} />,
        },
        {
            path: "/myState",
            element: <PrivateRoute element={<MyState />} />,
        },
        {
            path: "/checkOtherDay",
            element: <PrivateRoute element={<CheckOtherDay />} />,
        },
        {
            path: "/otherDayDone",
            element: <PrivateRoute element={<OtherDayDone />} />,
        },
        {
            path: "/statistics",
            element: <PrivateRoute element={<Statistics />} />,
        },
        {
            path: "/bibleTracker",
            element : <BibleTracker/>

        },
        {
            path: "/create-account",
            element: <CreateAccount />,
        },
        {
            path: "/login",
            element: <Login />,
        },

        {
            path:"/admin",
            element:<PrivateRoute element={<Admin />} />
        }

    ]);

    return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
