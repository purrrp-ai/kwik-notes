import { KwikNotesContextProvider } from "@context/kwik-notes_context-provider";
import * as RRD from "react-router-dom";
import Bin from "./pages/bin/bin";
import Notes from "./pages/notes/notes";
import Prompts from "./pages/prompts/prompts";
import Stash from "./pages/stash/stash";

export default function App() {
  return (
    <KwikNotesContextProvider>
      <RRD.Routes>
        <RRD.Route exact path={"/"} element={<Notes />} />
        <RRD.Route path={"/prompts"} element={<Prompts />} />
        <RRD.Route path={"/stash"} element={<Stash />} />
        <RRD.Route path={"/bin"} element={<Bin />} />
      </RRD.Routes>
    </KwikNotesContextProvider>
  );
}
