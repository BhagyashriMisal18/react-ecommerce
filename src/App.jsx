import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";


export default function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/product/:id" element={<ProductDetails />} />
</Routes>
</BrowserRouter>
);
}