import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { Layout } from "@/components/Layout";

function NotFoundPage() {
  return (
    <Layout
      eyebrow="404"
      title="Page not found"
      description="The route you opened does not exist. Return to search to continue browsing creators."
    >
      <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 text-slate-200 backdrop-blur-xl">
        <p className="text-sm text-slate-300">That path does not match a creator profile or search page.</p>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
