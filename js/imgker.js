// matrix declaration

var step1 = 1;

function controlKER(A) {
	if (!A.isRREF)
		controlRREF(A);
	else {
		console.log("passed loop");
		kernel(A);
	}
		

}

function rank(A) {
	var rank = 0;
	for (i = 0; i < A.h; i++) {
		for (j = 0; j < A.w; j++) {
			if (A.num[i][j] == 1) {
				rank++;
				break;
			}
		}
	}

	// write rank
}

// Outputs matrix for basis of ker
function kernel(A) {
	// may have to change to not change A directly

	var ker = [[]];

	var pivots = locatePivots(A);
	if (step1 == 1) {
		printPivot(A, pivots);
		step1++;
		return;
	}
	// alert(pivots);
	var j = 0;
	var k = 0;
	for (var i = 0; i < A.w; i++) {
		// a pivot col, don't add to ker basis
		if (i == pivots[j]) {
			j++;
		}
		else {
			ker[k] = new Array(A.w);
			for (var l = 0; l < A.w; l++) {
				ker[k][l] = 0;
			}
			for (var h = 0; h < A.h; h++) {
				// if no pivot in respective col, mark zero or find pivot col
				if (pivots[h] != -1 && pivots[h] != undefined)
					ker[k][pivots[h]] = -A.num[h][i]; 

			}
			ker[k][i] = 1;
			k++;
		}

	}

	if (ker.length == 0)
		ker = [0];

	ker2 = convertToMatrix(ker).num;
	console.log(ker2);
	console.log(convertToMatrix(ker).num);
	// may need to check for undefined etc.

	var mtx = MtxToAnonElement(convertToMatrix(ker));
	$("#step1").append(mtx);

	document.getElementById("nextKER").disabled = true; 

	return;

}

function convertToMatrix(A) {
	var matrix = new Matrix(A[0].length, A.length);
	for (var i = 0; i < matrix.h; i++) {
		for (var j = 0; j < matrix.w; j++) {
			matrix.num[i][j] = A[j][i];
		}
	}
	return matrix;
}

// given a matrix IN RREF, it locates the pivots and returns their location of the form B[i] = index, ie the pivot in col i
// is at position index or -1 if no pivot in this row 
function locatePivots(A) {
	var B = new Array();
	var rank = 0;
	for (i = 0; i < A.h; i++) {
		B.push(-1);
		for (j = 0; j < A.w; j++) {
			if (A.num[i][j] == 1) {
				B.pop();
				B.push(j);
				rank++;
				break;
			}
		}
	}

	return B;
}

function copyMatrix(A) {
	var matrix = new Matrix(A.w, A.h);
	for (i = 0; i < matrix.h; i++) {
		for (j = 0; j < matrix.w; j++) {
			matrix.num[i][j] = A.num[i][j];
		}
	}
	return matrix;
}

var B;
var step2 = 1;

function controlIMG(A) {
	if (B === undefined)
		B = copyMatrix(A);
	if (!A.isRREF)
		controlRREF(A);
	else
		image(B, A);

}

// inputs Matrix
// outputs matrix for basis of image
function image(original, A) {

	var image = new Array();
	var pivots = locatePivots(A);
	if (step2 == 1) {
		printPivot(A, pivots);
		step2++;
		return;
	}
	var col;

	for (i = 0; i < A.h; i++) {
		if (pivots[i] != -1) {
			col = new Array();
			for (r = 0; r < A.h; r++) {
				col.push(original.num[r][pivots[i]]);
			}
			image.push(col);
		}
	}

	var mtx = MtxToAnonElement(convertToMatrix(image));
	$("#step1").append(mtx);

	document.getElementById("nextIMG").disabled = true;

	return;
}

function invertible(A) {
	return linearIndependence(A);
}

function linearIndependence(A) {
	if (!A.isRREF)
		controlRREF(A);
		var flag = true;
		for (i = 0; i < A.h; i++) {
			if (A.num[i][i] != 1) {
				flag == false;
				break;
			}
		}
	return false;
}