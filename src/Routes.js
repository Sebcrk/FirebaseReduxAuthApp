import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import RedirectAuthUser from "./helpers/RedirectAuthUser";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Counter from "./routes/counter/Counter";
import SignIn from "./routes/SignIn/SignIn";
import ResetPassword from "./routes/ResetPassword";

const UserProfile = lazy(() => import("./routes/UserProfile"));
const Validation = lazy(() => import("./routes/Validation"));
const Dashboard = lazy(() => import("./routes/Dashboard"));
const Schedule = lazy(() => import("./routes/Guests/Schedule"));
const Reports = lazy(() => import("./routes/Guests/Reports"));
const GuestSearch = lazy(() => import("./routes/Guests/GuestSearch"));
const Map = lazy(() => import("./routes/Guests/Map"));
const AddUser = lazy(() => import("./routes/Admin/AddUser"));
const DeleteUser = lazy(() => import("./routes/Admin/DeleteUser"));
const EditUser = lazy(() => import("./routes/Admin/EditUser"));
const AdminSearch = lazy(() => import("./routes/Admin/AdminSearch"));
const BanGuests = lazy(() => import("./routes/Admin/BanGuests"));
const NotFound = lazy(() => import("./routes/NotFound"));

const routesArray = [
  { url: "/", comp: Dashboard, protected: true },
  { url: "profile", comp: UserProfile, protected: true },
  { url: "validation", comp: Validation, protected: true },
  { url: "guests/search", comp: GuestSearch, protected: true },
  { url: "guests/schedule", comp: Schedule, protected: true },
  { url: "guests/map", comp: Map, protected: true },
  { url: "guests/reports", comp: Reports, protected: true },
  { url: "admin/search", comp: AdminSearch, protected: true },
  { url: "admin/add", comp: AddUser, protected: true },
  { url: "admin/edit", comp: EditUser, protected: true },
  { url: "admin/delete", comp: DeleteUser, protected: true },
  { url: "admin/ban", comp: BanGuests, protected: true },
  { url: "*", comp: NotFound, protected: false },
  { url: "counter", comp: Counter, protected: false },
];

const RoutesComp = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        if (userData.accessToken === accessToken) {
          console.log("Route says it's a valid token");
        } else {
          console.log("Route says it's an invalid token");
        }

        // ...
      }
    });

    return () => {
      unsuscribe();
    };
  }, []);

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
          }
          return (
            <Route key={route.url} path={route.url} element={<RouteComp />} />
          );
        })}

        {/* REVISAR ESTO */}
        {/* REVISAR ESTO */}
        {/* REVISAR ESTO */}
        {/* REVISAR ESTO */}
        {/* REVISAR ESTO */}
        <Route
          path="/signin"
          element={
          
              <RedirectAuthUser route={SignIn} />}
          
          />
        <Route
          path="/resetpassword"
          element={
          
              <RedirectAuthUser route={ResetPassword} />}
          
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


