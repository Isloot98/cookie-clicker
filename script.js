let cookiesCount = 0;
let upgrades = {
  oven: [],
  grandma: [],
  factory: [],
  mine: [],
  bank: [],
};



const MyData = localStorage.getItem('MyAppData');
if (MyData) {
  const parsedData = JSON.parse(MyData);
  cookiesCount = parsedData.cookiesCount;
  upgrades = parsedData.upgrades;  
};


const saveData = () => {
  const dataToSave = {
    cookiesCount: cookiesCount,
    upgrades: upgrades,
  };

  const jsonString = JSON.stringify(dataToSave);
  localStorage.setItem('MyAppData', jsonString);
};



const updateCookiesCount = () => {
  const countElement = document.getElementById('cookies-count');
  countElement.textContent = cookiesCount;
  saveData();
}


const updatePowerUpCount = (type) => {
  const powerUpCountElement = document.querySelector(`.${type} #power-up-count`);
  powerUpCountElement.textContent = upgrades[type].length;
  saveData();

}

const buyUpgrades = (type) => {
  if (cookiesCount >= getUpgradeCost(type)) {
    cookiesCount -= getUpgradeCost(type);
    upgrades[type].push(1);
    updateCookiesCount();
    updatePowerUpCount(type);
    saveData();

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
    upgrades = {
      oven: [],
      grandma: [],
      factory: [],
      mine: [],
      bank: [],
    };
    updateCookiesCount();
    saveData();

  });

  const buyButtons = document.querySelectorAll('.buy-button');

  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const upgradeType = button.parentElement.parentElement.classList[1]; 
      buyUpgrades(upgradeType);
    });
  });
  
  updateCookiesCount(); 
});

const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModalBtn");

    openModalBtn.addEventListener("click", openModal);

    function openModal() {
        modal.style.display = "flex"; 
    }

    window.closeModal = function () {
        modal.style.display = "none"; 
    };

   

    document.getElementById("userInputForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const userInputValue = document.getElementById("userInput").value;
  
      updatePage(userInputValue);
      closeModal(); 
  });
  
  function updatePage(userInput) {
      const outputElement = document.getElementById("output");
      outputElement.textContent = `${userInput}'s Bakery`;
  }
  
