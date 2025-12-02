import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";


export default function ProductDetails() {
const { id } = useParams();
const [product, setProduct] = useState(null);


useEffect(() => {
getProductById(id).then((data) => setProduct(data));
}, [id]);


if (!product) return <div className="p-8 text-center">Loading...</div>;


return (
<div className="p-6 max-w-2xl mx-auto">
<img src={product.image} alt={product.title} className="h-60 mx-auto" />
<h2 className="text-2xl font-bold mt-4">{product.title}</h2>
<p className="mt-2 text-gray-600">{product.description}</p>
<p className="mt-3 text-lg font-semibold">₹ {product.price}</p>
</div>
);
}