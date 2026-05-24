const heroBg = document.querySelector(".hero-bg");
const heroObject = document.querySelector(".hero-object");
const heroText = document.querySelector(".hero-text");
const orderForm = document.getElementById("orderForm");

// Номер WhatsApp нужно заменить на реальный номер Максима.
// Формат: только цифры, без +, пробелов и скобок.
const WHATSAPP_PHONE = "79000000000";

function setHeroDepth(x, y) {
  if (!heroBg || !heroObject || !heroText) return;

  heroBg.style.transform = `translate(${x * -10}px, ${y * -8}px) scale(1.08)`;
  heroObject.style.transform = `translate(${x * 22}px, ${y * 14}px) scale(1.015)`;
  heroText.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
}

window.addEventListener("mousemove", (event) => {
  if (window.innerWidth < 900) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;

  setHeroDepth(x, y);
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (!heroBg || !heroObject || !heroText) return;

  if (scrollY < window.innerHeight) {
    heroBg.style.translate = `0 ${scrollY * 0.12}px`;
    heroObject.style.translate = `0 ${scrollY * 0.04}px`;
    heroText.style.translate = `0 ${scrollY * -0.03}px`;
  }
}, { passive: true });

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(orderForm);
    const name = data.get("name") || "";
    const phone = data.get("phone") || "";
    const city = data.get("city") || "";
    const comment = data.get("comment") || "";

    const message = [
      "Здравствуйте! Хочу заказать проект «Прогулки во времени».",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Город / площадка: ${city}`,
      `Комментарий: ${comment}`
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
