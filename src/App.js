import Project from "./project";
import {HashRouter , Navigate} from "react-router-dom";
import {Routes, Route} from "react-router";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
        <HashRouter>
                  <div className="container">
                    <Routes>
                      <Route path="/" element={<Navigate to={"/project"} />} />
                      <Route path="/project/*" element={<Project />}/>
                    </Routes>
                  </div>
        </HashRouter>
    </Provider>
  );
}

export default App;
