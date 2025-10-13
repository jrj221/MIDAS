import { initBuildingHover, initCoin, initSaveSystem } from "./initializers";

setInterval(() => {
    Game();
}, 100); // repeats Game() every 1000ms (1 second)

localStorage.setItem("test", "test");
var wealth = { value: isNaN(Number(localStorage.getItem("wealth"))) ? 0 : Number(localStorage.getItem("wealth"))}; // sets wealth to be an object, which can be safely passed by reference into initCoin
initCoin(wealth);
initBuildingHover();
initSaveSystem(wealth);


function Game() {
    const h1 = document.getElementById('test');
    h1.textContent = `Hello King Midas! You have accumulated $${wealth.value}`;
}