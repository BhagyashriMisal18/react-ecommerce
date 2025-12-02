import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/Productcard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import CartDrawer from "../components/CartDrawer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  const filterProducts = ({ search = "", category = "all", price = 2000 }) => {
    let data = [...products];

    if (search) data = data.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all")
      data = data.filter((p) => p.category === category);

    data = data.filter((p) => p.price <= price);

    setFiltered(data);
  };

  const handleSearch = (query) => filterProducts({ search: query });
  const handleFilter = ({ category, price }) =>
    filterProducts({ category, price });

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 grid gap-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">E-Commerce Store</h1>

        <button
          onClick={() => setIsCartOpen(true)}
          className="px-4 py-2 rounded-xl border shadow"
        >
          Cart ({cart.length})
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilter} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            addToCart={() => addToCart(item)}
          />
        ))}
      </div>

      {isCartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={updateQty}
        />
      )}
    </div>
  );
}
