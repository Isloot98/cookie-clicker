let cookiesCount = 0;
const upgrades = {
  oven: [],
  grandma: [],
  factory: [],
  mine: [],
  bank: [],
};


const updateCookiesCount = () => {
  const countElement = document.getElementById('cookies-count');
  countElement.textContent = cookiesCount;
}

const updatePowerUpCount = (type) => {
  const powerUpCountElement = document.querySelector(`.${type} #power-up-count`);
  powerUpCountElement.textContent = upgrades[type].length;
}

const buyUpgrades = (type) => {
  if (cookiesCount >= getUpgradeCost(type)) {
    cookiesCount -= getUpgradeCost(type);
    upgrades[type].push(1);
    updateCookiesCount();
    updatePowerUpCount(type);
  } else {
    alert('Not enough cookies to buy this upgrade!');
  }
}

const getUpgradeCost = (type) => {
  switch (type) {
    case 'oven':
      return 100;
    case 'grandma':
      return 1000;
    case 'factory':
      return 10000;
    case 'mine':
      return 100000;
    case 'bank':
      return 1000000;
    default:
      return 0;
  }
}



const increaseCookiesTimer = () => {
  cookiesCount++;
  updateCookiesCount();
}

setInterval(increaseCookiesTimer, 1000);

const increaseCookiesUpgrades = (type) => {
    upgrades[type].forEach(() => {
      switch (type) {
        case 'oven':
          cookiesCount += 10;
          break;
        case 'grandma':
          cookiesCount += 100;
          break;
        case 'factory':
          cookiesCount += 1000;
          break;
        case 'mine':
          cookiesCount += 10000;
          break;
        case 'bank':
          cookiesCount += 100000;
          break;
      }
    });
  };
  
  setInterval(function() {
    for (const type in upgrades) {
      if (upgrades.hasOwnProperty(type)) {
        increaseCookiesUpgrades(type);
      }
    }
  }, 1000);
  

document.addEventListener('DOMContentLoaded', function() {
  const cookieButton = document.querySelector('.cookie');
  
  cookieButton.addEventListener('click', function() {
    cookiesCount++;
    updateCookiesCount();
  });

  const resetButton = document.querySelector('.reset');
    
  resetButton.addEventListener('click', function() {
    cookiesCount = 0;
    updateCookiesCount();
  });

  const buyButtons = document.querySelectorAll('.buy-button');

  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const upgradeType = button.parentElement.parentElement.classList[1]; // Assumes the second class is the upgrade type
      buyUpgrades(upgradeType);
    });
  });
  
  updateCookiesCount(); 
});

