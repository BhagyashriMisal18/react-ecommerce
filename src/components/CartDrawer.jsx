export default function CartDrawer({ cart, onClose, onRemove, onQtyChange }) {
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


return (
<div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl p-6 overflow-y-auto z-50">
<button className="mb-4 text-red-600 font-bold" onClick={onClose}>Close ✖</button>


<h2 className="text-2xl font-bold mb-4">Your Cart</h2>


{cart.length === 0 && <p>Your cart is empty.</p>}


{cart.map((item) => (
<div key={item.id} className="border p-3 rounded-xl mb-4">
<img src={item.image} className="h-20 mx-auto" />
<h3 className="font-semibold mt-2">{item.title}</h3>
<p className="text-gray-600">₹ {item.price}</p>


<div className="flex items-center justify-between mt-3">
<button
onClick={() => onQtyChange(item.id, item.qty - 1)}
className="px-3 py-1 border rounded-lg"
>-</button>


<span className="font-bold">{item.qty}</span>


<button
onClick={() => onQtyChange(item.id, item.qty + 1)}
className="px-3 py-1 border rounded-lg"
>+</button>
</div>


<button
onClick={() => onRemove(item.id)}
className="mt-3 text-white bg-red-500 w-full py-2 rounded-xl"
>
Remove
</button>
</div>
))}


{cart.length > 0 && (
<div className="mt-4">
<h3 className="text-xl font-bold">Total: ₹ {total.toFixed(2)}</h3>
<button className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl">Checkout</button>
</div>
)}
</div>
);
}