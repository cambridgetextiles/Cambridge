
let currentIndex = 0;
const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const resultsList = document.getElementById("searchResults");
let allLinks = Array.from(document.querySelectorAll("a[href]")).map(link => ({ text: link.textContent, href: link.href }));
let selectedIndex = -1;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

function filterLinks(event) {
  const query = event.target.value.toLowerCase();
  const filtered = allLinks.filter(link => link.text.toLowerCase().includes(query));
  resultsList.innerHTML = filtered.map((link, index) =>
    `<li class="${index === selectedIndex ? 'active' : ''}">${link.text}</li>`
  ).join("");

  if (event.key === "ArrowDown") {
    selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
  } else if (event.key === "ArrowUp") {
    selectedIndex = Math.max(selectedIndex - 1, 0);
  } else if (event.key === "Enter" && filtered[selectedIndex]) {
    window.open(filtered[selectedIndex].href, "_blank");
  }
}
