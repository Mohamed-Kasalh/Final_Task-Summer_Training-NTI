// ================= Navbar scroll style =================
const navbar = document.querySelector(".custom-navbar");

function changeNavbar() {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", changeNavbar);

changeNavbar();

// ================= Navbar "Home" link =================
// On the home page, "Home" stays a dropdown toggle (opens the About/Services/
// Gallery/Blog/Contact submenu). On any other page, clicking it should take
// the visitor back to the home page instead of just opening that submenu.
const homeNavLink = document.getElementById("homeDropdown");

if (homeNavLink) {
  const path = window.location.pathname;
  const isHomePage =
    path === "" ||
    path === "/" ||
    path.endsWith("/index.html") ||
    path.endsWith("/");

  if (!isHomePage) {
    homeNavLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }
}

// ================= Floating "Scroll to top" button =================
const scrollTopBtn = document.querySelector(".scroll-to-top");

if (scrollTopBtn) {
  function toggleScrollTopBtn() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleScrollTopBtn);
  toggleScrollTopBtn();

  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= About "Numbers" counters =================
const counters = document.querySelectorAll(".counter");
const speed = 200;

counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 15);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

// ================= Contact form validation =================
const name = document.getElementById("name-input");
const phone = document.getElementById("phone-input");
const email = document.getElementById("email-input");
const formButton = document.getElementById("submit-btn");
const trip = document.getElementById("trip-list");
const form = document.getElementById("inputs-group");
const successState = document.getElementById("success");
const resetBtn = document.getElementById("reset-btn");

// Scoped to the form only, so the "Posted by" <small> in the Blog section
// (which comes before the Contact section in the page) never gets counted
// and shifts these indexes off by one.
const formSmalls = form ? form.getElementsByTagName("small") : [];

if (formButton) {
  formButton.addEventListener("click", checkValidation);
}

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    successState.classList.add("hidden");
    form.classList.remove("hidden");
    form.reset();
  });
}

function checkValidation(event) {
  event.preventDefault();
  let allDone = true;

  if (!checkAllInputIn()) allDone = false;
  if (!lengthValidation(3, 20, name)) allDone = false;
  if (!phoneValidation(phone)) allDone = false;
  if (!emailValidation(email)) allDone = false;
  if (allDone) {
    form.classList.add("hidden");
    successState.classList.remove("hidden");
  }
}

function checkAllInputIn() {
  let isValid = true;

  if (name.value.trim() === "") {
    formSmalls[0].setAttribute("class", "");
    isValid = false;
  } else {
    formSmalls[0].setAttribute("class", "hidden");
  }

  if (phone.value.trim() === "") {
    formSmalls[1].setAttribute("class", "");
    isValid = false;
  } else {
    formSmalls[1].setAttribute("class", "hidden");
  }

  if (email.value.trim() === "") {
    formSmalls[2].setAttribute("class", "");
    isValid = false;
  } else {
    formSmalls[2].setAttribute("class", "hidden");
  }

  if (trip.value === "") {
    isValid = false;
  }

  // if (document.getElementById("message-textarea").value.trim() === "") {
  //   isValid = false;
  // }

  return isValid;
}

function lengthValidation(minNum, maxNum, input) {
  let validInput = input.value;
  let message = formSmalls[0];
  if (validInput.trim().length > maxNum || validInput.trim().length < minNum) {
    message.setAttribute("class", "");
    return false;
  } else {
    message.setAttribute("class", "hidden");
    return true;
  }
}

function phoneValidation(input) {
  const regex = /^01[0125]\d{8}$/;
  let message = formSmalls[1];
  if (!regex.test(input.value.trim())) {
    message.setAttribute("class", "");
    return false;
  } else {
    message.setAttribute("class", "hidden");
    return true;
  }
}

function emailValidation(input) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let message = formSmalls[2];
  if (!regex.test(input.value.trim())) {
    message.setAttribute("class", "");
    return false;
  } else {
    message.setAttribute("class", "hidden");
    return true;
  }
}
