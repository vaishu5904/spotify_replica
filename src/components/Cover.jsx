import React from "react";

export default function Cover({ color, className = "" }) {
  return (
    <div className={`cover cover-${color} ${className}`} aria-hidden="true">
      <span className="cover-orbit orbit-one" />
      <span className="cover-orbit orbit-two" />
      <span className="cover-core" />
    </div>
  );
}
