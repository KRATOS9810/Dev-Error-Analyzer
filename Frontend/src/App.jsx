import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

function App() {
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submitData() {
    try {
      if (!error.trim()) {
        toast.error("Please enter your query");
        return;
      }
      setLoading(true);
      const res = await axios.post(
        "https://dev-error-analyzer.onrender.com/analyze",
        {
          error: error,
        },
      );
      setResponse(res.data.data);
      setError("");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

            <h2 className="text-xl font-semibold">Analyzing Error...</h2>

            <p className="text-zinc-400 text-sm">
              Gemini AI is debugging your issue
            </p>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-6 overflow-x-hidden">
        <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              Dev Error Analyzer
            </h1>
            <p className="text-sm text-zinc-400">
              AI-powered debugging assistant for developers
            </p>
          </div>

          <a
            href="https://github.com/KRATOS9810/Dev-Error-Analyzer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:opacity-90 transition">
              GitHub
            </button>
          </a>
        </nav>
        <section className="w-full max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Understand Errors Instantly
            </h2>

            <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto px-2">
              Paste your React, Node.js, Express, or MongoDB errors and get
              AI-generated explanations, probable causes, and fixes in seconds.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-4 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold">Paste Your Error</h3>

              <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                Gemini AI Enabled
              </span>
            </div>

            <textarea
              onChange={(e) => {
                setError(e.target.value);
              }}
              value={error}
              placeholder={`Example:\nTypeError: Cannot read properties of undefined (reading 'map')`}
              className="w-full h-52 md:h-64 bg-black border border-zinc-700 rounded-2xl p-4 text-sm md:text-base font-mono outline-none resize-none focus:border-white transition"
            />

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-5">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                  React
                </span>

                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                  Node.js
                </span>

                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                  MongoDB
                </span>

                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm text-zinc-300">
                  Express
                </span>
              </div>

              <button
                className="w-full md:w-auto bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-transform disabled:opacity-50"
                disabled={loading}
                onClick={() => {
                  submitData();
                }}
              >
                Analyze Error
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 md:p-5 overflow-hidden">
              <h3 className="text-lg font-semibold mb-3">Explanation</h3>

              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
                {response?.explanation || "AI explanation will appear here..."}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 whitespace-pre-wrap">
              <h3 className="text-lg font-semibold mb-3">Probable Cause</h3>

              <p className="text-zinc-300 leading-relaxed">
                {response?.cause || "Error causes will appear here..."}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
              <h3 className="text-lg font-semibold mb-3">Suggested Fix</h3>

              <div className="bg-black rounded-2xl p-4 border border-zinc-700 overflow-auto text-sm font-mono text-green-400 whitespace-pre-wrap">
                {response?.fix || "AI fixes will appear here..."}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
              <h3 className="text-lg font-semibold mb-3">Prevention Tips</h3>

              <ul className="space-y-2 text-zinc-300 list-disc list-inside whitespace-pre-wrap">
                {response?.prevention ||
                  "AI prevention tips will appear here..."}
              </ul>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-lg font-semibold mb-2">AI Explanations</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Converts confusing stack traces into easy-to-understand
                  explanations.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-6">
                <h3 className="text-lg font-semibold mb-2">Suggested Fixes</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Generates possible fixes and debugging strategies instantly.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Developer Friendly
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Works with React, Node.js, Express, MongoDB, npm, and more.
                </p>
              </div>
            </div>
          </section>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
