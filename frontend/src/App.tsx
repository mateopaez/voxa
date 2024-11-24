import Controller from "./components/Controller";
import { SpeedInsights }  from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="">
      <Controller />
      <SpeedInsights />
    </div>
  );
}

export default App
