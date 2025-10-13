import './style.css'

fetch('/src/app.html')
  .then(res => res.text())
  .then(html => {
  document.getElementById('app').innerHTML = html;

  // fetch is asynchronous, so we need to import the script within fetch so timing issues don't arise (like if we had done it below outside the fetch)
  const script = document.createElement('script');
  script.src = "/src/game.js";
  script.type = "module"; // allows for ES module import/exporting
  document.body.appendChild(script);  
});
