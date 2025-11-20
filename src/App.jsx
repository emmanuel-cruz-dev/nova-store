import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context";
import { NavigationBar, Footer } from "./layouts";
// import AppRouter from "./routes/AppRouter";
import { AppRouter } from "./routes";
import ScrollToTop from "./helpers/ScrollToTop";
import ProgressBar from "./components/ui/ProgressBar";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

function App() {
  return (
    <Router>
      <CartProvider>
        <ProgressBar />
        <div className="d-flex flex-column min-vh-100">
          <NavigationBar />
          <main className="flex-grow-1 bg-light">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </CartProvider>
      <ScrollToTopButton />
      <ScrollToTop />
    </Router>
  );
}

export default App;
