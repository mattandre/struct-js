define([ 'src/ArrayList' ], function( ArrayList ) {
	describe('ArrayList', function() {

		function buildEmptyArrayList() {
			return new ArrayList();
		}

		function buildArrayList() {
			var l = buildEmptyArrayList();
			l.add('a');
			l.add('b');
			l.add('c');
			l.add('d');
			return l;
		}

		describe('constructor', function() {
			it( 'should create empty list when called with no parameters', function() {
				var list = new ArrayList();
				expect(list.isEmpty()).toBe(true);
			});

			it( 'should create filled list when called with array as parameter', function() {
				var list = new ArrayList([ 'a', 'b', 'c', 'd' ]);
				expect(list.size()).toBe(4);
			});

			it( 'should create filled list when called with arraylist as parameter', function() {
				var list1 = new ArrayList([ 'a', 'b', 'c', 'd' ]),
						list2 = new ArrayList(list1);
				expect(list2.size()).toBe(list1.size());
			});
		});

		describe('add', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return false when index < 0', function() {
				expect(list.add('f', -1)).toBe(false);
			});

			it( 'should return false when index > list length', function() {
				expect(list.add('f', list.size() + 1)).toBe(false);
			});

			it( 'should return true when added with no index', function() {
				expect(list.add('f')).toBe(true);
			});

			it( 'should be added to end when no index specified', function() {
				var element = { 'a': 'a' };
				list.add(element);
				expect(list.get(list.size() - 1)).toBe(element);
			});

			it( 'should be added to start when index 0 specified', function() {
				var element = { 'a': 'a' };
				list.add(element, 0);
				expect(list.get(0)).toBe(element);
			});

			it( 'should be added to correct position when index specified', function() {
				var element = { 'a': 'a' };
				list.add(element, 2);
				expect(list.get(2)).toBe(element);
			});
		});

		describe('addAll', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return false when index < 0', function() {
				expect(list.addAll([ 'f', 'g' ], -1)).toBe(false);
			});

			it( 'should return false when index > list length', function() {
				expect(list.addAll([ 'f', 'g' ], list.size() + 1)).toBe(false);
			});

			it( 'should return true when added with no index', function() {
				expect(list.addAll([ 'f', 'g' ])).toBe(true);
			});

			it( 'should be added to end when no index specified', function() {
				var l = [ { 'a': 'a' }, { 'a': 'b' } ];
				list.addAll(l);
				expect(list.get(list.size() - 2)).toBe(l[0]);
				expect(list.get(list.size() - 1)).toBe(l[1]);
			});

			it( 'should be added to start when index 0 specified', function() {
				var l = [ { 'a': 'a' }, { 'a': 'b' } ];
				list.addAll(l, 0);
				expect(list.get(0)).toBe(l[0]);
				expect(list.get(1)).toBe(l[1]);
			});

			it( 'should be added to correct position when index specified', function() {
				var l = [ { 'a': 'a' }, { 'a': 'b' } ];
				list.addAll(l, 3);
				expect(list.get(3)).toBe(l[0]);
				expect(list.get(4)).toBe(l[1]);
			});

		});

		describe('clear', function() {
			var list1, list2;

			beforeEach(function() {
				list1 = buildEmptyArrayList();
				list2 = buildArrayList();
			});

			afterEach(function() {
				list1 = list2 = null;
			});

			it( 'should make empty list become empty', function() {
				expect(list1.isEmpty()).toBe(true);
				list1.clear();
				expect(list1.isEmpty()).toBe(true);
			});

			it( 'should make filled list become empty', function() {
				expect(list2.isEmpty()).toBe(false);
				list2.clear();
				expect(list2.isEmpty()).toBe(true);
			});
		});

		describe('clone', function() {
			var list1, list2;

			beforeEach(function() {
				list1 = buildEmptyArrayList();
				list2 = buildArrayList();
			});

			afterEach(function() {
				list1 = list2 = null;
			});

			it( 'should return copy of empty list', function() {
				var list = list1.clone();
				expect(list.size()).toBe(list1.size());
			});

			it( 'should return copy of filled list', function() {
				var list = list2.clone();
				expect(list.size()).toBe(list2.size());
			});

			it( 'should return new copy', function() {
				var list = list2.clone();
				expect(list).not.toBe(list2);
			});
		});

		describe('contains', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return true for element in list', function() {
				expect(list.contains('a')).toBe(true);
			});

			it( 'should return false for element not in list', function() {
				expect(list.contains('z')).toBe(false);
			});

			it( 'should return false for empty list', function() {
				list.clear();
				expect(list.contains('a')).toBe(false);
			});
		});

		describe('each', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should make one call for each element', function() {
				var numCalls = 0;
				list.each(function() {
					numCalls++;
				});
				expect(numCalls).toBe(list.size());
			});

			it( 'should pass the correct parameters for each call', function() {
				list.each(function(value, index) {
					expect(value).toBe(list.get(index));
				});
			});

			it( 'should make the calls in the correct order', function() {
				var i, length,
						array1 = [],
						array2 = list.toArray();
				list.each(function(value) {
					array1.push(value);
				});
				for (i = 0, length = list.size(); i < length; i++) {
					expect(array1[i]).toBe(array2[i]);
				}
			});
		});

		describe('equals', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return true for itself', function() {
				expect(list.equals(list)).toBe(true);
			});

			it( 'should return true for clone of itself', function() {
				expect(list.equals(list.clone())).toBe(true);
			});

			it( 'should return false for non ArrayList', function() {
				expect(list.equals({})).toBe(false);
			});

			it( 'should return false for different lists', function() {
				var otherList = list.clone();
				otherList.set(2, 'z');
				expect(list.equals(otherList)).toBe(false);
			});
		});

		describe('get', function() {
			var list1, list2;

			beforeEach(function() {
				list1 = buildEmptyArrayList();
				list2 = buildArrayList();
			});

			afterEach(function() {
				list1 = list2 = null;
			});

			it( 'should return undefined when index < 0', function() {
				var index = -1;
				expect(list2.get(index)).toBeUndefined();
			});

			it( 'should return undefined when index >= length', function() {
				expect(list2.get(list2.size())).toBeUndefined();
			});

			it( 'should return undefined when called on empty list', function() {
				expect(list1.get(0)).toBeUndefined();
			});

			it( 'should return correct element for index', function() {
				expect(list2.get(2)).toBe('c');
			});
		});

		describe('indexOf', function() {
			var list;

			beforeEach(function() {
				list = new ArrayList([ 'a', 'b', 'b', 'a' ]);
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return correct index for element in list', function() {
				expect(list.indexOf('a')).toBe(0);
			});

			it( 'should return -1 for element not in list', function() {
				var expectedValue = -1;
				expect(list.indexOf('z')).toBe(expectedValue);
			});
		});

		describe('isEmpty', function() {
			var list1, list2;

			beforeEach(function() {
				list1 = buildEmptyArrayList();
				list2 = buildArrayList();
			});

			afterEach(function() {
				list1 = list2 = null;
			});

			it( 'should return true on empty list', function() {
				expect(list1.isEmpty()).toBe(true);
			});

			it( 'should return false on filled list', function() {
				expect(list2.isEmpty()).toBe(false);
			});
		});

		describe('lastIndexOf', function() {
			var list;

			beforeEach(function() {
				list = new ArrayList([ 'a', 'b', 'b', 'a' ]);
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return correct index for element in list', function() {
				expect(list.lastIndexOf('a')).toBe(3);
			});

			it( 'should return -1 for element not in list', function() {
				var expectedValue = -1;
				expect(list.lastIndexOf('z')).toBe(expectedValue);
			});
		});

		describe('removeAt', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return undefined when index < 0', function() {
				var index = -1;
				expect(list.removeAt(index)).toBeUndefined();
			});

			it( 'should return undefined when index >= length', function() {
				expect(list.removeAt(list.size())).toBeUndefined();
			});

			it( 'should decrease the size for index within bounds', function() {
				var expectedValue = list.size() - 1;
				list.removeAt(2);
				expect(list.size()).toBe(expectedValue);
			});

			it( 'should not change the size for index outside of bounds', function() {
				var expectedValue = list.size();
				list.removeAt(10);
				expect(list.size()).toBe(expectedValue);
			});

			it( 'should return correct element', function() {
				var expectedValue = list.get(2);
				expect(list.removeAt(2)).toBe(expectedValue);
			});
		});

		describe('remove', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return false if not in list', function() {
				expect(list.remove('z')).toBe(false);
			});

			it( 'should return true if in list', function() {
				expect(list.remove('b')).toBe(true);
			});

			it( 'should decrease the size if in list', function() {
				var expectedValue = list.size() - 1;
				list.remove('b');
				expect(list.size()).toBe(expectedValue);
			});

			it( 'should not change the size if not in list', function() {
				var expectedValue = list.size();
				list.remove('z');
				expect(list.size()).toBe(expectedValue);
			});

		});

		describe('removeAll', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return false if all not in list', function() {
				expect(list.removeAll([ 'x', 'y', 'z' ])).toBe(false);
			});

			it( 'should return true if at least one in list', function() {
				expect(list.removeAll([ 'x', 'a', 'z' ])).toBe(true);
			});

			it( 'should return true if all in list', function() {
				expect(list.removeAll([ 'a', 'b', 'c' ])).toBe(true);
			});

			it( 'should decrease the size by correct amount', function() {
				var expectedValue = list.size() - 2;
				list.removeAll([ 'x', 'a', 'b' ]);
				expect(list.size()).toBe(expectedValue);
			});

			it( 'should not change the size if not in list', function() {
				var expectedValue = list.size();
				list.removeAll([ 'x', 'y', 'z' ]);
				expect(list.size()).toBe(expectedValue);
			});

		});

		describe('size', function() {
			var list1, list2;

			beforeEach(function() {
				list1 = buildEmptyArrayList();
				list2 = buildArrayList();
			});

			afterEach(function() {
				list1 = list2 = null;
			});

			it( 'should return 0 on empty list', function() {
				expect(list1.size()).toBe(0);
			});

			it( 'should return correct value', function() {
				expect(list2.size()).toBe(4);
			});

			it( 'should return correct value after adding', function() {
				list2.add('e');
				expect(list2.size()).toBe(5);
			});

			it( 'should return correct value after removing', function() {
				list2.removeAt(2);
				expect(list2.size()).toBe(3);
			});
		});

		describe('set', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return undefined when index < 0', function() {
				var index = -1;
				expect(list.set(index, 'z')).toBeUndefined();
			});

			it( 'should return undefined when index >= length', function() {
				expect(list.set(list.size(), 'z')).toBeUndefined();
			});

			it( 'should update correct index', function() {
				list.set(2, 'z');
				expect(list.get(2)).toBe('z');
			});

			it( 'should return original value', function() {
				expect(list.set(1, 'z')).toBe('b');
			});
		});

		describe('sort', function() {
			var list;

			beforeEach(function() {
				list = new ArrayList([ 4, 1, 3, 2 ]);
			});

			afterEach(function() {
				list = null;
			});

			it( 'should sort list in ascending order', function() {
				list.sort();
				for (var i = 1, length = list.size(); i < length; i++) {
					expect(list.get(i - 1) <= list.get(i)).toBe(true);
				}
			});

			it( 'should sort list according to comparator', function() {
				var i, length,
						compare = function(a, b) {
							return b - a;
						};
				list.sort(compare);
				for (i = 1, length = list.size(); i < length; i++) {
					expect(compare(list.get(i - 1), list.get(i)) <= 0).toBe(true);
				}
			});
		});

		describe('subList', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return empty list when start index >= end index', function() {
				expect(list.subList(2, 0).size()).toBe(0);
			});

			it( 'should return empty list when start index == end index', function() {
				expect(list.subList(2, 2).size()).toBe(0);
			});

			it( 'should return subList of correct size', function() {
				expect(list.subList(1, 3).size()).toBe(2);
			});

			it( 'should return subList with correct elements', function() {
				var sublist = list.subList(1, 3);
				expect(sublist.get(0)).toBe('b');
				expect(sublist.get(1)).toBe('c');
			});

			it( 'should return subList of correct size when start index < 0', function() {
				expect(list.subList(0 - 1, 3).size()).toBe(4);
			});

			it( 'should return subList with correct elements when start index < 0', function() {
				var sublist = list.subList(0 - 1, 3);
				expect(sublist.get(0)).toBe('d');
				expect(sublist.get(1)).toBe('a');
				expect(sublist.get(2)).toBe('b');
				expect(sublist.get(3)).toBe('c');
			});

			it( 'should return subList of correct size when end index > length', function() {
				expect(list.subList(1, 6).size()).toBe(5);
			});

			it( 'should return subList with correct elements when end index > length', function() {
				var sublist = list.subList(1, 6);
				expect(sublist.get(0)).toBe('b');
				expect(sublist.get(1)).toBe('c');
				expect(sublist.get(2)).toBe('d');
				expect(sublist.get(3)).toBe('a');
				expect(sublist.get(4)).toBe('b');
			});

			it( 'should return subList of correct size when start index < 0 and end index > length', function() {
				expect(list.subList(0 - 2, 6).size()).toBe(8);
			});

			it( 'should return subList with correct elements when start index < 0 and end index > length', function() {
				var sublist = list.subList(0 - 2, 6);
				expect(sublist.get(0)).toBe('c');
				expect(sublist.get(1)).toBe('d');
				expect(sublist.get(2)).toBe('a');
				expect(sublist.get(3)).toBe('b');
				expect(sublist.get(4)).toBe('c');
				expect(sublist.get(5)).toBe('d');
				expect(sublist.get(6)).toBe('a');
				expect(sublist.get(7)).toBe('b');
			});
		});

		describe('toArray', function() {
			var list;

			beforeEach(function() {
				list = buildArrayList();
			});

			afterEach(function() {
				list = null;
			});

			it( 'should return array of same size', function() {
				expect(list.toArray().length).toBe(list.size());
			});

			it( 'should contain all elements of returned array', function() {
				for (var array = list.toArray(), i = 0, length = array.length; i < length; i++) {
					expect(list.contains(array[i])).toBe(true);
				}
			});
		});

	});

});
