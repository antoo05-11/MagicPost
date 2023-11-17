"use client";
export default function Card({ title, value }) {
  return (
    <div class="card">
      <div class="card-header">{title}</div>
      <div class="card-body">
        <p class="card-text">{value}</p>
      </div>
    </div>
  );
}
