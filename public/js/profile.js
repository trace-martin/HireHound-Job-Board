const submitButton = document.getElementById("sub-btn");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const updateName = document.getElementById("name-update").value.trim();
  const userId = document
    .getElementById("name-update")
    .getAttribute("data-user-id");
  fetch(`/api/users/${userId}`, {
    method: "put",
    body: JSON.stringify({ name: updateName }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        alert("User Information Updated!");
        document.location.reload();
      } else {
        console.error("Error updating user info.:", response.statusText);
        alert("Failed to update user info. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error saving user info:", error);
      alert("Failed to update user info. Please try again later");
    });
});

const jobCards = document.querySelectorAll(".card[data-job-data]");
jobCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();

    const jobData = JSON.parse(
      event.currentTarget.getAttribute("data-job-data")
    );

    document
      .getElementById("single-job-card")
      .classList.remove("visually-hidden");

    const jobTitleDiv = document.getElementById("job-title");
    const jobDescriptionDiv = document.getElementById("job-description");

    jobTitleDiv.textContent = jobData.role_name;
    jobDescriptionDiv.innerHTML = jobData.description;
    document
      .getElementById("single-job-card")
      .setAttribute("data-single-job-data", JSON.stringify(jobData));
  });
});

