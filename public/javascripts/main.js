"use strict";

var coal = [];
var oil = [];
var trash = [];
var uranium = [];

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

function createLayout(resourceType, resourceArray, element) {
  var el = document.getElementById(element);
  var parent = el.parentNode;
  for(var i = 0; i < resourceArray.length; i++) {
    var d = document.createElement('span');
    d.className += resourceType + '_display';
    parent.insertBefore(d, el.nextSibling);
  }
}

(function() {
  
  initializeResources();

  createLayout("coal", coal, "coal_label");
  createLayout("oil", oil, "oil_label");
  createLayout("trash", trash, "trash_label");
  createLayout("uranium", uranium, "uranium_label");
}());