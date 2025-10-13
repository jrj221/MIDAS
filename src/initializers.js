// Functions to be called when the game first loads to initialize all sorts of things
// that don't necessary need to be called in the interval loop

export function initBuildingHover() {
    const buildings = document.querySelectorAll('.building');
    buildings.forEach(building => {
        building.addEventListener('mouseenter', () => {
            buildings.forEach(b => b.classList.remove('hovered'))
            building.classList.add('hovered');
        });
    });
    const buildingsContainer = document.querySelector('#buildings');
    buildingsContainer.addEventListener('mouseleave', () => {
        buildings.forEach(b => b.classList.remove('hovered'))
    });
}

export function initCoin(wealth) {
    const coin = document.getElementById('coin');
    coin.addEventListener('click', () => addWealth(coin))

    function addWealth(coin) {
        wealth.value++;
        coin.style.animation = "none";
        void coin.offsetWidth; /*this forces the browser to trigger a reflow so it doesn't ignore the animation attribute changing rapidly*/
        coin.style.animation = "bounce .4s ease";
    }
}

export function initSaveSystem(gameState) {
    window.addEventListener('beforeunload', () => {
        // maybe move this to a saveWealth function which can be called at intervals to backup not just when you close the tab
        localStorage.setItem('wealth', String(gameState.wealth.value));
        localStorage.setItem('cps', String(gameState.cps.value))
        localStorage.setItem('numServants', String(gameState.numServants.value))
        localStorage.setItem('servantCost', String(gameState.servantCost.value))
    });
}

export function initServant(wealth, cps, numServant, cost) {
    let effect = 1; // cps increase
    const servant = document.getElementById('servant')
    servant.addEventListener('click', () => {
        if (wealth.value >= cost.value) {
            numServant.value++;
            wealth.value -= cost.value;
            cost.value = Math.round(cost.value * 1.15);
            cps.value += effect;
        }
    });    
}

export function updateWealth(wealth, cps) {
    wealth.value += cps.value;
}

export function getGameState() {
    const gameState = {
        wealth: { value: isNaN(Number(localStorage.getItem("wealth"))) ? 0 : Number(localStorage.getItem("wealth"))}, // sets wealth to be an object, which can be safely passed by reference into initCoin
        cps: { value: isNaN(Number(localStorage.getItem("cps"))) ? 0 : Number(localStorage.getItem("cps"))},
        numServants: { value: isNaN(Number(localStorage.getItem("numServant"))) ? 0 : Number(localStorage.getItem("numServant"))},
        servantCost : { value: isNaN(Number(localStorage.getItem("servantCost"))) ? 10 : Number(localStorage.getItem("servantCost"))}
    }
    return gameState;
}

export function resetGameState(gameState) {
    // const keys = Object.keys(gameState);
    // for (let i = 0; i < keys.length; i++) {
    //     gameState[keys[i]].value = 0;
    //     // this will need to be changed once gameState is keeping track of stuff that isn't just numbers
    // }
    localStorage.setItem('wealth', '0');
    localStorage.setItem('cps', '0')
    localStorage.setItem('numServants', '0')
    localStorage.setItem('servantCost', '10')
    gameState.wealth.value = 0;
    gameState.cps.value = 0;
    gameState.numServants.value = 0;
    gameState.servantCost.value = 10;
}   