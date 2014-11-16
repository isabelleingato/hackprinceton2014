// $('body').keyup(function(e){
//    if(e.keyCode == 8){
//        // user has pressed backspace
//        alert("space");
//    }
//    if(e.keyCode == 32){
//        // user has pressed space
//        alert("space");
//    }
// });

// $("input[type=text]").keyup(function(e){
// 	if(e.keyCode == 32){
//        // user has pressed space
//        alert("space");
//    }

// });

// function spaceToSkip() {


// }

function readMatrix() {
	
	var tbl = document.getElementById('my_table');
	h = tbl.rows.length;
	w = tbl.rows[0].cells.length;
	var A = new Matrix(w, h);

	for (var i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			var Id = "["+i+"]["+j+"]";
			var value = document.getElementById(Id).value;
			if (value === "") A.num[i][j] = 0;
			else A.num[i][j] = parseInt(value);
			
		}
	}
	printMatrix(A);
	return A;
}

// create DIV element and append to the table cell
function printCell(cell, i, j, value) {
    var textbox = document.createElement('input');
    textbox.disabled = true;
    textbox.type = 'text';
    textbox.value = value;
    textbox.id   = '['+(-i-1)+']['+(-j-1)+']';
    cell.setAttribute("bgcolor","#FFFFFF");
    cell.appendChild(textbox);                   // append textbox
}


function printTwoByTwo(A, det) {
	printMatrix(A);

	var tbl = document.getElementById("new_table");

	tbl.rows[0].cells[0].setAttribute("bgcolor", "#87cefa");
	tbl.rows[1].cells[1].setAttribute("bgcolor", "#87cefa");
	tbl.rows[1].cells[0].setAttribute("bgcolor", "#32cd32");
	tbl.rows[0].cells[1].setAttribute("bgcolor", "#32cd32");

	printInstructions(A.num[0][0] + " * " + A.num[1][1] 
			+ " - " + A.num[0][1] + " * " + A.num[1][0] + " = " + det, "", "");
}

function MtxToAnonElement(A) {
	// var tbl = document.createElement("table");
	var tbl = document.createElement("table");
	tbl.setAttribute('border', '1');
	tbl.setAttribute('class', 'display_table')
	// tbl.setAttribute('display', 'inline-block');
	var tbdy=document.createElement('tbody');
	for (var i = 0; i < A.h; i++) {
		var row = tbl.insertRow(tbl.rows.length);
		for (var j = 0; j < A.w; j++) {
			var cell = printCell(row.insertCell(j), i, j, A.num[i][j]);
		}
	}
	return tbl;
	
}

function printSubmatrix(A, i, j, term, last, isDet) {
	printMatrix(A);
	var tbl = document.getElementById("new_table");
	console.log(i);
	tbl.rows[i].cells[j].setAttribute("bgcolor","#2e8b57");
	
	for (var m = 0; m < i; m++) {
		for (var n = 0; n < j; n++) {
			tbl.rows[m].cells[n].setAttribute("bgcolor","#32cd32");
		}
		for (n = j+1; n < A.w; n++) {
			tbl.rows[m].cells[n].setAttribute("bgcolor","#32cd32");
		}
	}

	for (m = i+1; m < A.h; m++) {
		for (var n = 0; n < j; n++) {
			tbl.rows[m].cells[n].setAttribute("bgcolor","#32cd32");
		}
		for (n = j+1; n < A.w; n++) {
			tbl.rows[m].cells[n].setAttribute("bgcolor","#32cd32");
		}
	}

	B = submatrix(A, i, j);
	$("#step1").append(term + " * ");
	if (isDet) {
		$("#step1").append(" det("); 
		$("#step1").append(MtxToAnonElement(B));
		if (isDet) $("#step1").append(")");
	}

	else {
		$("#step1").append(MtxToAnonElement(B));
	}
	if (!last) $("#step1").append(" + ");
	else $("#step1").append(" = ");
}

function printInstructions(s1, s2, s3)
{
	if (s1 !== "") {
		$("#step1").html(s1);
	}
	
	if (s2 !== "") {
		$("#step2").html(s2);
	}

	if (s3 !== "") {
		$("#step3").html(s3);
	}
}

// Prints the new array. Colors the rows being swapped.
// Prints out that the rows were swapped.
function printSwap(A, i1, i2) {

	// Clean out the old matrix (and colors)
	printMatrix(A);

	var tbl = document.getElementById("new_table");

	for (j = 0; j < A.w; j++) {
		tbl.rows[i1].cells[j].setAttribute("bgcolor","#00FF00");
		tbl.rows[i2].cells[j].setAttribute("bgcolor","#FF0000");
	}

	s1 = "Swap row "+ i1 + " with row " + i2 +".";
	s2 = "(There was a zero in row where a leading one should be)";
	s3 = "";
	printInstructions(s1, s2, s3);
}

function printPivot(A, pivots) {
	printMatrix(A);
	var tbl = document.getElementById("new_table");
	
	for (j = 0; j < pivots.length; j++) {
		var value = pivots[j];
		if (value !== -1) {
			tbl.rows[value].cells[j].setAttribute("bgcolor","#00FF00");
		}
	}
}

// Prints new array. Colors row being reduced
function printReduce(A, k, i) {
	printMatrix(A);
	var tbl = document.getElementById("new_table");

	for (j = 0; j < A.w; j++) {
		tbl.rows[i].cells[j].setAttribute("bgcolor","#00FF00");
	}

	s1 = "Divide row " + i + " by " + k + ".";
	s2 = "(Now row " + i + " has a leading one)";
	s3 = "";
	printInstructions(s1, s2, s3);
}

// Prints new array. Colors pivot
function printPivot_RREF(A, i, j) {
	printMatrix(A);
	var tbl = document.getElementById("new_table");
	tbl.rows[i].cells[j].setAttribute("bgcolor","#00FF00");

	s1 = "Our pivot is in row: " + i + " and column: " + j;
	s2 = "";
	s3 = "";
	printInstructions(s1, s2, s3);
}

// Prints new array. Colors row being reduced
function printReduce(A, k, i) {
	printMatrix(A);
	var tbl = document.getElementById("new_table");

	for (j = 0; j < A.w; j++) {
		tbl.rows[i].cells[j].setAttribute("bgcolor","#00FF00");
	}

	s1 = "Divide row " + i + " by " + k + ".";
	s2 = "(Now row " + i + " has a leading one)";
	s3 = "";
	printInstructions(s1, s2, s3);
}

function printSubtract(A, k, i2, i1) {
	printMatrix(A);
	var tbl = document.getElementById("new_table");

	var dir = "below";
	for (j = 0; j < A.w; j++) {
		tbl.rows[i1].cells[j].setAttribute("bgcolor","#00FF00");
		tbl.rows[i2].cells[j].setAttribute("bgcolor","#FF0000");
	}

	s1 = "Subtract " + k + " row " + i1 + "s from row " + i2 + ".";
	if (i2 < i1) dir = "above";
	s2 = "Clear out another row " + dir + " row " + i1 + ".";
	s3 = "";
	printInstructions(s1, s2, s3);

}

function printMatrix(A, isSpan) {
	var i, j;
	$("#new_table").children().remove();
	var tbl = document.getElementById("new_table");
	for (i = 0; i < A.h; i++) {
		var row = tbl.insertRow(tbl.rows.length);
		for (j = 0; j < A.w; j++) {	
			var cell = printCell(row.insertCell(j), i, j, A.num[i][j]);
		}
	}

	$("#my_table").remove();
}