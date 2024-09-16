import { data } from "./data.js";


export const app = {
    filtersHolder : document.getElementById("filters-holder"), 
    jobCardsHolder : document.getElementById("job-cards-holder"),
    clearFiltersButton: document.getElementById('clear-filter'),
    selectedFilters: [],
    OnInit: function() {
        for(let job of data){
            this.appendCard(job);                
        }
    },
    appendFilter: function(input) {
        if(this.selectedFilters.includes(input))
            return;
        this.selectedFilters.push(input);
        this.updateJobCardHolder();  
        let filterTag = document.createElement('div');
        filterTag.innerHTML = `<span>${input}</span>`
    
        let removeFilterButton = document.createElement('span');
        removeFilterButton.innerHTML = '<i class="bi bi-trash"></i>';
        removeFilterButton.addEventListener('click', ()=> {
            this.removeFilter(input);
        })
        filterTag.appendChild(removeFilterButton);
    
        this.filtersHolder.appendChild(filterTag);
    },
    isMatch:function(card){
      let cardFilter=[...card.languages,...card.tools,card.level,card.role];
      return this.selectedFilters.every(ele=>cardFilter.includes(ele));
    },

    updateJobCardHolder:function(){
      this.jobCardsHolder.innerHTML = '';
        for(let job of data){
          if(this.isMatch(job))this.appendCard(job);
        }
       
    },
    

    removeFilter: function(input) {
        console.log(input);
    },
    appendCard: function(job) {
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
    }
}