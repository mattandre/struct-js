define([ 'src/ArrayList' ], function( ArrayList ) {
	describe('Main', function() {
		it( 'Should expect correct logic.', function() {
			expect(new ArrayList()).toBeTruthy();
		});
		it( 'Should expect invalid logic.', function() {
			expect(true).toBeTruthy();
		});
	});
});
