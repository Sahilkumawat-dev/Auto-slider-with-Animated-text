// select indegator
const sliderControls = document.querySelector(".slider-controls");
const sliderTabs = sliderControls.querySelectorAll(".slider-tab");
const sliderIndicator = sliderControls.querySelector(".slider-indicator");

// update size indegator
const updateIndicator = (tab, index) => {
  document.querySelector(".slider-tab.current")?.classList.remove("current");
    tab.classList.add("current");
  sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
  sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

  // smooth scrolling
  const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
  sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
};

const swiper = new Swiper(".slider-container", {
  effect: "fade", // add fade effect 
  speed: 1300,    
  autoplay: { delay: 4000 }, // sliding time
  navigation: {
    prevEl: "#slide-prev", // back slide
    nextEl: "#slide-next", // next slide
  },
  on: {
    slideChange: () => {
      const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
      updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
    },
    // auto start
    reachEnd: () => swiper.autoplay.start(),
  },
});

sliderTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    swiper.slideTo(index); // next,prv slide
    updateIndicator(tab, index); // update indigator
  });
});
updateIndicator(sliderTabs[0], 0);

window.addEventListener("resize", () => updateIndicator(sliderTabs[swiper.activeIndex], 0));
