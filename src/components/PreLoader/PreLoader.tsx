import React, { useState, useEffect } from "react";
import "./PreLoader.css";

const PreLoader = ({ show }: { show: boolean }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(show);
  }, [show]);

  return (
    <div className={`preloader ${loading ? "show" : "hide"}`}>
      <img src=".\public\Pokepedia.png" alt="Pokepedia Logo" />
    </div>
  );
};

export default PreLoader;
