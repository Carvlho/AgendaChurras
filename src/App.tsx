import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

import { Login } from "./pages/Login";
import { List } from "./pages/List";
import { AddChurras } from "./pages/AddChurras";
import { DetailsChurras } from "./pages/DetailsChurras";
import { AddPeople } from "./pages/AddPeople";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/lista-de-churras" element={<List />} />
          <Route path="/adicionar-churras" element={<AddChurras />} />
          <Route path="/detalhes-churras/:id" element={<DetailsChurras />} />
          <Route
            path="/detalhes-churras/:id/adicionar-pessoa"
            element={<AddPeople />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
