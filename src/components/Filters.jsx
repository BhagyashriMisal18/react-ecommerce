import { useEffect, useState } from "react";


export default function Filters({ onFilter }) {
const [category, setCategory] = useState("all");
const [price, setPrice] = useState(2000);
const [categories, setCategories] = useState([]);


useEffect(() => {
fetch("https://fakestoreapi.com/products/categories")
.then((res) => res.json())
.then((data) => setCategories(data));
}, []);


useEffect(() => {
onFilter({ category, price });
}, [category, price]);


return (
<div className="border p-4 rounded-xl shadow mb-4 grid gap-4">
<h3 className="font-bold text-lg">Filters</h3>


<div>
<label className="block mb-1 font-medium">Category</label>
<select
value={category}
onChange={(e) => setCategory(e.target.value)}
className="border p-2 rounded-xl w-full"
>
<option value="all">All</option>
{categories.map((cat) => (
<option key={cat} value={cat}>{cat}</option>
))}
</select>
</div>


<div>
<label className="block mb-1 font-medium">Max Price: ₹ {price}</label>
<input
type="range"
min="100"
max="2000"
value={price}
onChange={(e) => setPrice(e.target.value)}
className="w-full"
/>
</div>
</div>
);
}