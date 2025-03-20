import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import AccessibilityMenu from "./components/ui/accessibility-menu";

// Implémentation du lazy loading
const Home = lazy(() => import("./components/home"));
const ProjectForm = lazy(() => import("./components/pages/ProjectForm"));
const ServiceDetail = lazy(() => import("./components/pages/ServiceDetail"));

// Composant de chargement amélioré
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-black text-blue-400">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xl font-medium">Chargement...</p>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
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
      
      {/* Menu d'accessibilité */}
      <AccessibilityMenu />
    </>
  );
}

export default App;
