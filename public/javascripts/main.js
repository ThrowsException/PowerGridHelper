'use strict';

var coal = [];
var oil = [];
var trash = [];
var uranium = [];
var price = 0;

function initializeResources() {

  coal = [
    { price: 1, available: true, onBoard: true }, { price: 1, available: true, onBoard: true }, { price: 1, available: true, onBoard: true },
    { price: 2, available: true, onBoard: true }, { price: 2, available: true, onBoard: true }, { price: 2, available: true, onBoard: true },
    { price: 3, available: true, onBoard: true }, { price: 3, available: true, onBoard: true }, { price: 3, available: true, onBoard: true },
    { price: 4, available: true, onBoard: true }, { price: 4, available: true, onBoard: true }, { price: 4, available: true, onBoard: true },
    { price: 5, available: true, onBoard: true }, { price: 5, available: true, onBoard: true }, { price: 5, available: true, onBoard: true },
    { price: 6, available: true, onBoard: true }, { price: 6, available: true, onBoard: true }, { price: 6, available: true, onBoard: true },
    { price: 7, available: true, onBoard: true }, { price: 7, available: true, onBoard: true }, { price: 7, available: true, onBoard: true },
    { price: 8, available: true, onBoard: true }, { price: 8, available: true, onBoard: true }, { price: 8, available: true, onBoard: true }
  ];
  
  oil = [
    { price: 1, available: false, onBoard: false }, { price: 1, available: false, onBoard: false }, { price: 1, available: false, onBoard: false },
    { price: 2, available: false, onBoard: false }, { price: 2, available: false, onBoard: false }, { price: 2, available: false, onBoard: false },
    { price: 3, available: true, onBoard: true }, { price: 3, available: true, onBoard: true }, { price: 3, available: true, onBoard: true },
    { price: 4, available: true, onBoard: true }, { price: 4, available: true, onBoard: true }, { price: 4, available: true, onBoard: true },
    { price: 5, available: true, onBoard: true }, { price: 5, available: true, onBoard: true }, { price: 5, available: true, onBoard: true },
    { price: 6, available: true, onBoard: true }, { price: 6, available: true, onBoard: true }, { price: 6, available: true, onBoard: true },
    { price: 7, available: true, onBoard: true }, { price: 7, available: true, onBoard: true }, { price: 7, available: true, onBoard: true },
    { price: 8, available: true, onBoard: true }, { price: 8, available: true, onBoard: true }, { price: 8, available: true, onBoard: true }
  ];
  
  trash = [
    { price: 1, available: false, onBoard: false }, { price: 1, available: false, onBoard: false }, { price: 1, available: false, onBoard: false },
    { price: 2, available: false, onBoard: false }, { price: 2, available: false, onBoard: false }, { price: 2, available: false, onBoard: false },
    { price: 3, available: false, onBoard: false }, { price: 3, available: false, onBoard: false }, { price: 3, available: false, onBoard: false },
    { price: 4, available: false, onBoard: false }, { price: 4, available: false, onBoard: false }, { price: 4, available: false, onBoard: false },
    { price: 5, available: false, onBoard: false }, { price: 5, available: false, onBoard: false }, { price: 5, available: false, onBoard: false },
    { price: 6, available: false, onBoard: false }, { price: 6, available: false, onBoard: false }, { price: 6, available: false, onBoard: false },
    { price: 7, available: true, onBoard: true }, { price: 7, available: true, onBoard: true }, { price: 7, available: true, onBoard: true },
    { price: 8, available: true, onBoard: true }, { price: 8, available: true, onBoard: true }, { price: 8, available: true, onBoard: true }
  ];

  uranium = [
    { price: 1, available: false, onBoard: false },
    { price: 2, available: false, onBoard: false },
    { price: 3, available: false, onBoard: false },
    { price: 4, available: false, onBoard: false },
    { price: 5, available: false, onBoard: false },
    { price: 6, available: false, onBoard: false },
    { price: 7, available: false, onBoard: false },
    { price: 8, available: false, onBoard: false },
    { price: 10, available: false, onBoard: false },
    { price: 12, available: false, onBoard: false },
  {
    price: 14,
    available: true,
    onBoard: true
  }, {
    price: 16,
    available: true,
    onBoard: true
  },
  ];
}

function setupResource(resourceName) {
  var price = 1;
  switch(resourceName) {
    case 'coal':
      for (var i = 1; i <= 24; i++) {
        coal.push({ price: price, available: true, onBoard: true });
        if(i >= 3 && (i%3 === 0)) {
          price++;
        }
      }
      break;
    case 'oil':
      for (var i = 1; i <= 24; i++) {
        if(i <= 6) {
          oil.push({ price: price, available: false, onBoard: false });
        }
        else {
          oil.push({ price: price, available: true, onBoard: true });
        }
        if(i >= 3 && (i%3 === 0)) {
          price++;
        }
      }
      break;
    case 'trash':
      for (var i = 1; i <= 24; i++) {
        if(i <= 18) {
          trash.push({ price: price, available: false, onBoard: false });
        }
        else {
          trash.push({ price: price, available: true, onBoard: true });
        }
        if(i >= 3 && (i%3 === 0)) {
          price++;
        }
      }
      break;
    case 'uranium':
      for (var i = 1; i <= 12; i++) {
        if(i <= 10) {
          uranium.push({ price: price, available: false, onBoard: false });
        }
        else {
          uranium.push({ price: price, available: true, onBoard: true });
        }
        if(i >= 8) {
          price += 2;
        }
        else {
          price++;
        }
      }
      break;
  }
}

function createEventHandler(resourceType, resourceArray, i) {
  var d = document.getElementById(resourceType + '_' + i);
  d.addEventListener('click', function() { resourceClicked(resourceType, resourceArray, resourceArray[i].available); }, false );
}

function createLayout(resourceType, resourceArray, element) {
  var el = document.getElementById(element);
  var parent = el.parentNode;
  var i = resourceArray.length - 1;
  
  for(; i >= 0; i--) {
    var d = document.createElement('div');
    d.className = resourceType + '_display';
    d.id = resourceType + '_' + i;
    
    parent.insertBefore(d, el.nextSibling);
  }

  i = resourceArray.length - 1;
  for(; i >= 0; i--) {
    createEventHandler(resourceType, resourceArray, i);
  }
}

function resourceClicked(resourceType, resourceArray, available) {
  var done = false;
  var resource, block, i = 0, max = 0;
  var total = document.getElementById('total');
  if(available) {
    max = resourceArray.length;

    for(i = 0; i < max && !done; i++) {
      resource = resourceArray[i];
      if(resource.available === available && resource.onBoard) {
        done = true;
        resource.available = !available;
        block = document.getElementById(resourceType + '_' + i);
        block.innerHTML = '<span>X</span>';
        price += resource.price;
      }
    }
  }

  if(!available) {
    for(i = resourceArray.length - 1; i >= 0 && !done; i--) {
      resource = resourceArray[i];
      if(resource.available === available && resource.onBoard) {
        done = true;
        resource.available = !available;
        block = document.getElementById(resourceType + '_' + i);
        block.innerHTML = '';
        price -= resource.price;
      }
    }
  }
  total.innerHTML = '$' + price;
}

(function() {
  
  setupResource('coal');
  setupResource('oil');
  setupResource('trash');
  setupResource('uranium');

  createLayout('coal', coal, 'coal_label');
  createLayout('oil', oil, 'oil_label');
  createLayout('trash', trash, 'trash_label');
  createLayout('uranium', uranium, 'uranium_label');
}());