import { useSearchParams } from "react-router-dom";
import Products from "./Products";

export default function SearchResults({ onFlyToCart }) {
  const [params] = useSearchParams();
  return <Products key={params.toString()} onFlyToCart={onFlyToCart}/>;
}
