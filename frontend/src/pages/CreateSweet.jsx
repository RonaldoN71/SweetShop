import React, { useState } from "react";
import { createSweet } from "../api/sweetApi";
import { useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function CreateSweet() {
  const navigate = useNavigate();

  // form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // optional direct URL
  const [desc, setDesc] = useState("");

  // NEW: file upload
  const [selectedFile, setSelectedFile] = useState(null);

  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const form = new FormData();

      form.append("name", name);
      form.append("category", category);
      form.append("price", price);
      form.append("quantity", quantity);
      form.append("description", desc);

      // If file uploaded → send file
      if (selectedFile) {
        form.append("image", selectedFile);
      } else {
        // Fallback: direct URL if provided
        form.append("image", imageUrl);
      }

      await createSweet(form); // sweetApi must send multipart now
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Create failed");
    }
  };

  return (
    <DashboardLayout
      title="Create New Sweet"
      subtitle="Add fresh inventory items to your storefront."
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

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm">Sweet Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm">Category</label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm">Price (₹)</label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-sm">Quantity</label>
            <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </div>

          {/* OPTIONAL DIRECT IMAGE URL */}
          <div>
            <label className="text-sm">Image URL (optional)</label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="text-sm">Upload Image (Cloudinary)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="mt-1 block"
            />
          </div>

          {/* PREVIEW */}
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              className="w-32 h-32 object-cover rounded-lg border mt-2"
            />
          )}

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm">Description</label>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Button type="submit" variant="primary">Create</Button>
            <Button variant="secondary" onClick={() => navigate("/")}>Cancel</Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}
