import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useUserStore } from "./store";

const HomePage = lazy(() => import("./pages/Home"));
const BrowsePage = lazy(() => import("./pages/Browse"));
const SearchPage = lazy(() => import("./pages/Search"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const MatchesPage = lazy(() => import("./pages/Matches"));
const StoriesPage = lazy(() => import("./pages/Stories"));
const RegisterPage = lazy(() => import("./pages/Register"));
const AdminPage = lazy(() => import("./pages/Admin"));
const LoginPage = lazy(() => import("./pages/Login"));
const PlansPage = lazy(() => import("./pages/Plans"));
const MessagesPage = lazy(() => import("./pages/Messages"));
const AdminSecurePage = lazy(() => import("./pages/AdminSecure"));

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BrowsePage />
    </Suspense>
  ),
});

// Alias /profiles → Browse page (same component)
const profilesAliasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profiles",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BrowsePage />
    </Suspense>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SearchPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const matchesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matches",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MatchesPage />
    </Suspense>
  ),
});

const storiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stories",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <StoriesPage />
    </Suspense>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RegisterPage />
    </Suspense>
  ),
});

// /admin redirects to secure login unless admin is already authenticated
function AdminRedirect() {
  const { isAdmin } = useUserStore();
  if (!isAdmin) {
    window.location.replace("/vivah-admin-secure");
    return null;
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  );
}

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminRedirect,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const plansRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plans",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PlansPage />
    </Suspense>
  ),
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MessagesPage />
    </Suspense>
  ),
});

const adminSecureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vivah-admin-secure",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminSecurePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  browseRoute,
  profilesAliasRoute,
  searchRoute,
  profileRoute,
  matchesRoute,
  storiesRoute,
  registerRoute,
  adminRoute,
  loginRoute,
  plansRoute,
  messagesRoute,
  adminSecureRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
