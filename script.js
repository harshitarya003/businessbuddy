document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#slider").forEach((slider) => {
      const items = slider.querySelectorAll(".slider-item");
      const indicatorHtml = Array.from(items, () => {
        return `<span class="indicator"></span>`;
      });
      slider.insertAdjacentHTML(
        "beforeend",
        `
          <div class="slide-nav">
          ${indicatorHtml.join("")}
          </div>
      `
      );
  
      const indicators = document.querySelectorAll(".indicator");
      indicators.forEach((button, i) => {
        button.addEventListener("click", () => {
          // Stop the automatic carousel when the user clicks on a sidenav
          clearInterval(interval);
  
          // unselect all items
          items.forEach((item) => item.classList.remove("item-active"));
          indicators.forEach((indicator) =>
            indicator.classList.remove("indicator-active")
          );
  
          // active element
          items[i].classList.add("item-active");
          indicators[i].classList.add("indicator-active");
        });
      });
  
      items[0].classList.add("item-active");
      indicators[0].classList.add("indicator-active");
    });
  
    const carousel = document.querySelector(".elements");
    const images = document.querySelectorAll(".slider-item");
    const indicators = document.querySelectorAll(".indicator");
  
    let currentIndex = 0;
    const totalImages = images.length;
  
    function showNextImage() {
      images[currentIndex].classList.remove("item-active");
      indicators[currentIndex].classList.remove("indicator-active");
      currentIndex = (currentIndex + 1) % totalImages;
      images[currentIndex].classList.add("item-active");
      indicators[currentIndex].classList.add("indicator-active");
    }
  
    let interval = setInterval(showNextImage, 2000);
  
    carousel.addEventListener("mouseenter", function () {
      // Stop the automatic carousel when the user hovers over it
      clearInterval(interval);
    });
  
    carousel.addEventListener("mouseleave", function () {
      // Restart the automatic carousel when the user leaves
      interval = setInterval(showNextImage, 2000);
    });
  
    // Restart the automatic carousel when the user stops using the sidenavs
    const sidenavs = document.querySelectorAll(".slide-nav .indicator");
    sidenavs.forEach((sidenav) => {
      sidenav.addEventListener("mouseleave", function () {
        interval = setInterval(showNextImage, 2000);  
      });
    });
  });
  