import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./components/context-provider";
import Fallback from "./components/fallback/fallback";
const Notification = lazy(() =>
  import("./components/notification/notification")
);
const Bin = lazy(() => import("./pages/bin/bin"));
const Notes = lazy(() => import("./pages/notes/notes"));
const Prompts = lazy(() => import("./pages/prompts/prompts"));
const Stash = lazy(() => import("./pages/stash/stash"));
const SignUpModal = lazy(() =>
  import("./components/sign-up-modal/sign-up-modal")
);
const SignInModal = lazy(() =>
  import("./components/sign-in-modal/sign-in-modal")
);
const UserDetails = lazy(() =>
  import("./components/user-details/user-details")
);
const NotFound = lazy(() => import("./pages/not-found/not-found"));

export default function App() {
  return (
    <ContextProvider>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route exact path={"/"} Component={Notes} />
          <Route path={"/prompts"} Component={Prompts} />
          <Route path={"/stash"} Component={Stash} />
          <Route path={"/bin"} Component={Bin} />
          <Route path={"*"} Component={NotFound} />
        </Routes>
      </Suspense>
      <Notification />
      <SignInModal />
      <SignUpModal />
      <UserDetails />
    </ContextProvider>
  );
}
