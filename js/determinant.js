var A;
var step = 0;

function controlDET(A) {
	if (A === undefined) A = A;
	if (A.h != A.w) {
		document.getElementById("nextStepBtn").disabled = true;
		printInstructions("Only computable for square matricies.","","");
	}

	var isDone = d_step(step);
	step++;
	if (isDone)  {
		document.getElementById("nextDET").disabled = true;
		document.getElementById("nextDET").value = "Done";
		last_step();
	}
} 

function d_step(step) {

	// Two-by-Two Matricies
	if ((A.h == 2) && (A.w == 2)) 
	{
		var det = determinant(A);
		printTwoByTwo(A, det);
		return -1;
	}

	// if all of the columns are completed, move to the submatrix
	if (step == A.h) return true;

	var term = chess(step) * A.num[step][0];
	if (step === A.h-1) var last = true;
	else var last = false;

	printSubmatrix(A, step, 0, term, last, true);
	return false;
}


function term(A, i){
	var B = submatrix(A,i,0);
	sum += chess(i) * determinant(B);
}

// Writes the final computation. 
function last_step() {

	for (var i = 0; i < A.h; i++) {
		var term = chess(i) * A.num[i][0];
		var B = submatrix(A,i,0);
		var par_det = determinant(B);

		if (i !== 0) $("#step2").append(" + ");
		$("#step2").append(term + " * " + par_det);
	}
	$("#step2").append(" = " + determinant(A));
}



function determinant(A) {
	var h = A.h;
	var w = A.w

	// must be a square matrix
	if (h != w) return null;

	// base case
	if ((h == 2) && (w == 2)) {
		 var det = (A.num[0][0] * A.num[1][1]) - (A.num[0][1]*A.num[1][0])
		 return det;
	}

	var sum = 0;

	// travel down column 0
	for (i = 0; i < h; i++) {
		var B = submatrix(A,i,0);
		sum += chess(i) * determinant(B); 
	}

	return sum;
}


function submatrix(A, i, j) {
	
	var B = new Matrix(A.h-1, A.w-1);
	
	// before 
	for (var m = 0; m < i; m++) {
		for (var n = 0; n < j; n++) {
			B.num[m][n] = A.num[m][n];
		}
		for (n = j+1; n < A.w; n++) {
			B.num[m][n-1] = A.num[m][n];
		}
	}

	for (m = i+1; m < A.h; m++) {
		for (var n = 0; n < j; n++) {
			B.num[m-1][n] = A.num[m][n];
		}
		for (n = j+1; n < A.w; n++) {
			B.num[m-1][n-1] = A.num[m][n];
		}

	}

	return B;
}

function chess(i) {
	if ((i % 2) == 0) return 1;
	else return -1;

}
