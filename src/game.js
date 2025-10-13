import { initBuildingHover, initCoin, getCookie } from "./initializers";

setInterval(() => {
    Game();
}, 100); // repeats Game() every 1000ms (1 second)


var wealth = { value: isNaN(Number(getCookie("wealth"))) ? 0 : Number(getCookie("wealth"))}; // sets wealth to be an object, which can be safely passed by reference into initCoin
initCoin(wealth);
initBuildingHover();
console.log(wealth.value);

function Game() {
    const h1 = document.getElementById('test');
    h1.textContent = `Hello King Midas! You have accumulated $${wealth.value}`;
    document.cookie = `wealth=${wealth.value}; path=/`;
}