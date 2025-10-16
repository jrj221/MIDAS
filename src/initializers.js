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
        localStorage.setItem('cps', String(gameState.cps.value));

        localStorage.setItem('servantNum', String(gameState.servantNum.value));
        localStorage.setItem('servantEffect', String(gameState.servantEffect.value));
        localStorage.setItem('servantCost', String(gameState.servantCost.value));

        localStorage.setItem('merchantNum', String(gameState.merchantNum.value));
        localStorage.setItem('merchantEffect', String(gameState.merchantEffect.value));
        localStorage.setItem('merchantCost', String(gameState.merchantCost.value));

        localStorage.setItem('templeNum', String(gameState.templeNum.value));
        localStorage.setItem('templeEffect', String(gameState.templeEffect.value));
        localStorage.setItem('templeCost', String(gameState.templeCost.value));
    });
}

export function initBuildings(gameState) {
    const buildings = [
        'servant',
        'merchant',
        'temple',
    ]
    buildings.forEach((buildingID) => {
        const costKey = buildingID + "Cost";
        const numKey = buildingID + "Num";
        const effectKey = buildingID + "Effect";
        initBuilding(buildingID, gameState[effectKey], gameState.wealth, gameState.cps, gameState[numKey], gameState[costKey])
    });

    function initBuilding(buildingID, cpsEffect, wealth, cps, numBuilding, cost) {
        const servant = document.getElementById(buildingID)
        servant.addEventListener('click', () => {
            if (wealth.value >= cost.value) {
                numBuilding.value++;
                wealth.value -= cost.value;
                cost.value = Math.round(cost.value * 1.15);
                cps.value += cpsEffect.value;
            }
        });    
    }
}

export function updateWealth(wealth, cps) {
    wealth.value += cps.value;
}


export function getGameState() {
    const gameState = {
        wealth: { value: isNaN(Number(localStorage.getItem("wealth"))) ? 0 : Number(localStorage.getItem("wealth"))}, // sets wealth to be an object, which can be safely passed by reference into initCoin
        cps: { value: isNaN(Number(localStorage.getItem("cps"))) ? 0 : Number(localStorage.getItem("cps"))},
        
        servantNum: { value: isNaN(Number(localStorage.getItem("servantNum"))) ? 0 : Number(localStorage.getItem("servantNum"))},
        servantEffect: { value: isNaN(Number(localStorage.getItem("servantEffect"))) ? 0.1 : Number(localStorage.getItem("servantEffect"))},
        servantCost : { value: isNaN(Number(localStorage.getItem("servantCost"))) ? 10 : Number(localStorage.getItem("servantCost"))},
        
        merchantNum: { value: isNaN(Number(localStorage.getItem("merchantNum"))) ? 0 : Number(localStorage.getItem("merchantNum"))},
        merchantEffect: { value: isNaN(Number(localStorage.getItem("merchantEffect"))) ? 1 : Number(localStorage.getItem("merchantEffect"))},
        merchantCost : { value: isNaN(Number(localStorage.getItem("merchantCost"))) ? 100 : Number(localStorage.getItem("merchantCost"))},
        
        templeNum: { value: isNaN(Number(localStorage.getItem("templeNum"))) ? 0 : Number(localStorage.getItem("templeNum"))},
        templeEffect: { value: isNaN(Number(localStorage.getItem("templeEffect"))) ? 15 : Number(localStorage.getItem("templeEffect"))},
        templeCost : { value: isNaN(Number(localStorage.getItem("templeCost"))) ? 1000 : Number(localStorage.getItem("templeCost"))},
    }
    return gameState;
}


export function initResetButton(gameState) {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        localStorage.clear();
        resetGameState(gameState);
    });

    function resetGameState(gameState) {
        // localStorage.setItem('wealth', '0');
        // localStorage.setItem('cps', '0');
        // localStorage.setItem('servantNum', '0');
        // localStorage.setItem('servantCost', '10');
        // localStorage.setItem('merchantCost', '100');
        // localStorage.setItem('templeCost', '1000');
        gameState.wealth.value = 0;
        gameState.cps.value = 0;

        gameState.servantNum.value = 0;
        gameState.servantEffect.value = 0.1;
        gameState.servantCost.value = 10;
        
        gameState.merchantNum.value = 0;
        gameState.merchantEffect.value = 1;
        gameState.merchantCost.value = 100;
        
        gameState.templeNum.value = 0;
        gameState.templeEffect.value = 15;
        gameState.templeCost.value = 1000;
    }   
}


export function checkIfCanAfford(gameState) {
    // eventually loops over all the buildings or something
    const buildings = [
        'servant',
        'merchant',
        'temple',
    ]
    buildings.forEach((buildingID) => {
        const building = document.getElementById(buildingID);
        const costKey = buildingID + 'Cost'; // e.g. 'servantCost'
        if (gameState.wealth.value >= gameState[costKey].value) {
            building.classList.add('canAfford');
        }
        else {
            building.classList.remove('canAfford');
        }
    });
}