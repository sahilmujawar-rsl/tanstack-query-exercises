import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../api/product";

export default function Product() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending, isFetching, isError, isSuccess, refetch } = useQuery({
    queryKey: ["products", { search: searchTerm }],
    queryFn: () => fetchProducts({ search: searchTerm }),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={() => refetch()}>
          Refresh Products
        </button>
      </div>

      {isPending && <div className="status">Loading products...</div>}
      {isFetching && !isPending && <div className="fetching">Refreshing...</div>}
      {isError && <div className="error">Error fetching products</div>}
      {isSuccess && data?.length === 0 && (
        <div className="status">No products found</div>
      )}

      {isSuccess && (
        <div className="grid">
          {data?.map((product) => (
            <div key={product.id} className="card">
              {product.thumbnail && (
                <img src={product.thumbnail} alt={product.title} />
              )}
              <h2>{product.title}</h2>
              <div className="meta">
                {product.brand} &middot; {product.category}
              </div>
              <div className="meta">Rating: {product.rating} / 5</div>
              <div className="price">
                ${product.price}
                {product.discountPercentage > 0 && (
                  <span className="discount">-{product.discountPercentage}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
