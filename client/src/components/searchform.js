"use client";

import "/home/doduy/Web/MagicPost/client/src/css/searchform.css";

function SearchForm({ tracuu }) {
  return (
    <form className="searchForm">
      <input id="inp" placeholder={tracuu} />
      <button id="bton">tra cuu</button>
    </form>
  );
}

export default SearchForm;
