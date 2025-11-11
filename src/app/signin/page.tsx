"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // LOGIN EMAIL-PASSWORD
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "http://localhost:3000/dashboard",
    });

    setLoading(false);
    if (error) {
      console.error("Login failed:", error);
      alert("Login gagal, coba cek email/password!");
    } else {
      router.push("/dashboard");
    }
  };

  // LOGIN DENGAN GOOGLE
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/dashboard",
      });
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login gagal!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
      >
        {/* JUDUL */}
        <h2 className="text-2xl font-bold text-center text-black">Sign In</h2>

        {/* INPUT EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* INPUT PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* TOMBOL LOGIN */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* PEMBATAS */}
        <div className="flex items-center justify-center">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-2 text-gray-800 text-sm font-medium">or</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* LOGIN GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 flex items-center justify-center"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        {/* LINK DAFTAR */}
        <p className="text-sm text-center text-black">
          Belum punya akun?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}
