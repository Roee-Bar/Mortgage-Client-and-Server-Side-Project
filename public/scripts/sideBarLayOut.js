const hamBurger = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");

hamBurger.addEventListener("click", function () {
  sidebar.classList.toggle("expand");
});

const sidebarItems = document.querySelectorAll(".sidebar-item");

sidebarItems.forEach(function(item) {
  item.addEventListener("click", function () {
    if (!sidebar.classList.contains("expand")) {
      sidebar.classList.add("expand");
    }
  });
});

const screenHeight = window.screen.height;
if (window.matchMedia("(max-width: 500px) and (orientation: landscape)").matches) {
    const screenHeight = window.screen.height;
    document.getElementById("sidebar").classList.add("smallscreen");
    document.querySelector(".smallscreen").style.height = screenHeight + "px";
} else {
    document.getElementById("sidebar").classList.remove("smallscreen");
}

