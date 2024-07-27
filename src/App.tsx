import { useEffect } from "react";

function App() {
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5173/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const user = await response.json();
        if (isMounted) {
          console.log(user);
        }
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div>Hello Test</div>
    </>
  );
}

export default App;
