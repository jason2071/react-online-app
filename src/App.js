import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import HospitalPage from "./pages/hospital/HospitalPage";
import CategoryPage from "./pages/category/CategoryPage";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import MemberPage from "./pages/MemberPage";
import PrivateRoute from "./guard/auth";
import CartPage from "./pages/CartPage";
import configureStore from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();
const queryClient = new QueryClient();

function categoryRouteForm({ match: { url } }) {
  return (
    <>
      <Route path={`${url}/`} exact>
        <CategoryPage />
      </Route>
      <Route path={`${url}/create`}>
        <CreatePage />
      </Route>
      <Route path={`${url}/edit/:id`}>
        <EditPage />
      </Route>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider autoDismiss autoDismissTimeout={6000}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <NavBar />

              <Switch>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <Route path="/user">
                  <UserPage />
                </Route>
                <Route path="/product">
                  <ProductPage />
                </Route>
                <Route path="/detail/:id/title/:title">
                  <DetailPage />
                </Route>
                <Route path="/hospital">
                  <HospitalPage />
                </Route>
                <Route path="/upload">
                  <UploadPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>

                <PrivateRoute path="/member">
                  <MemberPage />
                </PrivateRoute>

                <Route path="/category" render={categoryRouteForm} />
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>

              <Footer />
            </Router>
          </QueryClientProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
