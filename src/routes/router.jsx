import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/DashBoard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/DashBoard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/DashBoard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/DashBoard/AssignRiders/AssignRiders";
import RiderRoutes from "./RiderRoutes";
import AssignedDeliveries from "../pages/DashBoard/AssignedDeliveries/AssignedDeliveries";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())

      },
      {
        path: 'send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      {
        path: 'my-parcels',
        element: <MyParcels></MyParcels>
      },
      {
        path: 'payment/:parcelId',
        element: <Payment></Payment>
      },
      {
        path:'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path:'payment-cancelled',
        element: <PaymentCancelled></PaymentCancelled>
      },
      {
        path:'payment-history',
        element: <PaymentHistory></PaymentHistory>
      },

      //rider related routes
      {
        path: "assigned-deliveries",
        element: <RiderRoutes><AssignedDeliveries></AssignedDeliveries></RiderRoutes>
      },

      // admin related routes
      {
        path:'approve-riders',
        element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },
      {
        path:'assign-riders',
        element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
      },
      {
        path:'users-management',
        // element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
        Component: UsersManagement
      },
    ]
  }
]);
