import { Dashboard } from "./components";
import { RootLayout } from "./pages";

function App() {
  return (
    <RootLayout>
      <h1 className="text-center">blog space</h1>
      <Dashboard />
    </RootLayout>
  );
}

export default App;
