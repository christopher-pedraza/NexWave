import Dashboard from "./MainDashboard/Dashboard";
import NavigationMenu from "./Menu/NavigationMenu";
// External functions
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// create router with JSX Route elements
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavigationMenu />}>
      {/* Use navigate to render signup as the default page */}
      <Route index element={<Dashboard />} />
    </Route>
  )
);

export default function App() {
  return (
    <div className="pb-10">
      <RouterProvider router={appRouter} />
    </div>
  );
  // return <Dashboard />;
}
