import Controller from "./components/Controller";
import { SpeedInsights } from "@vercel/speed-insights/next";

function App() {
  return (
    <div className="">
      <Controller />
      <SpeedInsights />
    </div>
  );
}

export default App
