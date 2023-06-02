const container = document.getElementById("charts");

const data = JSON.parse(container.getAttribute("data-jobs-data"));

const jobsByCompanyDiv = document.getElementById("jobs-by-company");
const remoteJobsDiv = document.getElementById("remote-jobs");
const remoteJobsByCityDiv = document.getElementById("remote-jobs-by-city");

let mapData = {};
let remoteJobs = {};
let remoteJobsByCity = {};

data.map((item) => {
  if (mapData[item.company_name]) {
    mapData[item.company_name]++;
  } else {
    mapData[item.company_name] = 1;
  }

  let remote = item.remote ? "Remote" : "Non-Remote";
  if (remoteJobs[remote]) {
    remoteJobs[remote]++;
  } else {
    remoteJobs[remote] = 1;
  }

  let remoteByCityLocation =
    item.location === null ? "Not Specified" : item.location;

  if (remoteJobsByCity[remoteByCityLocation]) {
    if (remoteJobsByCity[remoteByCityLocation][item.remote]) {
      remoteJobsByCity[remoteByCityLocation][item.remote]++;
    } else {
      remoteJobsByCity[remoteByCityLocation][item.remote] = 1;
    }
  } else {
    remoteJobsByCity[remoteByCityLocation] = {};
    remoteJobsByCity[remoteByCityLocation][item.remote] = 1;
  }
});

(data && data.length > 0) ? drawChart() : null;

function drawChart() {
  new Chart(jobsByCompanyDiv, {
    type: "bar",
    data: {
      labels: Object.keys(mapData),
      datasets: [
        {
          label: "# of Jobs per Company",
          data: Object.values(mapData),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(remoteJobsDiv, {
    type: "pie",
    data: {
      labels: Object.keys(remoteJobs),
      datasets: [
        {
          label: "Remote vs Non-Remote Jobs",
          data: Object.values(remoteJobs),
        },
      ],
    },
  });

  new Chart(remoteJobsByCityDiv, {
    type: "bar",
    data: {
      labels: Object.keys(remoteJobsByCity),
      datasets: [
        {
          label: "Remote",
          data: Object.keys(remoteJobsByCity).map((key) => {
            return remoteJobsByCity[key]["true"];
          }),
        },
        {
          label: "Non-Remote",
          data: Object.keys(remoteJobsByCity).map((key) => {
            return remoteJobsByCity[key]["false"];
          }),
        },
      ],
    },
    options: {
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Remote Jobs by City",
        },
      },
    },
  });
}
