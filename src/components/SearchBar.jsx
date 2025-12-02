export default function SearchBar({ onSearch }) {
return (
<input
onChange={(e) => onSearch(e.target.value)}
placeholder="Search products..."
className="border w-full p-2 rounded-xl"
/>
);
}