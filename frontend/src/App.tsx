import Controller from "./components/Controller";
import { SpeedInsights }  from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div>
      <Controller />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App
