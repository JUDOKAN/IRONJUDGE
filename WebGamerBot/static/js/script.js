// 🔹 NAVBAR SCROLL EFEKTİ
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 🔹 FLASH MESAJLARI OTOMATİK KAPAT
document.addEventListener("DOMContentLoaded", () => {
  const flash = document.querySelector(".flash-messages");
  if (flash) {
    setTimeout(() => {
      flash.style.opacity = "0";
      flash.style.pointerEvents = "none";
    }, 4000);
  }
});

// 🔹 OYUNLAR SAYFASINDA BUTONA TIKLAYAN OTURUMSUZ KİŞİYİ UYAR (opsiyonel olarak kullanılabilir)
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".download-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.classList.contains("disabled")) {
        e.preventDefault();
        alert("Lütfen giriş yapın veya kayıt olun.");
      }
    });
  });
});

// 🔹 FAQ SORULARINI AÇ-KAPA YAP (accordion)
const faqItems = document.querySelectorAll(".faq-item h3");
faqItems.forEach((item) => {
  item.style.cursor = "pointer";
  item.addEventListener("click", () => {
    const nextP = item.nextElementSibling;
    if (nextP.style.display === "block") {
      nextP.style.display = "none";
    } else {
      nextP.style.display = "block";
    }
  });
});
