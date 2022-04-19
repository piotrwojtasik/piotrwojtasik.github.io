const canvas = document.getElementById("c");
const js = document.getElementById("js");

let darkMode = () => {
  document.getElementById("container").style.backgroundColor = "#1d1d1d";
  document.getElementById("colorMode").removeEventListener("change", darkMode);
  document.body.style.color = "#36d98d";
  document.getElementById("navigation").style.backgroundColor = "#0d0d0d";
  js.appendChild(canvas);
};

let lightMode = () => {
  document.getElementById("container").style.backgroundColor = "#f2f2f2";
  document.getElementById("c").style.backgroundColor = "#f2f2f2";
  document.body.style.color = "#34735C";
  document.getElementById("colorMode").removeEventListener("change", lightMode);
  document.getElementById("navigation").style.backgroundColor = "#ccc";
  canvas.remove();
};

function switchFunc() {
  if (document.getElementById("colorMode").checked === true) {
    return document
      .getElementById("colorMode")
      .addEventListener("change", darkMode);
  } else {
    return document
      .getElementById("colorMode")
      .addEventListener("change", lightMode);
  }
}
