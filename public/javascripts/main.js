'use strict';

var coal = [];
var oil = [];
var trash = [];
var uranium = [];
var price = 0;

function initializeResources() {

  coal = [
    { price: 1, available: true }, { price: 1, available: true }, { price: 1, available: true },
    { price: 2, available: true }, { price: 2, available: true }, { price: 2, available: true },
    { price: 3, available: true }, { price: 3, available: true }, { price: 3, available: true },
    { price: 4, available: true }, { price: 4, available: true }, { price: 4, available: true },
    { price: 5, available: true }, { price: 5, available: true }, { price: 5, available: true },
    { price: 6, available: true }, { price: 6, available: true }, { price: 6, available: true },
    { price: 7, available: true }, { price: 7, available: true }, { price: 7, available: true },
    { price: 8, available: true }, { price: 8, available: true }, { price: 8, available: true }
  ];
  
  oil = [
    { price: 1, available: false }, { price: 1, available: false }, { price: 1, available: false },
    { price: 2, available: false }, { price: 2, available: false }, { price: 2, available: false },
    { price: 3, available: true }, { price: 3, available: true }, { price: 3, available: true },
    { price: 4, available: true }, { price: 4, available: true }, { price: 4, available: true },
    { price: 5, available: true }, { price: 5, available: true }, { price: 5, available: true },
    { price: 6, available: true }, { price: 6, available: true }, { price: 6, available: true },
    { price: 7, available: true }, { price: 7, available: true }, { price: 7, available: true },
    { price: 8, available: true }, { price: 8, available: true }, { price: 8, available: true }
  ];
  
  trash = [
    { price: 1, available: false }, { price: 1, available: false }, { price: 1, available: false },
    { price: 2, available: false }, { price: 2, available: false }, { price: 2, available: false },
    { price: 3, available: false }, { price: 3, available: false }, { price: 3, available: false },
    { price: 4, available: false }, { price: 4, available: false }, { price: 4, available: false },
    { price: 5, available: false }, { price: 5, available: false }, { price: 5, available: false },
    { price: 6, available: false }, { price: 6, available: false }, { price: 6, available: false },
    { price: 7, available: true }, { price: 7, available: true }, { price: 7, available: true },
    { price: 8, available: true }, { price: 8, available: true }, { price: 8, available: true }
  ];

  uranium = [
    { price: 1, available: false },
    { price: 2, available: false },
    { price: 3, available: false },
    { price: 4, available: false },
    { price: 5, available: false },
    { price: 6, available: false },
    { price: 7, available: false },
    { price: 8, available: false },
    { price: 10, available: false },
    { price: 12, available: false },
  {
    price: 14,
    available: true
  }, {
    price: 16,
    available: true
  },
  ];

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
    var d = document.createElement('span');
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
      if(resource.available === available) {
        done = true;
        resource.available = !available;
        block = document.getElementById(resourceType + '_' + i);
        block.innerHTML = 'X';
      }
    }

    price += resource.price;
  }

  if(!available) {
    for(i = resourceArray.length - 1; i >= 0 && !done; i--) {
      resource = resourceArray[i];
      if(resource.available === available) {
        done = true;
        resource.available = !available;
        block = document.getElementById(resourceType + '_' + i);
        block.innerHTML = '';
      }
    }

    price -= resource.price;
  }
  total.innerHTML = '$' + price;
}

(function() {
  
  initializeResources();

  createLayout('coal', coal, 'coal_label');
  createLayout('oil', oil, 'oil_label');
  createLayout('trash', trash, 'trash_label');
  createLayout('uranium', uranium, 'uranium_label');
}());