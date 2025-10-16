import { initBuildingHover, initCoin, initSaveSystem, initBuildings, updateWealth, getGameState, initResetButton, checkIfCanAfford } from "./initializers";

setInterval(() => {
    Game();
}, 100); // repeats Game() every 1000ms (1 second)

var lastTime = 0 // timestamp of last time we updated wealth
const gameState = getGameState();

initCoin(gameState.wealth);
initBuildingHover();
initSaveSystem(gameState);
initBuildings(gameState);
initResetButton(gameState);


function Game() {
    const wealthText = document.getElementById('wealthText');
    wealthText.textContent = `${Math.floor(gameState.wealth.value)} Coins`;
    const cpsText = document.getElementById('cpsText');
    cpsText.textContent = `per Second: ${gameState.cps.value.toFixed(1)}`;
    const servantCostText = document.getElementById('servantCostText');
    servantCostText.textContent = `${gameState.servantCost.value}`;
    const merchantCostText = document.getElementById('merchantCostText');
    merchantCostText.textContent = `${gameState.merchantCost.value}`;
    const templeCostText = document.getElementById('templeCostText');
    templeCostText.textContent = `${gameState.templeCost.value}`

    
    checkIfCanAfford(gameState);

    let currTime = performance.now(); // time in milliseconds since page started
    if (((currTime - lastTime) / 1000) >= 1) { // its been 1 second since we updated wealth
        updateWealth(gameState.wealth, gameState.cps);
        lastTime = currTime;
    }
}
