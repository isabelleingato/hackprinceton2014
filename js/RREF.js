//flag for stage complete
var FLAG = {
	DONE: 1,
	TODO: -1,
	CHECKED: 0
};

var flagRREF = {
	pivot_forward: FLAG.TODO,
	swap: FLAG.TODO,
	reduce: FLAG.TODO,
	subtract_forward: FLAG.TODO,
	forward_phase: FLAG.TODO,
	pivot_backward: FLAG.TODO,
	subtract_backward: FLAG.TODO
};

//globals
var i_gbl = 0;
var j_gbl = 0;
var i2_subtr = -1;
var A;

//called on click
function controlRREF(A) {
	if (flagRREF.forward_phase === FLAG.TODO) {
		if (forwardPhaseRREF(A) == FLAG.DONE) {
			i_gbl = A.h - 1;
			backwardPhaseRREF(A);
		}
	} else {
		backwardPhaseRREF(A);
	}
}


function backwardPhaseRREF(A) {
	console.log("BACKWARD\n");

	if (i_gbl == 0) {
		doneWithRREF(A);
	}

	if (flagRREF.pivot_backward === FLAG.TODO) {
		console.log("do back pivot\n");
		if (pivotBackwardRREF(A) === FLAG.CHECKED) {
			i_gbl--;
			backwardPhaseRREF(A);
		}

	} else if (flagRREF.subtract_backward === FLAG.TODO) {
		console.log("do back subtract\n");
		i2_subtr--;
		if (subtractBackwardRREF(A) === FLAG.DONE) {
			console.log("Reset subtraction loop");
			//decrement row
			flagRREF.pivot_backward = FLAG.TODO;
			flagRREF.subtract_backward = FLAG.TODO;
			i_gbl--;
			controlRREF(A);
		}
	}
}


//subtract above pivot
function subtractBackwardRREF(A) {
	if (i2_subtr < 0) {
		i2_subtr = i_gbl;
	}

	if (i2_subtr <= 0) {
		flagRREF.subtract_backward = FLAG.DONE;
		i2_subtr = -1;
		return FLAG.DONE;
	}

	if (A.num[i2_subtr-1][i_gbl] !== 0) {
		A.subtract(A.num[i2_subtr-1][i_gbl], i_gbl, i2_subtr-1);
		printSubtract(A, A.num[i2_subtr][i_gbl], i2_subtr-1, i_gbl);
		return FLAG.TODO;
	}

	console.log("Subtr again");
	backwardPhaseRREF(A);
}


function doneWithRREF(A) {
	//WE DID THE THING AND SCORED THE POINTS
	console.log("WE DID IT HOORAY?\n");
	//reset everything!
	flagRREF.pivot_forward = FLAG.TODO;
	flagRREF.swap = FLAG.TODO;
	flagRREF.reduce = FLAG.TODO;
	flagRREF.subtract_forward = FLAG.TODO;
	flagRREF.forward_phase = FLAG.TODO;
	flagRREF.pivot_backward = FLAG.TODO;
	flagRREF.subtract_backward = FLAG.TODO;
      	//set isRREF to true
      	A.isRREF = true;
	//disable the next button
	document.getElementById("nextRREF").disabled = true;
}

// forwardPhaseRREF
function forwardPhaseRREF(A) {
	console.log("FORWARD\n");
	if ((A.curRow >= A.h) || (A.curCol >= A.w)) {
		flagRREF.forward_phase = FLAG.DONE;
		console.log("FORWARD DONE\n");
		return FLAG.DONE;
	} else {
		console.log("FORWARD ELSE\n");
		if (flagRREF.pivot_forward === FLAG.TODO) {
			console.log("do for pivot\n");
			if (pivotForwardRREF(A) === FLAG.CHECKED) {
				forwardPhaseRREF(A);
			}
		} else if (flagRREF.swap === FLAG.TODO) {
			console.log("do swap\n");
			if (swapRREF(A) === FLAG.CHECKED) {
				forwardPhaseRREF(A);
			}
		} else if (flagRREF.reduce === FLAG.TODO) {
			console.log("do reduce " + i_gbl + " " + j_gbl + "\n");
			if (reduceRREF(A) === FLAG.CHECKED) {
				forwardPhaseRREF(A);
			}
		} else if (flagRREF.subtract_forward === FLAG.TODO) {
			if (subtractForwardRREF(A) === FLAG.DONE) {
				console.log("Reset subtraction loop");
				incrementAndResetFor(A);
			}
		} else if (flagRREF.subtract_forward === FLAG.DONE) {
			incrementAndResetFor(A);
		}
	}
	return FLAG.TODO;
}


function incrementAndResetFor(A) {
	A.curRow++;
	A.curCol++;
    //reset forward flags
    flagRREF.pivot_forward = FLAG.TODO;
    flagRREF.swap = FLAG.TODO;
    flagRREF.reduce = FLAG.TODO;
    flagRREF.subtract_forward = FLAG.TODO;
    controlRREF(A);
}

//find first nonzero column, first nonzero entry in that column
function pivotForwardRREF(A) {
	j_gbl = nextNonZeroCol(A); //GLOBAL

	if (j_gbl >= A.w) {
		flagRREF.pivot_forward = FLAG.CHECKED;
		return FLAG.CHECKED;
	}

	i_gbl = nextNonZeroEntry(A, j_gbl); //GLOBAL

	//will return -1 if all 0 in col
	if (i_gbl < 0) {
		incrementAndResetFor(A);
	}

	//communicate to webpage: A[i][j] is your pivot
	printPivot(A, i_gbl, j_gbl);
	flagRREF.pivot_forward = FLAG.DONE;
	return FLAG.DONE;
}


//swap
function swapRREF(A) {
	if (i_gbl <= A.curRow) {
		flagRREF.swap = FLAG.CHECKED;
		return FLAG.CHECKED;
	}

	A.swap(i_gbl, A.curRow);
	
	printSwap(A, i_gbl, A.curRow);
	i_gbl = A.curRow;
	flagRREF.swap = FLAG.DONE;
	return FLAG.DONE;
}


//reduce
function reduceRREF(A) {
	if ((A.num[i_gbl][j_gbl] === 1) || (A.num[i_gbl][j_gbl] === 0)) {
		flagRREF.reduce = FLAG.CHECKED;
		return FLAG.CHECKED;
	}

	A.reduce(i_gbl, j_gbl);
	printReduce(A, A.num[i_gbl][j_gbl], i_gbl);
	flagRREF.reduce = FLAG.DONE;
	return FLAG.DONE;
}


//subtract rows
function subtractForwardRREF(A) {
	console.log("do for subtract for " + i2_subtr + "\n");
	if (i2_subtr < 0) {
		i2_subtr = i_gbl+1;
	}

	if (i2_subtr >= A.h) {
		flagRREF.subtract_forward = FLAG.DONE;
		i2_subtr = -1;
		return FLAG.DONE;
	}

	if (A.num[i2_subtr][j_gbl] !== 0) {
		A.subtract(A.num[i2_subtr][j_gbl], i_gbl, i2_subtr);
		printSubtract(A, A.num[i2_subtr][j_gbl], i2_subtr, i_gbl);
		return FLAG.TODO;
	}

	//repeat
	i2_subtr++;
	console.log("Subtr again");
	forwardPhaseRREF(A);
}


function pivotBackwardRREF(A) {
	for (var j2 = 0; j2 < A.w; j2++) {
		if (A.num[i_gbl][j2] === 1) {
			flagRREF.pivot_backward = FLAG.DONE;
		    //communicate to webpage: A[i][j] is your pivot
		    return FLAG.DONE;
		}
	}
	
	flagRREF.pivot_backward = FLAG.CHECKED;
	printPivot(A, i_gbl, j_gbl);
	return FLAG.CHECKED;
}


//find the next nonzero column
function nextNonZeroCol(A) {
	var j = A.curCol;
	if (!A.isColZero(j)) {
		return j;
	} else {
		A.curCol++;
		return nextNonZeroCol(A);
	}
}


//next nonzero entry in col j
function nextNonZeroEntry(A, j) {
	for (var i = A.curRow; i < A.h; i++) {
		if (A.num[i][j] !== 0) {
			return i;
		}
	}
	return -1;
}
