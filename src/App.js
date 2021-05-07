import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

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
import UploadPage from "./UploadPage";

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />

        <Switch>
          <Route path="/about">
            <AboutPage />
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
          <Route path="/category" render={categoryRouteForm} />
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
