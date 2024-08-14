"use strict";

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const btnLeft = document.querySelector(".slide-btn--left");
const btnRight = document.querySelector(".slide-btn--right");
const dotContainer = document.querySelector(".dots");
const tabsContainer = document.querySelector(".tab-container");
const tabs = document.querySelectorAll(".tab-btn");
const ctas = document.querySelectorAll(".container-cta");
const btns = document.querySelectorAll(".btn");

////////////////////////////////////////////////////
//Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//////////////////////////////////////////////////
// scrolling
document
  .querySelector(".main-nav-list")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("main-nav-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
    headerEl.classList.toggle("nav-open");
  });

const headerNavs = document.querySelectorAll(".header-nav");

headerNavs.forEach((i) =>
  i.addEventListener("click", function (e) {
    e.preventDefault();

    const clickedLogoTop = e.target.closest(".logo");
    const clickedLogoBottom = e.target.closest(".footer-logo");

    if (!clickedLogoTop && !clickedLogoBottom) return;

    const clicked = clickedLogoTop || clickedLogoBottom;
    const id = clicked.parentElement.getAttribute("href");
    if (id === "#") window.scrollTo({ top: 0, behavior: "smooth" });
  })
);

//選取包含btn的container
document.querySelector(".memory").addEventListener("click", function (e) {
  e.preventDefault();
  //如果目標元素包含class="btn", 獲取這個目標元素的href值
  if (e.target.classList.contains("btn")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////
//Sticky navigation
const sectionHero = document.querySelector(".section-hero");

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entries);

  if (!entry.isIntersecting) {
    document.body.classList.add("sticky");
  } else document.body.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-80px",
});

headerObserver.observe(sectionHero);

////////////////////////////////////////////////
//Slider function
const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;
  let timer;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.display = i === slide ? "block" : "none";
    });
  };

  const goToDot = function (slide) {
    dots.forEach((d, i) => {
      if (i === slide) d.classList.add("active");
      else d.classList.remove("active");
    });
  };

  //Initial slide
  const init = function () {
    goToSlide(curSlide);
    goToDot(curSlide);
    timer = setTimeout(function () {
      nextSlide();
    }, 3000);
  };
  init();

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    goToDot(curSlide);

    clearTimeout(timer); // 清除當前的計時器
    timer = setTimeout(function () {
      nextSlide();
    }, 3000);
  };

  //Previous slide
  const prevSlide = function () {
    if (curSlide > 0) {
      curSlide--;
    } else {
      curSlide = maxSlide - 1;
    }

    goToSlide(curSlide);
    goToDot(curSlide);

    clearTimeout(timer); // 清除當前的計時器
    timer = setTimeout(function () {
      nextSlide();
    }, 3000);
  };

  //Event handlers
  btnLeft.addEventListener("click", function () {
    prevSlide();
  });

  btnRight.addEventListener("click", function () {
    nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
      const index = Array.from(dots).indexOf(e.target);
      goToSlide(index);
      goToDot(index);

      clearTimeout(timer); // 清除當前的計時器
      curSlide = index; // 更新當前幻燈片索引
      timer = setTimeout(function () {
        nextSlide();
      }, 3000);
    }
  });
};
slider();

//tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tab-btn");

  if (!clicked) return;

  //Remove active classes
  tabs.forEach((t) => t.classList.remove("tab-btn--active"));
  ctas.forEach((c) => c.classList.remove("container-cta--active"));

  //Activate tab
  clicked.classList.add("tab-btn--active");

  //Activate cta area
  document
    .querySelector(`.cta-card-${clicked.dataset.tab}`)
    .classList.add("container-cta--active");
});
