"use client";

import "@/css/searchform.css";
function SearchForm({ tracuu }) {
  return (
    <>
      <form className="searchForm">
        <input id="inp" placeholder={tracuu} />
        <button id="bton">tra cuu</button>
      </form>
      <ul className="nav nav-tabs nav-fill">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Trang thai don hang
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Thong tin nguoi gui
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Thong tin nguoi nhan
          </a>
        </li>
      </ul>
    </>
  );
}

export default SearchForm;
