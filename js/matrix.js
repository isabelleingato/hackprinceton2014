// matrix object file!

// matrix declaration
function Matrix(w, h) {
	this.w = w;
	this.h = h;
	this.num = new Array(w);
	for (var i = 0; i < w; i++) {
		this.num[i] = new Array(h);
	}

	this.curRow = 0;
	this.curCol = 0;

	this.isRREF = false;
	this.canInvert = false;


	// swaps two rows in a matrix A
	this.swap = function(i1, i2) {
		var tmp = this.num[i1];
		this.num[i1] = this.num[i2];
		this.num[i2] = tmp;
	};

	// divides row i by the scalar at [i][j]
	this.reduce = function(i, j) {
		var k = this.num[i][j];
		for (var j = 0; j < this.w; j++) {
			this.num[i][j] /= k;
		}
	};

	// subtracts scale multiple of one row from another
	// i2 = i2 - k * i1
	this.subtract = function(k, i1, i2) {
		for (var j = 0; j < this.w; j++) {
			this.num[i2][j] -= k * this.num[i1][j];
		}
	};

	this.isColZero = function(j) {
		for (var i = 0; i < this.h; i++) {
			if (this.num[i][j] !== 0) {
				return false;
			}
		}
		return true;
	}

	this.isRowZero = function(i) {
		for (var j = 0; j < this.w; j++) {
			if (this.num[i][j] !== 0) {
				return false;
			}
		}
		return true;
	}
}