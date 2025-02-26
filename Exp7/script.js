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

function previewFeedback() {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const review = document.getElementById("reviewInput").value;
  
  document.getElementById("previewName").innerText = name || "Not Provided";
  document.getElementById("previewEmail").innerText = email || "Not Provided";
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
