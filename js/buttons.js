var A;

function doneBtn() {
	A = readMatrix();
	document.getElementById("doneBtn").style.display = "none";
	document.getElementById("problem_buttons").style.display = "inline";
}

function RREFbtn() {
	document.getElementById("problem_buttons").style.display = "none";
	document.getElementById("nextRREF").style.display = "inline";
	controlRREF(A);
}

function DETbtn() {
	document.getElementById("problem_buttons").style.display = "none";
	document.getElementById("nextDET").style.display = "inline";
	controlDET(A);	
}

function KERbtn() {
	document.getElementById("problem_buttons").style.display = "none";
	document.getElementById("nextKER").style.display = "inline";
	controlKER(A);	
}

function IMGbtn() {
	document.getElementById("problem_buttons").style.display = "none";
	document.getElementById("nextIMG").style.display = "inline";
	controlIMG(A);	
}

function checkInp()
{

  // var x = document.forms["myForm"]["age"].value;
  if (isNaN(x)) 
  {
    alert("Only numbers are allowed. :)");
    return false;
  }
}
