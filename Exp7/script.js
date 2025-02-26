let selected_rating = 0;
let ratingLocked = false;
let stars = document.querySelectorAll(".star");
  
function updateStars(n) {
  stars.forEach((star, index) => {
    star.style.color = index < n ? "gold" : "lightgray";
  });
}

stars.forEach((star, index) => {
  star.addEventListener("click", function () {
    selected_rating = index + 1;
    updateStars(selected_rating);
    ratingLocked = true; 
    document.getElementById("ratingError").innerText = "";
  });

  star.addEventListener("mouseover", function () {
    if (!ratingLocked) {
      updateStars(index + 1);
    }
  });

  star.addEventListener("mouseout", function () {
    if (!ratingLocked) {
      updateStars(selected_rating);
    }
  });
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm() {
  let isValid = true;

  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("locationError").innerText = "";
  document.getElementById("dateError").innerText = "";
  document.getElementById("ratingError").innerText = "";
  document.getElementById("reviewError").innerText = "";

  const name = document.getElementById("nameInput").value.trim();
  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required.";
    isValid = false;
  }

  const email = document.getElementById("emailInput").value.trim();
  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required.";
    isValid = false;
  } else if (!validateEmail(email)) {
    document.getElementById("emailError").innerText = "Please enter a valid email address.";
    isValid = false;
  }

  const phone = document.getElementById("phoneInput").value.trim();
  if (phone === "") {
    document.getElementById("phoneError").innerText = "Phone number is required.";
    isValid = false;
  }

  const location = document.getElementById("locationInput").value.trim();
  if (location === "") {
    document.getElementById("locationError").innerText = "Location is required.";
    isValid = false;
  }

  const dateExp = document.getElementById("dateInput").value;
  if (dateExp === "") {
    document.getElementById("dateError").innerText = "Date of experience is required.";
    isValid = false;
  }

  if (selected_rating === 0) {
    document.getElementById("ratingError").innerText = "Rating is required.";
    isValid = false;
  }

  const review = document.getElementById("reviewInput").value.trim();
  if (review === "") {
    document.getElementById("reviewError").innerText = "Review is required.";
    isValid = false;
  }

  return isValid;
}

function previewFeedback() {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const phone = document.getElementById("phoneInput").value;
  const location = document.getElementById("locationInput").value;
  const dateExp = document.getElementById("dateInput").value;
  const review = document.getElementById("reviewInput").value;
  
  document.getElementById("previewName").innerText = name || "Not Provided";
  document.getElementById("previewEmail").innerText = email || "Not Provided";
  document.getElementById("previewPhone").innerText = phone || "Not Provided";
  document.getElementById("previewLocation").innerText = location || "Not Provided";
  document.getElementById("previewDate").innerText = dateExp || "Not Provided";
  document.getElementById("previewReview").innerText = review || "No Review Provided";

  const previewRatingContainer = document.getElementById("previewRating");
  previewRatingContainer.innerHTML = ""; 
  for (let i = 0; i < 5; i++) {
    const starEl = document.createElement("span");
    starEl.classList.add("star");
    starEl.innerText = "★";
    starEl.style.color = i < selected_rating ? "gold" : "lightgray";
    starEl.style.cursor = "default";
    previewRatingContainer.appendChild(starEl);
  }
  
  const imageInput = document.getElementById("imageInput");
  const previewImageContainer = document.getElementById("previewImageContainer");
  const previewImage = document.getElementById("previewImage");

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImageContainer.style.display = "block";
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    previewImageContainer.style.display = "none";
  }

  document.getElementById("previewSection").style.display = "block";
}

document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault(); 
  if (validateForm()) {
    alert("Feedback Submitted Successfully!");
    this.reset();
    selected_rating = 0;
    ratingLocked = false;
    updateStars(0);
    document.getElementById("previewSection").style.display = "none";
  }
});
