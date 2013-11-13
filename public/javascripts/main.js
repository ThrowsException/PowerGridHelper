'use strict';

var coal = [];
var oil = [];
var trash = [];
var uranium = [];

function setupResource(resourceName, resourceArray, totalResources, upTo) {
  var price = 1;
  for (var i = 1; i <= totalResources; i++) {
    if(i <= upTo) {
      resourceArray.push({ price: price, available: false, onBoard: false });
    }
    else {
      resourceArray.push({ price: price, available: true, onBoard: true });
    }
    if(resourceName === 'uranium') {
      if(i >= 8) {
          price += 2;
        }
        else {
          price++;
        }
    }
    else {
      if(i >= 3 && (i%3 === 0)) {
        price++;
      }
    }
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
  
  setupResource('coal', coal, 24, 0);
  setupResource('oil', oil, 24, 6);
  setupResource('trash', trash, 24, 18);
  setupResource('uranium', uranium, 12, 10);

  createLayout('coal', coal, 'coal_label');
  createLayout('oil', oil, 'oil_label');
  createLayout('trash', trash, 'trash_label');
  createLayout('uranium', uranium, 'uranium_label');
}());