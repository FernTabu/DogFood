import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <div>Простите, ничего не найдено.</div>

      <button className="btn" onClick={() => navigate("/")}>
        На главную
      </button>
    </div>
  );
};
