export function w3_open() {
  document.getElementById("main").style.marginLeft = "15%";
  document.getElementById("mySidebar").style.height = "100%";
  document.getElementById("mySidebar").style.top = "0";

  // document.getElementById("main").style.top = "5%";
  // document.getElementById("mySidebar").style.width = "10%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = "none";
}
export function openhalf() {
  // document.getElementById("main").style.marginLeft = "15%";
  document.getElementById("mySidebar").style.height = "90%";
  document.getElementById("mySidebar").style.top = "5%";
  document.getElementById("mySidebar").style.display = "block";
  // document.getElementById("openNav").style.display = "none";
}
export function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
console.log(123);
