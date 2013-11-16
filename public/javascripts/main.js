'use strict';

(function() {
  
  var replenishmentRates = [
    [ { coal: 3, oil: 2, trash: 1, uranium: 1 }, { coal: 4, oil: 2, trash: 2, uranium: 1 }, { coal: 3, oil: 2, trash: 2, uranium: 1 } ],
    [ { coal: 4, oil: 2, trash: 1, uranium: 1 }, { coal: 5, oil: 3, trash: 2, uranium: 1 }, { coal: 3, oil: 4, trash: 3, uranium: 1 } ],
    [ { coal: 5, oil: 3, trash: 2, uranium: 1 }, { coal: 6, oil: 4, trash: 3, uranium: 2 }, { coal: 4, oil: 5, trash: 4, uranium: 2 } ],
    [ { coal: 5, oil: 4, trash: 3, uranium: 2 }, { coal: 7, oil: 5, trash: 3, uranium: 3 }, { coal: 5, oil: 6, trash: 5, uranium: 2 } ],
    [ { coal: 7, oil: 5, trash: 3, uranium: 2 }, { coal: 9, oil: 6, trash: 5, uranium: 3 }, { coal: 6, oil: 7, trash: 6, uranium: 3 } ]
  ];

  var step = {
    currentStep: 1,
    UIStep: document.getElementById('step'),

    getStep: function() {
      return this.currentStep;
    },

    setStep: function(step) {
      this.currentStep = step;
      this.UIStep.innerHTML = this.currentStep;
    }
  };

  var total = {
    total: 0,
    UITotal: document.getElementById('total'),

    getTotal: function() {
      return this.total;
    },

    updateTotal: function() {
      this.UITotal.innerHTML = '$' + this.total;
    },

    increaseTotal: function(val) {
      this.total += val;
      this.updateTotal();
    },

    decreaseTotal: function(val) {
      this.total -= val;
      this.updateTotal();
    },

    setTotal: function(val) {
      this.total = val;
      this.updateTotal();
    }
  };

  var resources = {
    coal: [],
    oil: [],
    trash: [],
    uranium: [],

    getCoal: function() {
      return this.coal;
    },

    getOil: function() {
      return this.oil;
    },

    getTrash: function() {
      return this.trash;
    },

    getUranium: function() {
      return this.uranium;
    },

    replenishResource: function (resourceType, resourceArray, step) {
      var players = document.getElementById('number_of_players').value;
      var rate = replenishmentRates[players - 2][step - 1][resourceType];
      
      var i = resourceArray.length - 1;
      var replenished = 0;
      for(; i >= 0 && replenished < rate; i--) {
        var resource = resourceArray[i];
        if(!resource.available) {
          resource.available = true;
          resource.onBoard = true;
          setResourceUI(document.getElementById(resourceType + '_' + i), true);
          replenished++;
        }
      }
    },

    replenish: function () {
      var currentStep = step.getStep();

      this.replenishResource('coal', this.coal, currentStep);
      this.replenishResource('oil', this.oil, currentStep);
      this.replenishResource('trash', this.trash, currentStep);
      this.replenishResource('uranium', this.uranium, currentStep);
    },

    setupResource: function(resourceName, resourceArray, totalResources, upTo) {
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
    },

    initialize: function() {
      this.setupResource('coal', this.coal, 24, 0);
      this.setupResource('oil', this.oil, 24, 6);
      this.setupResource('trash', this.trash, 24, 18);
      this.setupResource('uranium', this.uranium, 12, 10);
    }
  };

  function createEventHandler(resourceType, resourceArray, el, index) {
    el.addEventListener('click', function() {
        resourceClicked(resourceType, resourceArray, resourceArray[index].available);
      },
      false);
  }

  function createLayout(resourceType, resourceArray, element) {
    var el = document.getElementById(element);
    var parent = el.parentNode;
    
    for(var i = resourceArray.length - 1; i >= 0; i--) {
      var resource_el = document.createElement('div');
      resource_el.className = resourceType + '_display';
      resource_el.id = resourceType + '_' + i;
      
      parent.insertBefore(resource_el, el.nextSibling);

      createEventHandler(resourceType, resourceArray, resource_el, i);

      setResourceUI(resource_el, resourceArray[i].available);
    }
  }

  function setResourceUI(el, available) {
    var content = available ? '' : 'X';

    if(typeof el === 'object') {
      el.innerHTML = '<span>' + content + '</span>';
    }
    else {
      var block = document.getElementById(el);
      block.innerHTML = '<span>' + content + '</span>';
    }
  }

  function takeAwayResource(resourceType, resourceArray, available) {
    var done = false;
    var max = resourceArray.length;
    var resource;

    for(var i = 0; i < max && !done; i++) {
      resource = resourceArray[i];
      if(resource.available === available && resource.onBoard) {
        done = true;
        resource.available = !available;
        setResourceUI(resourceType + '_' + i, false);
        total.increaseTotal(resource.price);
      }
    }
  }

  function putBackResource(resourceType, resourceArray, available) {
    var done = false;
    var resource;

    for(var i = resourceArray.length - 1; i >= 0 && !done; i--) {
      resource = resourceArray[i];
      if(resource.available === available && resource.onBoard) {
        done = true;
        resource.available = !available;
        setResourceUI(resourceType + '_' + i, true);
        total.decreaseTotal(resource.price);
      }
    }
  }

  function resourceClicked(resourceType, resourceArray, available) {
    if(available) {
      takeAwayResource(resourceType, resourceArray, available);
    }

    if(!available) {
      putBackResource(resourceType, resourceArray, available);
    }
  }

  function removeResources(resourceArray) {
    var max = resourceArray.length;
    for(var i = 0; i < max; i++) {
      var resource = resourceArray[i];
      if(!resource.available) {
        resource.onBoard = false;
      }
    }
  }

  function buyResources() {
    removeResources(resources.getCoal());
    removeResources(resources.getOil);
    removeResources(resources.getTrash());
    removeResources(resources.getUranium());

    total.setTotal(0);
  }

  resources.initialize();
  
  createLayout('coal', resources.getCoal(), 'coal_label');
  createLayout('oil', resources.getOil(), 'oil_label');
  createLayout('trash', resources.getTrash(), 'trash_label');
  createLayout('uranium', resources.getUranium(), 'uranium_label');

  var step1 = document.getElementById('step1');
  var step2 = document.getElementById('step2');
  var step3 = document.getElementById('step3');
  var buy = document.getElementById('buy');
  var replenish = document.getElementById('replenish');

  step1.addEventListener('click', function() {
    step.setStep(1);
  }, false);
  
  step2.addEventListener('click', function() {
    step.setStep(2);
  }, false);
  
  step3.addEventListener('click', function() {
    step.setStep(3);
  }, false);
  
  buy.addEventListener('click', function() {
    buyResources();
  }, false);
  
  replenish.addEventListener('click', function () {
     resources.replenish.apply(resources);
   }, false);

}());