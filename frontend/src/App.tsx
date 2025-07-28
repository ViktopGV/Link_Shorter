/* project/frontend/src/App.tsx */
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
const api = axios.create({
  baseURL: 'http://localhost:8000',
});

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (_) {
    return false;
  }
}


const handleShorten = async () => {
  if (!isValidHttpUrl(originalUrl)) {
    setError("Введите корректный URL, начинающийся с http:// или https://");
    return;
  }

  try {
    setLoading(true);
    const res = await api.post('/shorten', {
      original_url: originalUrl,
    });
    setShortCode(res.data.short_code);
    setError(null);
  } catch (err: any) {
    setError(err?.response?.data?.detail.msg || 'Error shortening URL');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <button
          onClick={handleShorten}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Сократить
        </button>

        {loading && <p className="text-green-500 mt-4 text-center">Loading...</p>}

        {shortCode && (
          <div className="mt-4 text-center">
            <p>Короткая ссылка:</p>
            <a
              href={`${api.defaults.baseURL}/${shortCode}`}
              className="text-blue-600 underline"
              target="_blank"
            >
              {api.defaults.baseURL}/{shortCode}
            </a>
          </div>
        )}

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
