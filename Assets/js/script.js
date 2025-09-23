// ==================== CAROUSEL WHEEL WITH SMOOTH SLIDE ====================
// Infinite carousel with smooth in/out motion

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const step = 2; // number of cards per move
let isAnimating = false; // prevents spam clicks

// Helper: get card width (incl. margin/gap)
function getCardWidth() {
  return carousel.children[0].offsetWidth + 32; // px-4 left+right padding ≈ 32px
}

// Slide function
function slide(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const cardWidth = getCardWidth();
  const distance = cardWidth * step;

  // Apply smooth sliding transition
  carousel.style.transition = "transform 0.3s ease";
  carousel.style.transform = direction === "next"
    ? `translateX(-${distance}px)`
    : `translateX(${distance}px)`;

  // After animation finishes → reorder cards
  setTimeout(() => {
    carousel.style.transition = "none"; // remove animation
    carousel.style.transform = "translateX(0)"; // reset position

    if (direction === "next") {
      // Move first 2 to the end
      for (let i = 0; i < step; i++) {
        carousel.appendChild(carousel.firstElementChild);
      }
    } else {
      // Move last 2 to the front
      for (let i = 0; i < step; i++) {
        carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
      }
    }

    isAnimating = false; // allow next click
  }, 300); // matches transition time
}

// Button listeners
nextBtn.addEventListener("click", () => slide("next"));
prevBtn.addEventListener("click", () => slide("prev"));
