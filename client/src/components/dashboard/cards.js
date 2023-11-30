"use client";
export default function Card({ title, value }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <p className="card-text">{value}</p>
      </div>
    </div>
  );
}
