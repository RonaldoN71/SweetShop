
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";
import Badge from "./Badge";
import Button from "./Button";
import { Trash2 } from "lucide-react"; // DELETE ICON

export default function SweetCard({ sweet, onDelete, isAdmin }) {
  const navigate = useNavigate();
  const { _id, name, description, price, quantity, category, image } = sweet;
  const outOfStock = Number(quantity) <= 0;

  const go = (path) => () => navigate(path);

  return (
    <div className="rounded-xl overflow-hidden bg-white border shadow-sm">
      <div className="relative">
        <ImageWithFallback
          src={image || "https://via.placeholder.com/800x450?text=Sweet"}
          alt={name}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-3 right-3">
          <Badge>{category || "Misc"}</Badge>
        </div>

        {outOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-semibold text-lg uppercase tracking-wide">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>

        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}

        <div className="flex items-center justify-between gap-4">
          {/* PRICE + QTY */}
          <div>
            <div className="text-2xl font-bold text-pink-500">
              ₹{Number(price).toFixed(2)}
            </div>

            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M9 7V5a3 3 0 116 0v2"
                />
              </svg>
              <span>{quantity} in stock</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col items-end gap-2">

            <Button
              variant="primary"
              className="px-3 py-2 text-sm"
              disabled={outOfStock}
              onClick={!outOfStock ? go(`/purchase/${_id}`) : undefined}
            >
              Purchase
            </Button>

            {isAdmin && (
              <div className="flex flex-wrap gap-2 justify-end">

                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={go(`/edit/${_id}`)}
                >
                  Edit
                </Button>

                <Button
                  variant="secondary"
                  className="text-sm"
                  onClick={go(`/restock/${_id}`)}
                >
                  Restock
                </Button>

                {/* DELETE ICON BUTTON (red trash icon) */}
                <button
                  onClick={() => onDelete && onDelete(_id)}
                  className="p-2 rounded-md bg-red-50 hover:bg-red-100 border border-red-200 transition-all"
                  title="Delete Sweet"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
