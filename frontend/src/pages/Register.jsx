import React, { useState } from "react";
import { register as registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AuthHeroBackground } from "../components/layout/AuthHeroBackground";
import { useEffect } from "react";
export default function Register() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await registerApi({ name, email, password });
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthHeroBackground>
      <div className="no-scroll-page w-full max-w-md px-6">
        <Card className="p-8 shadow-xl">

          <h2 className="text-2xl font-semibold text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-sm text-gray-600 mb-6">
            Register to manage your Sweet Shop
          </p>

          {err && (
            <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm mb-1">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="sweet@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Choose a password"
              />
            </div>

            <Button type="submit" variant="black" className="w-full">
              {loading ? "Creating..." : "Register"}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Login
              </button>
            </p>

          </form>
        </Card>
      </div>
    </AuthHeroBackground>
  );
}
