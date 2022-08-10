import { parse } from "go-cra-errors";
import stringify from "safe-json-stringify";
import { useEffect, useRef, useState } from "react";

const greetServer = async (): Promise<[string, null] | [null, Error]> => {
  try {
    const res = await fetch("http://localhost:8081/api/hello");
    const data = await res.json();

    if (!data.message || typeof data.message !== "string") {
      throw new Error(`Invalid response from server: ${stringify(data)}`);
    }

    return [data.message, null];
  } catch (e) {
    const error = parse(e);
    console.error(error);
    return [null, error];
  }
};

const Greet = () => {
  // fixes double trigger from React18 "upgrade"
  // don't do this: https://blog.ag-grid.com/avoiding-react-18-double-mount/
  const mounted = useRef(false);

  const [message, setMessage] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    greetServer().then(([m, e]) => {
      setError(e ? e.message : null);
      setMessage(m);
    });
  }, []);

  return (
    <div>
      <div className="card">
        <button disabled>
          message is {message}
        </button>

        {error && (
          <button disabled>
            error is {error}
          </button>
        )}

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Greet;
