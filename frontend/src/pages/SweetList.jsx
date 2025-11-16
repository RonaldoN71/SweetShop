import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { fetchSweets, deleteSweet } from "../api/sweetApi";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import SweetCard from "../components/ui/SweetCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function SweetList() {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // allows silent refresh after actions
  const initialSilent = useRef(location.state?.silentRefresh || false);

  const [sweets, setSweets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState(""); // search query
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // load sweets from API
  const load = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);

      setErr("");
      try {
        const res = await fetchSweets();
        setSweets(res.data);
        setFiltered(res.data);
      } catch {
        setErr("Failed to load sweets");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // initial load
  useEffect(() => {
    load(initialSilent.current);

    // clear silent refresh flag from history
    if (initialSilent.current) {
      navigate(location.pathname, { replace: true });
    }

    initialSilent.current = false;
  }, [load, navigate, location.pathname]);

  // live search (small delay)
  useEffect(() => {
    const t = setTimeout(() => {
      if (!q.trim()) {
        setFiltered(sweets);
      } else {
        const lower = q.toLowerCase();
        setFiltered(
          sweets.filter((s) => s.name.toLowerCase().startsWith(lower))
        );
      }
    }, 180);

    return () => clearTimeout(t);
  }, [q, sweets]);

  // delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;

    try {
      await deleteSweet(id);
      setSweets((prev) => prev.filter((s) => s._id !== id));
      setFiltered((prev) => prev.filter((s) => s._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <DashboardLayout
      title="Sweet Shop"
      subtitle="Manage stock, pricing, and transactions from a single dashboard."
      actions={
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sweets..."
            className="w-full sm:w-64"
            icon={<span className="text-lg">🍭</span>}
          />

          {isAdmin() && (
            <Button
              variant="primary"
              className="w-full sm:w-auto"
              onClick={() => navigate("/create")}
            >
              + Create Sweet
            </Button>
          )}
        </div>
      }
    >
      {loading && (
        <div className="mb-4 text-sm text-blue-700 bg-blue-100 p-2 rounded">
          Loading…
        </div>
      )}

      {err && (
        <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
          {err}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full p-6 bg-white rounded-lg border">
            No sweets found.
          </div>
        ) : (
          filtered.map((s) => (
            <SweetCard
              key={s._id}
              sweet={s}
              isAdmin={isAdmin()}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
