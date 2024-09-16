import { data } from "./data.js";

export const app = {
  filtersHolder: document.getElementById("filters-holder"),
  jobCardsHolder: document.getElementById("job-cards-holder"),
  filtersCard: document.getElementById("filters"),
  selectedFilters: [],
  OnInit: function () {
    for (let job of data) {
      this.appendCard(job);
    }
  },
  appendFilter: function (input) {
    this.filtersCard.classList.remove("close");
    if (this.selectedFilters.includes(input)) return;

    this.selectedFilters.push(input);
    this.updateJobCardHolder();
    let filterTag = document.createElement("div");
    filterTag.innerHTML = `<span>${input}</span>`;

    let removeFilterButton = document.createElement("span");
    removeFilterButton.innerHTML = '<i class="bi bi-trash"></i>';
    removeFilterButton.addEventListener("click", () => {
      this.removeFilter(filterTag);
    });
    filterTag.appendChild(removeFilterButton);

    this.filtersHolder.appendChild(filterTag);
  },
  isMatch: function (card) {
    let cardFilter = [...card.languages, ...card.tools, card.level, card.role];

    return (
      cardFilter.length ==
      new Set([...cardFilter, ...this.selectedFilters]).size
    );
  },
  updateJobCardHolder: function () {
    this.jobCardsHolder.innerHTML = "";
    for (let job of data) {
      if (this.isMatch(job)) this.appendCard(job);
    }
  },
  removeFilter: function (filterTag) {
    let filter = filterTag.children[0].innerText;
    this.filtersHolder.removeChild(filterTag);
    this.selectedFilters = this.selectedFilters.filter((f) => f != filter);
    console.log(this.selectedFilters);

    this.updateJobCardHolder();
    this.filtersCard.classList.toggle('close', !this.selectedFilters.length)
  },
  appendCard: function (job) {
    let card = document.createElement("div");
    card.setAttribute("data-new", job.new);
    card.setAttribute("data-featured", job.featured);
    card.className = "card";
    card.innerHTML = `<div class="card-content">
                    <img src="${job.logo}" alt="${job.company} logo" />
                    <div class="Job-details">
                      <div>
                        <span class="company-name">${job.company}</span>
                        <span class="new">new!</span>
                        <span class="featured">featured</span>
                      </div>
                      <span class="job-name">${job.position}</span>
                      <pre>${job.postedAt} . ${job.contract} . ${job.location}</pre>
                    </div>
                  </div>`;

    let filters = document.createElement("div");
    filters.className = "filters";

    for (let filter of [...job.languages, ...job.tools, job.role, job.level]) {
      let filterTag = document.createElement("span");
      filterTag.innerHTML = filter;
      filterTag.addEventListener("click", () => {
        this.appendFilter(filter);
      });
      filters.appendChild(filterTag);
    }

    card.appendChild(filters);

    this.jobCardsHolder.appendChild(card);
  },
  clearFilters: function() {
    this.selectedFilters = [];
    this.updateJobCardHolder();
    this.filtersHolder.innerHTML = '';
    this.filtersCard.classList.add('close');
  }
};

/*
  1- Performance.
  2- Class
  3- Add Job page
*/
