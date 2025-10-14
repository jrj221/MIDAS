import { initBuildingHover, initCoin, initSaveSystem, initServant, updateWealth, getGameState, initResetButton, checkIfCanAfford } from "./initializers";

setInterval(() => {
    Game();
}, 100); // repeats Game() every 1000ms (1 second)

var lastTime = 0 // timestamp of last time we updated wealth
const gameState = getGameState();

initCoin(gameState.wealth);
initBuildingHover();
initSaveSystem(gameState);
initServant(gameState.wealth, gameState.cps, gameState.numServants, gameState.servantCost);
initResetButton(gameState);

function Game() {
    const wealthText = document.getElementById('wealthText');
    wealthText.textContent = `Hello King Midas! You have accumulated $${gameState.wealth.value}`;
    const cpsText = document.getElementById('cpsText');
    cpsText.textContent = `Coins per Second: ${gameState.cps.value}`;
    const servantCostText = document.getElementById('servantCostText');
    servantCostText.textContent = `Cost: ${gameState.servantCost.value}`

    checkIfCanAfford(gameState);

    let currTime = performance.now(); // time in milliseconds since page started
    if (((currTime - lastTime) / 1000) >= 1) { // its been 1 second since we updated wealth
        updateWealth(gameState.wealth, gameState.cps);
        lastTime = currTime;
    }
}
