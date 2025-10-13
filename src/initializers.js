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

export function initSaveSystem(wealth) {
    window.addEventListener('beforeunload', () => {
        // maybe move this to a saveWealth function which can be called at intervals to backup not just when you close the tab
        localStorage.setItem('wealth', String(wealth.value));
    });
}