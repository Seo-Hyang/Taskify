/*Todo 
Async Hook 
*/

import { useState, useCallback } from "react";

type AsyncFunction = (...args: any[]) => Promise<any>;

function useAsync<T extends AsyncFunction>(
  asyncFunction: T
): [boolean, Error | null, (...args: Parameters<T>) => Promise<ReturnType<T>>] {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const wrappedFunction = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      try {
        setPending(true);
        setError(null);
        return await asyncFunction(...args);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
        throw error;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
