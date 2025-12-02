import { Link } from "react-router-dom";

export default function ProductCard({ item, addToCart }) {
  return (
    <div className="border rounded-xl p-4 shadow grid gap-3">

      <Link to={`/product/${item.id}`}>
        <img src={item.image} className="h-40 mx-auto" />
        <h2 className="font-semibold mt-3">{item.title}</h2>
        <p className="text-sm text-gray-600">₹ {item.price}</p>
      </Link>

      <button
        onClick={addToCart}
        className="px-4 py-2 rounded-xl border w-full bg-blue-500 text-white"
      >
        Add to Cart
      </button>
    </div>
  );
}
