import { app } from './app.js'

document.addEventListener('DOMContentLoaded', () => {
    app.OnInit();
});

document.getElementById("clear-filter").addEventListener('click', () => {
    app.clearFilters();
})