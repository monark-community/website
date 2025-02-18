import React from "react";

function Loader({ isLoaded = false }: { isLoaded?: boolean }) {
  return !isLoaded && <div>Loading...</div>;
}

export default Loader;
