define([ ], function() {
  var Utils = {};

  Utils.UID_PROPERTY = '_uid_' + (Math.random() * 10e9);
  Utils._uidCounter = 0;

  Utils.getUid = function(obj) {
    return obj[Utils.UID_PROPERTY] ||
        (obj[Utils.UID_PROPERTY] = Utils._uidCounter++);
  };

  Utils.getArray = function(collection) {
    if (typeof collection.toArray === 'function'){
      return collection.toArray();
    }else if (typeof collection.values === 'function') {
      return collection.values();
    }
    return collection;
  };

  Utils.compareElements = function(element1, element2) {
    return element1 === element2 || ( typeof element1 === 'object' &&
        typeof element1.equals === 'function' && typeof element2 === 'object' &&
        typeof element2.equals === 'function' && element1.equals(element2)
      );
  };
  return Utils;
});
