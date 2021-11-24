import React, { useCallback, useState } from "react";

const useHttp = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = async (httpConfig = { method: "GET" }, applyToData) => {
    setIsLoading(true);
    setError(null);
    try {
      let response;

      response = await fetch(url, {
        ...httpConfig,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyToData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest };
};

export default useHttp;
