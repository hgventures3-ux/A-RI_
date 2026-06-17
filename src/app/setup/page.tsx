"use client";

import { useState } from "react";

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSetup = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "kriya@aerisnacks.com",
          name: "Kriya Kanunga",
          password: "Kriya@1234",
          setupToken: "aerisnacks2025"
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Auto Setup</h1>
        <p className="text-gray-600 mb-6">Click the button below to generate the Super Admin account in the database.</p>
        
        <button 
          onClick={handleSetup}
          disabled={loading}
          className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Setting up..." : "Create Admin Account"}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg text-left overflow-auto text-sm ${result.error ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
