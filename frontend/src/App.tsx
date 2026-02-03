import { BrowserRouter as Router } from "react-router-dom";
import { NavigationBar, Footer } from "./layouts";
import { AppRouter } from "./routes";
import { ScrollToTop } from "./utils";
import { ProgressBar, ScrollToTopButton } from "./components";

function App() {
  return (
    <Router>
      <ProgressBar />
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <main className="flex-grow-1 bg-light" style={{ marginTop: "56px" }}>
          <AppRouter />
        </main>
        <Footer />
      </div>
      <ScrollToTopButton />
      <ScrollToTop />
    </Router>
  );
}

export default App;
