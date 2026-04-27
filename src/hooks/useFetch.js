// src/hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Iteration 4 (Bonus): AbortController for cleanup
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
        setError(null);
      } catch (err) {
        // Ignore cancellation errors (component unmounted or url changed)
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: abort the request if component unmounts or url changes
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
