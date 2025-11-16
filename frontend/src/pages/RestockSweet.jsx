import React, { useEffect, useState } from "react";
import { getSweet, restockSweet } from "../api/sweetApi";
import { useParams, useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function RestockSweet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sweet, setSweet] = useState(null); // selected sweet
  const [qty, setQty] = useState(1); // added amount
  const [err, setErr] = useState("");

  // load sweet details
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

  // send restock request
  const submit = async (e) => {
    e.preventDefault();
    try {
      await restockSweet(id, { quantity: Number(qty) });
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Restock failed");
    }
  };

  if (!sweet) {
    return (
      <DashboardLayout title="Restock Sweet" widthClass="max-w-md">
        <Card className="p-8">Loading...</Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Restock Sweet"
      subtitle={`${sweet.name} — current stock: ${sweet.quantity}`}
      widthClass="max-w-md"
      actions={
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      }
    >
      <Card className="p-8">
        {err && (
          <div className="text-sm text-red-700 bg-red-100 p-2 rounded mb-4">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm">Add Quantity</label>
            <Input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Restock
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
