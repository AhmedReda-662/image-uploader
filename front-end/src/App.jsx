import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import ThemeProvider from "./context/ThemeContext";

import ImageUpload from "./pages/ImageUpload";
import ImageView from "./pages/ImageView";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<ImageUpload />} />
            <Route path="/image/:id" element={<ImageView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
