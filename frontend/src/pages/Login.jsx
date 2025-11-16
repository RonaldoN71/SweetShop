import React, { useState, useContext } from "react";
import { login as loginApi } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AuthHeroBackground } from "../components/layout/AuthHeroBackground";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthHeroBackground>
      <div className=" no-scroll-page w-full max-w-md px-6">
        <Card className="p-8 shadow-xl">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 
                            flex items-center justify-center mb-4 shadow-md">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
            <p className="text-sm text-gray-500 mb-6">Sign in to your Sweet Shop account</p>
          </div>

          {err && (
            <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                placeholder="sweet@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="black" className="w-full flex justify-center">
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Register here
              </button>
            </p>

          </form>
        </Card>
      </div>
    </AuthHeroBackground>
  );
}
