function openSideBar() {
  // document.getElementById("main").style.marginLeft = "15%";
  // document.getElementById("mySidebar").style.height = "100%";
  // document.getElementById("mySidebar").style.top = "0";

  // document.getElementById("main").style.top = "5%";
  // document.getElementById("mySidebar").style.width = "10%";
  // document.getElementById("mySidebar").style.display = "block";
  // document.getElementById("openNav").style.display = "none";
  document.getElementById("main").style.width = "85%";
  document.getElementById("main").style.marginLeft = "15%";
  document.getElementById("mySidebar").style.width = "15%";
  document.getElementById("button-open").style.display = "none";
}
function openhalf() {
  // document.getElementById("main").style.marginLeft = "15%";
  // document.getElementById("mySidebar").style.display = "block";
  // document.getElementById("openNav").style.display = "none";
  document.getElementById("mySidebar").style.height = "90%";
  document.getElementById("mySidebar").style.top = "5%";
  document.getElementById("mySidebar").style.width = "15%";
}
function closeSideBar() {
  // console.log(555);
  document.getElementById("main").style.width = "100%";
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.width = "0%";
  document.getElementById("button-open").style.display = "inline";
}
document
  .getElementById("button-close")
  .addEventListener("click", () => closeSideBar());
document
  .getElementById("button-open")
  .addEventListener("click", () => openSideBar());
// document.getElementById("button-open").onmouseover = () => {
// console.log(123);
// };
