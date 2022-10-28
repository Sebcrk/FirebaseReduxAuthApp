import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./hoc/ProtectedRoute";

import RedirectAuthUser from "./hoc/RedirectAuthUser";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Counter from "./routes/counter/Counter";
import SignIn from "./routes/SignIn/SignIn";
import ResetPassword from "./routes/ResetPassword";

const UserProfile = lazy(() => import("./routes/UserProfile"));
const Validation = lazy(() => import("./routes/Validation"));
const Dashboard = lazy(() => import("./routes/Dashboard"));
const Schedule = lazy(() => import("./routes/Guests/Schedule"));
const Reports = lazy(() => import("./routes/Guests/Reports"));
const SearchGuest = lazy(() => import("./routes/Guests/SearchGuest"));
const AddUser = lazy(() => import("./routes/Admin/AddUser"));
const DeleteUser = lazy(() => import("./routes/Admin/DeleteUser"));
const EditUser = lazy(() => import("./routes/Admin/EditUser"));
const SearchUser = lazy(() => import("./routes/Admin/SearchUser"));
const BanGuests = lazy(() => import("./routes/Admin/BanGuests"));
const NotFound = lazy(() => import("./routes/NotFound"));

const routesArray = [
  { url: "/", comp: Dashboard, protected: true },
  { url: "profile", comp: UserProfile, protected: true },
  { url: "validation", comp: Validation, protected: true },
  { url: "guests/search", comp: SearchGuest, protected: true },
  { url: "guests/schedule", comp: Schedule, protected: true },
  {
    url: "guests/reports",
    comp: Reports,
    protected: true,
    admin: true,
    accessLevel: 2,
  },
  {
    url: "admin/search",
    comp: SearchUser,
    protected: true,
    admin: true,
    accessLevel: 1,
  },
  {
    url: "admin/edit",
    comp: EditUser,
    protected: true,
    admin: true,
    accessLevel: 1,
  },
  {
    url: "admin/add",
    comp: AddUser,
    protected: true,
    admin: true,
    accessLevel: 2,
  },
  {
    url: "admin/delete",
    comp: DeleteUser,
    protected: true,
    admin: true,
    accessLevel: 2,
  },
  {
    url: "admin/ban",
    comp: BanGuests,
    protected: true,
    admin: true,
    accessLevel: 3,
  },
  { url: "*", comp: NotFound, protected: false },
  { url: "counter", comp: Counter, protected: false },
];

const RoutesComp = () => {
  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        {routesArray.map((route) => {
          const RouteComp = route.comp;
          if (route.protected) {
            if (route.admin) {
              return (
                <Route
                  key={route.url}
                  path={route.url}
                  element={
                    <ProtectedRoute
                      routeAccessLevel={route.accessLevel}
                      adminRoute={route.admin}
                    >
                      <RouteComp />
                    </ProtectedRoute>
                  }
                />
              );
            }
            return (
              <Route
                key={route.url}
                path={route.url}
                element={
                  <ProtectedRoute>
                    <RouteComp />
                  </ProtectedRoute>
                }
              />
            );
          } else {
            return (
              <Route key={route.url} path={route.url} element={<RouteComp />} />
            );
          }
        })}
        <Route path="/signin" element={<RedirectAuthUser route={SignIn} />} />
        <Route
          path="/resetpassword"
          element={<RedirectAuthUser route={ResetPassword} />}
        />
        {/* <Route
          path="/resetpassword"
          element={
            !isAuthenticated || accessToken === null ? (
              <ResetPassword />
            ) : (
              <Navigate to="/" />
            )
          }
          //       !isAuthenticated || accessToken === null
        /> */}
      </Routes>
    </Suspense>
  );
};

export default RoutesComp;
