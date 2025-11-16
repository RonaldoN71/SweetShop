import React, { useEffect, useRef, useState } from "react";
import { getSweet, purchaseSweet } from "../api/sweetApi";
import { useParams, useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function PurchaseSweet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sweet, setSweet] = useState(null); // sweet info from backend
  const [qty, setQty] = useState(1); // user-selected quantity
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const timerRef = useRef(null); // to clear redirect timer

  // load selected sweet
  useEffect(() => {
    (async () => {
      try {
        const res = await getSweet(id);
        setSweet(res.data);
      } catch {
        setErr("Failed to load sweet");
      }
    })();
  }, [id]);

  // cleanup timeout
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // submit purchase
  const submit = async (e) => {
    e.preventDefault();
    try {
      await purchaseSweet(id, { quantity: Number(qty) });

      setSuccess(true);

      // redirect to dashboard after animation
      timerRef.current = setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      setErr(error.response?.data?.message || "Purchase failed");
    }
  };

  if (!sweet) {
    return (
      <DashboardLayout title="Purchase Sweet" widthClass="max-w-md">
        <Card className="p-8">Loading...</Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Purchase Sweet"
      subtitle={`${sweet.name} — ${sweet.quantity} available`}
      widthClass="max-w-md"
      actions={
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      }
    >
      {/* success fullscreen overlay */}
      {success && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center text-center gap-3">
          <span className="text-green-600">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          <p className="text-2xl font-semibold text-green-700">
            Sweet purchased successfully!
          </p>
        </div>
      )}

      <Card className="p-8">
        {err && (
          <div className="text-sm text-red-700 bg-red-100 p-2 rounded mb-4">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm">Quantity</label>
            <Input
              type="number"
              min="1"
              max={sweet.quantity}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Purchase
            </Button>

            <Button type="button" variant="secondary" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}
