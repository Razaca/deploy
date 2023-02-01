import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "./hooks/useModal";
import "./App.css";

/* PAGES */
import InitPage from "./pages/InitPage/InitPage.jsx";
import HomePage from "./pages/HomePage/HomePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import Modal from "./components/Modal/Modal";


function App() {
  const [isOpenModalError, closeModalError] = useModal(true);
  const { error } = useSelector((store) => store);

  return (
    <div className="App">
      {error && (
        <Modal isOpen={isOpenModalError} closeModal={closeModalError}>
          {error}
        </Modal>
      )}

      <Routes>
        <Route path={"/"} element={<InitPage />} />
        <Route path={"/home"} element={<HomePage />} />
        <Route path={"/:id"} element={<DetailsPage />} />
        <Route path={"/create"} element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
