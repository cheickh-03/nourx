import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProjectForm from "./components/pages/ProjectForm";
import ServiceDetail from "./components/pages/ServiceDetail";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projet" element={<ProjectForm />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
