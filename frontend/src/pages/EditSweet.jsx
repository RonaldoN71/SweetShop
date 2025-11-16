import React, { useEffect, useState } from "react";
import { getSweet, updateSweet } from "../api/sweetApi";
import { useParams, useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function EditSweet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sweet, setSweet] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [err, setErr] = useState("");

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

  const submit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      form.append("name", sweet.name);
      form.append("category", sweet.category);
      form.append("price", sweet.price);
      form.append("quantity", sweet.quantity);
      form.append("description", sweet.description || "");

      // file upload
      if (selectedFile) {
        form.append("image", selectedFile);
      } else {
        form.append("image", sweet.image || "");
      }

      await updateSweet(id, form);
      navigate("/");
    } catch {
      setErr("Update failed");
    }
  };

  if (!sweet) {
    return (
      <DashboardLayout title="Edit Sweet" widthClass="max-w-xl">
        <Card className="p-8">Loading...</Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Edit Sweet"
      subtitle={`Update details for ${sweet.name}`}
      widthClass="max-w-xl"
      actions={
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Dashboard
        </Button>
      }
    >
      <Card className="p-8">
        {err && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={sweet.name}
              onChange={(e) =>
                setSweet({ ...sweet, name: e.target.value })
              }
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <Input
              value={sweet.category}
              onChange={(e) =>
                setSweet({ ...sweet, category: e.target.value })
              }
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium">Price</label>
            <Input
              type="number"
              value={sweet.price}
              onChange={(e) =>
                setSweet({ ...sweet, price: e.target.value })
              }
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-sm font-medium">Quantity</label>
            <Input
              type="number"
              value={sweet.quantity}
              onChange={(e) =>
                setSweet({ ...sweet, quantity: e.target.value })
              }
            />
          </div>

          {/* DESCRIPTION — NEW */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full border rounded p-2 text-sm"
              rows="3"
              value={sweet.description || ""}
              onChange={(e) =>
                setSweet({ ...sweet, description: e.target.value })
              }
            />
          </div>

          {/* EXISTING IMAGE URL */}
          <div>
            <label className="text-sm font-medium">Image URL (optional)</label>
            <Input
              value={sweet.image || ""}
              onChange={(e) =>
                setSweet({ ...sweet, image: e.target.value })
              }
            />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="text-sm font-medium">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="block mt-1"
            />
          </div>

          {/* PREVIEW */}
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-32 h-32 object-cover rounded border mt-2"
              alt="Preview"
            />
          ) : sweet.image ? (
            <img
              src={sweet.image}
              className="w-32 h-32 object-cover rounded border mt-2"
              alt="Current Sweet"
            />
          ) : null}

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Update
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}
