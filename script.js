// =========================================
// DATA (isi sendiri nanti)
// =========================================

const skillsData = [
  { name: "HTML & CSS" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "Laravel" },
  { name: "C++" },
];

const projectsData = [
  { title: "Contoh Soal Ujian", description: "Website Contoh Soal merupakan platform pembelajaran berbasis web yang menyediakan berbagai latihan soal untuk membantu pengguna memahami materi pelajaran dan menguji kemampuan mereka. Website ini memiliki tampilan yang sederhana, responsif, dan mudah digunakan sehingga pengguna dapat mengakses soal dengan nyaman melalui komputer maupun perangkat seluler. Setiap halaman dirancang agar navigasi menjadi mudah dipahami, sehingga pengguna dapat langsung memilih materi atau kategori soal yang diinginkan. Website ini juga memanfaatkan teknologi web seperti HTML sebagai struktur halaman, CSS untuk mengatur tampilan, serta JavaScript untuk memberikan interaksi pada pengguna. Sebagai media pembelajaran digital, website ini bertujuan memberikan pengalaman belajar yang lebih praktis, menarik, dan dapat diakses kapan saja melalui internet.", image: "Screenshot_20260727-120604.png", link: "https://kanboyzz.github.io/contoh-soal/" },
];

const socialsData = [
  { label: "Instagram", url: "https://www.instagram.com/nakozora14?igsh=ejVnZ3l0Nmt3bHly" },
  { label: "WhatsApp", url: "https://wa.me/qr/LI6FVX34DZTBO1"}
];

// =========================================
// NAVBAR TOGGLE (mobile)
// =========================================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });

  // tutup menu saat salah satu link diklik
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
    });
  });
}

// =========================================
// HIGHLIGHT LINK NAVBAR SESUAI SCROLL
// =========================================
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

function highlightActiveLink() {
  let currentId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", highlightActiveLink);

// =========================================
// RENDER SKILLS (contoh, isi skillsData di atas)
// =========================================
function renderSkills() {
  const skillsGrid = document.getElementById("skillsGrid");
  if (!skillsGrid) return;

  skillsGrid.innerHTML = skillsData
    .map(
      (skill) => `
      <div class="skill-item reveal">
        <p>${skill.name}</p>
      </div>
    `
    )
    .join("");
}

// =========================================
// RENDER PROJECTS (contoh, isi projectsData di atas)
// =========================================
function renderProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projectsData
    .map(
      (project) => `
      <div class="project-card reveal">
        <div class="project-card__image">
          ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ""}
        </div>
        <div class="project-card__body">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${
            project.link
              ? `<a href="${project.link}" class="project-card__link" target="_blank" rel="noopener">Lihat Proyek →</a>`
              : ""
          }
        </div>
      </div>
    `
    )
    .join("");
}

// =========================================
// RENDER SOCIALS (contoh, isi socialsData di atas)
// =========================================
function renderSocials() {
  const footerSocials = document.getElementById("footerSocials");
  if (!footerSocials) return;

  footerSocials.innerHTML = socialsData
    .map(
      (social) => `<a href="${social.url}" target="_blank" rel="noopener">${social.label}</a>`
    )
    .join("");
}

// =========================================
// KIRIM PESAN LEWAT APLIKASI EMAIL DI BROWSER
// =========================================
const TUJUAN_EMAIL = "kanboyzz69@gmail.com"

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: sambungkan ke layanan pengiriman form (email, API, dll.)
    const name = contactForm.querySelector("#name").value;
    const email = contactForm.querySelector("#email").value;
    const message = contactForm.querySelector("#message").value;

    const subject = encodeURIComponent('Pesan dari ${name} lewat Portofolio');
    const body = encodeURIComponent('Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}');

    window.location.href = 'mailto:${TUJUAN_EMAIL}?subject=${subject}&body=${body}';

    if (formStatus) formStatus.textContent = "Membuka aplikasi email...";
  });
}

// =========================================
// SCROLL REVEAL (animasi muncul saat discroll)
// =========================================
function initScrollReveal() {
  // tandai elemen statis (yang sudah ada di HTML) sebagai reveal
  document
    .querySelectorAll(".section__title, .about__content, .contact__form")
    .forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// =========================================
// CURSOR GLOW (cahaya mengikuti kursor)
// =========================================
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;

  window.addEventListener("mousemove", (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

// =========================================
// INIT
// =========================================
function init() {
  renderSkills();
  renderProjects();
  renderSocials();

  // reveal harus dijalankan setelah render, supaya skill-item & project-card ikut terdaftar
  initScrollReveal();
  initCursorGlow();
}

document.addEventListener("DOMContentLoaded", init);
