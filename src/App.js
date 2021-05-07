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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />
        
        <Switch>
          <Route path="/about"><AboutPage /></Route>
          <Route path="/user"><UserPage /></Route>
          <Route path="/product"><ProductPage /></Route>
          <Route path="/detail/:id/title/:title"><DetailPage /></Route>
          <Route path="/hospital"><HospitalPage /> </Route>
          <Route path="/category"><CategoryPage /></Route>
          <Route exact path="/"> <HomePage /></Route>
        </Switch>

        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
