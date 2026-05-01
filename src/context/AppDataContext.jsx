import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [dataResponse, productsResponse] = await Promise.all([
          fetch("/data.json"),
          fetch("/products.json"),
        ]);

        if (!dataResponse.ok || !productsResponse.ok) {
          throw new Error("Failed to fetch app data");
        }

        const [dataJson, productsJson] = await Promise.all([
          dataResponse.json(),
          productsResponse.json(),
        ]);

        if (!isMounted) return;

        setData(dataJson);
        setProductsData(productsJson);
      } catch (err) {
        if (!isMounted) return;
        setError(err);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({ data, productsData, loading, error }),
    [data, productsData, loading, error],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
}
