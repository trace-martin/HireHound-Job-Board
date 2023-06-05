// Search Results code

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

    jobTitleDiv.textContent = jobData.role;
    jobDescriptionDiv.innerHTML = jobData.text;
    document
      .getElementById("single-job-card")
      .setAttribute("data-single-job-data", JSON.stringify(jobData));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const saveJobButtons = document.querySelectorAll(".saveJobButton");

  saveJobButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const jobId = e.target.dataset.jobId;
      const userId = parseInt(
        document
          .querySelector(".container[data-user-id]")
          .getAttribute("data-user-id")
      );
      const jobData = JSON.parse(
        document
          .getElementById("single-job-card")
          .getAttribute("data-single-job-data")
      );

      const postBody = {
        role_name: jobData.role,
        description: jobData.text,
        company_name: jobData.company_name,
        website: jobData.url,
        date_posted: jobData.date_posted,
        user_id: userId,
      };

      fetch(`/api/jobs/`, {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            alert("Job saved!");
          } else {
            console.error("Error saving job:", res.statusText);
            alert("Failed to save job. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error saving job:", error);
          alert("Failed to save job. Please try again later");
        });
    });
  });
});
