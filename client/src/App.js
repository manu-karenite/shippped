import "./App.css";

//importing React and supporting Environments from
import { Fragment, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./firebase.js";
import { ToastContainer } from "react-toastify";
import { currentUser } from "./functions/axios.js";
//Importing React complete

//importing the public components from webapp/component

const Login = lazy(() => import("./pages/auth/Login.js"));
const Register = lazy(() => import("./pages/auth/Register.js"));
const RegisterContinue = lazy(() => import("./pages/auth/RegisterContinue.js"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword.js"));
//consting public components complete

//consting the user pages
const History = lazy(() => import("./pages/user/History.js"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.js"));
const UserRoutes = lazy(() => import("./components/Routes/UserRoutes.js"));
const AdminRoute = lazy(() => import("./components/Routes/AdminRoute.js"));
const PasswordUpdate = lazy(() => import("./pages/user/PasswordUpdate.js"));
const Wishlist = lazy(() => import("./pages/user/Wishlist.js"));
const ProductIndividual = lazy(() => import("./pages/ProductIndividual.js"));
const RelatedCategory = lazy(() =>
  import("./pages/Related/RelatedCategory.js")
);
const RelatedSubs = lazy(() => import("./pages/Related/RelatedSubs.js"));
const Cart = lazy(() => import("./pages/user/Cart.js"));
const Checkout = lazy(() => import("./pages/user/Checkout.js"));
const NotFound = lazy(() => import("./pages/NotFound.js"));
//const of user pages complete

//consting the Admin Restricted Pages
const Category = lazy(() => import("./pages/Admin/Category/Category.js"));
const CategoryUpdate = lazy(() =>
  import("./pages/Admin/Category/CategoryUpdate.js")
);
const SubCategory = lazy(() =>
  import("./pages/Admin/SubCategory/SubCategory.js")
);
const SubCategoryUpdate = lazy(() =>
  import("./pages/Admin/SubCategory/SubCategoryUpdate.js")
);
const Product = lazy(() => import("./pages/Admin/Product/Product.js"));
const AllProducts = lazy(() => import("./pages/Admin/Product/AllProducts.js"));
const OneProduct = lazy(() => import("./pages/Admin/Product/OneProduct.js"));
const Coupon = lazy(() => import("./pages/Admin/Coupon.js"));
//const complete

//consting headers and minimalistic
const Header = lazy(() => import("./components/Navigation/Header.js"));

const CartDrawer = lazy(() => import("./components/Drawers/CartDrawer.js"));

//import complete

const Home = lazy(() => import("./pages/Home.js"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        const result = await currentUser(token.token);
        dispatch({
          type: "LOGGED_IN",
          payload: {
            email: result.data.data.email,
            token: token.token,
            profileId: result.data.data._id,
            name: result.data.data.name,
            role: result.data.data.role,
          },
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback="Loading Contents">
      <Fragment>
        <Header />

        <CartDrawer />
        <ToastContainer />
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/register-continue"
            exact
            element={<RegisterContinue />}
          />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/product/:slug" exact element={<ProductIndividual />} />
          <Route path="/category/:slug" exact element={<RelatedCategory />} />
          <Route path="/subcategory/:slug" exact element={<RelatedSubs />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route
            path="/checkout"
            exact
            element={
              <UserRoutes>
                <Checkout />
              </UserRoutes>
            }
          />
          <Route
            path="/user/history"
            exact
            element={
              <UserRoutes>
                <History />
              </UserRoutes>
            }
          />
          <Route
            path="/user/password-update"
            exact
            element={
              <UserRoutes>
                <PasswordUpdate />
              </UserRoutes>
            }
          />
          <Route
            path="/user/wishlist"
            exact
            element={
              <UserRoutes>
                <Wishlist />
              </UserRoutes>
            }
          />
          <Route
            path="/admin/dashboard"
            exact
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category"
            exact
            element={
              <AdminRoute>
                <Category />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category/:slug"
            exact
            element={
              <AdminRoute>
                <CategoryUpdate />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/subcategory"
            exact
            element={
              <AdminRoute>
                <SubCategory />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/subcategory/:slug"
            exact
            element={
              <AdminRoute>
                <SubCategoryUpdate />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product"
            exact
            element={
              <AdminRoute>
                <Product />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            exact
            element={
              <AdminRoute>
                <AllProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product/:slug"
            exact
            element={
              <AdminRoute>
                <OneProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/coupon"
            exact
            element={
              <AdminRoute>
                <Coupon />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Fragment>
    </Suspense>
  );
};

export default App;
