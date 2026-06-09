import { useState, useEffect } from "react";
import { getProductsFromDb, type Product } from "@/data/products";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const fetched = await getProductsFromDb();
                setProducts(fetched);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Failed to fetch products"));
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    return { products, isLoading, error };
}
