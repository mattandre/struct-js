define([ ], function() {
	/**
	 * StringBuffer Class that allows creation of string
	 *
	 * @param {*} str String to initialize buffer with.
	 */
	var StringBuffer = function(str) {
		this.buffer = '';
		if (str) {
			this.append(str);
		}
	};

	/**
	 * Sets the contents of the string buffer
	 *
	 * @param {*} str String to set.
	 */
	StringBuffer.prototype.set = function(str) {
		this.buffer = '' + str;
	};

	/**
	 * Appends a string to the buffer.
	 *
	 * @param {*} str String to be appended.
	 * @return {StringBuffer} This same StringBuffer object.
	 */
	StringBuffer.prototype.append = function(str) {
		this.buffer += str;
		return this;
	};

	/**
	 * @param  {[number]} index Index of the character
	 * @return {[string]} The character. Returns undefined if index out of bounds.
	 */
	StringBuffer.prototype.charAt = function(index) {
		return this.buffer[index];
	};

	/**
	 * Clears the buffer.
	 */
	StringBuffer.prototype.clear = function() {
		this.buffer = '';
	};

	/**
	 * @return {number} the length of the current contents of the buffer.
	 */
	StringBuffer.prototype.length = function() {
		return this.buffer.length;
	};

	/**
	 * Reverses the contents of the buffer.
	 *
	 * @return {StringBuffer} This same StringBuffer object.
	 */
	StringBuffer.prototype.reverse = function() {
		var i, str = this.buffer;
		this.buffer = '';
		for (i = this.buffer.length - 1; i >= 0; i--){
			this.buffer += str[i];
		}
		return this;
	};

	/**
	 * @return {string} The concatenated string.
	 * @override
	 */
	StringBuffer.prototype.toString = function() {
		return this.buffer;
	};

	return StringBuffer;
});
