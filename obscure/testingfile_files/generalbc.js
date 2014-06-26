// Javascript includes 
// Author: Gavin Tooley 
// Last Mod: 14/04/2005 


function proofCard() {
  document.updForm.submit();
}

function addElem( theNo ) {
	document.updForm.NewElemNo.value = theNo;
  document.updForm.submit();
}

function delElem( theNo ) {
	document.updForm.DelElemNo.value = theNo;
  document.updForm.submit();
}

function submitCorp() {
	if ( confirm( "This will reset the Default Text and Sizes for\nthis Design Number.\nAre you sure you wish to effect this\npermanent change?")) { 
		document.updForm.corpupd.value = 1;
		document.updForm.submit();
	}
}

function editThe( gotoThis ) {
  document.location = "#" + gotoThis;
}

function requireProof() {
    if( document.updForm.Proofed.value == 1 ) {
      document.updForm.Proofed.value = 2;
    }
}

// ---------- Submitting the Forms ----------  

// Used by main. 
function createDesign(DesignNo) {
	if( DesignNo > 0 ) {
		document.CreateCard.DesignNo.value = DesignNo;
	}
	if( parseFloat( document.CreateCard.DesignNo.value ) > 0 ) {
		document.CreateCard.submit();
	} else {
		document.CreateCard.DesignNo.value = '';
		document.CreateCard.DesignNo.focus();
		alert( "This field is for those who know which design\nnumber they want. If you are not sure, you can\nselect an Category, above, to pick a design.");
	}
}

function displayLogon() {
	window.location = "/logon.html"
}

function viewApprovalOrder(OrderNo) {
  window.location = "/apporderdetail.html?OrderNo=" + OrderNo;
}

function deleteCard(CardNo,CreateDate,DesignNo,OrderDate) {
	if (confirm( "You asked to delete your previous design number " + DesignNo + " dated " + CreateDate + ".\nAre you sure you want to delete it?")) {
		if (OrderDate) {
			window.location = "/deletecard.html?CardNo=" + CardNo + "&Ordered=1";
		} else {
			window.location = "/deletecard.html?CardNo=" + CardNo + "&Ordered=0";
		}
	}
}

function jumpScreen() {
  document.updForm.submit()
}

function checkData() {
  var OK = 1;
  if (document.newCust.Email.value.length > 0) {
    if ( !chkemail() ) {
      OK = 0;
    }
  }
  if (document.newCust.Password.value.length > 0) {
    if ( !chkpassword() ) {
      OK = 0;
    }
  }
  // now submit the form if everything checked out OK 
  if (OK) {
    document.newCust.submit();
  }
}

function checkNewData(newcust) {
  var tcountry = document.newCust.Country[document.newCust.Country.selectedIndex].value;
  if (document.newCust.Name1.value.length < 1) {
    alert( "You must enter a Name." );
    document.newCust.Name1.focus();
    return false;
  }
  if (document.newCust.Surname.value.length < 1) {
    alert( "You must enter a Surname." );
    document.newCust.Surname.focus();
    return false;
  }
  if (document.newCust.Addr1.value.length < 1) {
    alert( "You must enter an Address for Delivery." );
    document.newCust.Addr1.focus();
    return false;
  }
	if ( tcountry == 'NZL' ) {
	  if (document.newCust.Suburb[document.newCust.Suburb.selectedIndex].value.length < 1) {
	    alert( "You must select a City or Town for Delivery." );
	    document.newCust.Suburb.focus();
	    return false;
	  }
	} else {
	  if (document.newCust.Suburb.value.length < 1) {
	    alert( "You must enter a Suburb City or Town for Delivery." );
	    document.newCust.Suburb.focus();
	    return false;
	  }
	}
	if ( tcountry == 'NZL' || tcountry == 'CAN' || tcountry == 'AUS' || tcountry == 'USA' ) {
	  if (document.newCust.State[document.newCust.State.selectedIndex].value.length < 1) {
	    alert( "You must select a State for Delivery." );
	    document.newCust.State.focus();
	    return false;
	  }
	} else {
	  if (document.newCust.State.value.length < 1) {
	    alert( "You must enter a State for Delivery." );
	    document.newCust.State.focus();
	    return false;
	  }
	}
	if ( tcountry == 'GBR' || tcountry == 'USA' ) {
	  if ( !chkpostcode(tcountry) ) {
	    return false;
	  }
	} else if ( tcountry == 'NZL' || tcountry == 'CAN' || tcountry == 'AUS' ) {
	  if (document.newCust.Postcode.value.length < 1) {
	    alert( "You must enter a Post or Zip Code." );
	    document.newCust.Postcode.focus();
	    return false;
	  }
	}
  if (document.newCust.Phone.value.length < 1) {
    alert( "You must enter a contact phone number." );
    document.newCust.Phone.focus();
    return false;
  }
  if (!chkemail() ) {
    document.newCust.Email.focus();
    return false;
  }

  // facebook version of registration page doesn't use password
  if (!inIFrame() && FB_CONNECT != '1') {
	  // on the CUSTNEW screen we must check the password, but on the CUSTUPD screen only check if it has been entered
	  var hasPassword = false;
	  if (document.newCust.Password) {
		  hasPassword = document.newCust.Password.value.length;
	  }
	  if (newcust || hasPassword) {
		  if ( !chkpassword() ) {
		    return false;
		  }
	  }	  
  }
  
  if (inIFrame() || FB_CONNECT == '1') {
	  // if we are in facebook require app authorisation
	  doFacebookLogin(
			  function() {
				  // now submit the form if everything checked out OK
				  document.newCust.action = "/custnew.html?function=new&fb=1";
				  document.newCust.submit();		  
			  },
			  function() {
				  alert("Sorry Facebook authorisation is required");
			  }
	  );
  } else {
	  document.newCust.submit();
  }
}

function chkemail() {
	var blankSpace = "true";
	var messblankSpace = "";
	var symPos = 0;
	var messsymPos = "It is missing the '@' symbol";
	var fullStop = 0;
	var messfullStop = "It is missing a fullstop '.' \n";
	var emailLength = "false";
	var messemailLength = "It has to few characters\n";
	var emailChars = "true";
	var messemailChars = "";
	var finalText = "true";
	var messfinalText = "";
	if (document.newCust.Email.value.length > 5) {
	  emailLength = "true";
	  messemailLength = "";
	}
	// check for legal characters 
	var validchars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.&+-@';
	var invalidchar;
	for (var i = 0; i < document.newCust.Email.value.length; i++) {
		if ( validchars.indexOf(document.newCust.Email.value.charAt(i)) == -1 ) {
			emailChars = "false";
			invalidchar = document.newCust.Email.value.charAt(i);
			messemailChars = "It has an illegal character '" + invalidchar + "'\n";
			break;
	  }
	}
	for (var i = 0; i < document.newCust.Email.value.length; i++) {
	  if (document.newCust.Email.value.charAt(i) == " ") {
	    blankSpace = "false";
	    messblankSpace = "It incorrectly includes a blank space\n";
	    break;
	  }
	}
	for (var i = 0; i < document.newCust.Email.value.length; i++) {
	  if (document.newCust.Email.value.charAt(i) == "@") {
	    symPos = i;
	    messsymPos = "";
	    break;
	  }
	}
	for (var i = symPos; i < document.newCust.Email.value.length; i++) {
	  if (document.newCust.Email.value.charAt(i) == ".") {
	    fullStop = i;
	    messfullStop = "";
	  }
	}
	checkStop = document.newCust.Email.value.length - 1;
	if (document.newCust.Email.value.charAt(checkStop) == "." || document.newCust.Email.value.charAt(checkStop) == "@") {
	  finalText = "false";
	  messfinalText = "An Email Address cannot end with a fullstop '.' or an '@'\n";
	}
	if (emailLength == "false" || emailChars == "false" || symPos == 0 || fullStop == 0 || blankSpace == "false" || finalText == "false") {
	  var message = "Your Email address was invalid.\n" + messemailLength + messemailChars + messfullStop + messblankSpace + messfinalText + messsymPos;
	  alert (message);
	  return false;
	} else {
	  return true;
	}
}

function chkpassword() {
	if (document.newCust.Password.value != document.newCust.Password2.value) {
	  alert ("The passwords do not match.");
	  document.newCust.Password.value = '';
	  document.newCust.Password2.value = '';
	  document.newCust.Password.focus();
	  return false;
	}
	if (document.newCust.Password.value.length < 2) {
	  alert ("Your password is not long enough\nA minimum of 2 characters are required."); 
	  document.newCust.Password.value = '';
	  document.newCust.Password2.value = '';
	  document.newCust.Password.focus();
	  return false;
	} else {
	  for (var i = 0; i < document.newCust.Password.value.length; i++) {
	    if (document.newCust.Password.value.charAt(i) == " ") {
	      alert( "Your Password must not include any spaces." );
	      document.newCust.Password.value = '';
	      document.newCust.Password2.value = '';
	      document.newCust.Password.focus();
	      return false;
	    }
	  }
	}
	return true;
}

//********************************************************************************************************************
function submitSearchText(){
	var searchText = $.trim($(".searchTextStringInput").attr("value"));
	if (searchText == "keyword search") {
		searchText = "";
	}
	
	if (searchText.length >= 2) {
		document.mainForm.action = "/cards.html";
		document.mainForm.Category.value = '';
		document.mainForm.Style.value = '';
		document.mainForm.Favourites.value = '';
		document.mainForm.CorpSearch.value = '';
		document.mainForm.submit();
	} else {
		$(".searchTextStringInput").attr("value", "keyword search");
		$(".searchTextStringInput").css("color", "#999");
		alert("Please enter a valid keyword search");
	}
}

function chkpostcode(tcountry) {
	if (tcountry == 'GBR') {
		if (document.newCust.Postcode.value.length < 5) {
		  alert ("Your Postcode appears to be incorrect.\nIt has too few characters."); 
		  document.newCust.Postcode.focus();
		  return false;
		} else if (document.newCust.Postcode.value.length > 8) {
		  alert ("Your Postcode appears to be incorrect.\nIt has too many characters."); 
		  document.newCust.Postcode.focus();
		  return false;
		} else {
			// Capitalize and space. 1234 123 or 123 123 or 12 123.
			var oldpc = document.newCust.Postcode.value.toUpperCase();
			var updpc = '';
			var validchars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			for (var i = 0; i < oldpc.length; i++) {
				if ( validchars.indexOf(oldpc.charAt(i)) > -1 ) {
					updpc += oldpc.charAt(i);
			  }
			}
			document.newCust.Postcode.value = updpc.substring(0,updpc.length - 3) + " " + updpc.substring(updpc.length - 3);
		}
	} else if (tcountry == 'USA') {
		if (document.newCust.Postcode.value.length < 5) {
		  alert ("Your Zip Code appears to be incorrect.\nIt has too few number.\nStyle like 12345 or 12345-1234"); 
		  document.newCust.Postcode.focus();
		  return false;
		} else if (document.newCust.Postcode.value.length > 10) {
		  alert ("Your Zip Code appears to be incorrect.\nIt has too many numbers.\nStyle like 12345 or 12345-1234"); 
		  document.newCust.Postcode.focus();
		  return false;
		} else {
			// Space. 12345 or 12345-1234.
			var oldpc = document.newCust.Postcode.value;
			var updpc = '';
			var validchars = '0123456789';
			for (var i = 0; i < oldpc.length; i++) {
				if ( validchars.indexOf(oldpc.charAt(i)) > -1 ) {
					updpc += oldpc.charAt(i);
			  }
			}
			if ( updpc.length == 5 ) {
				document.newCust.Postcode.value = updpc;
			} else if ( updpc.length == 9 ) {
				document.newCust.Postcode.value = updpc.substring(0,5) + "-" + updpc.substring(5);
			} else {
			  alert ("Your Zip Code appears to be incorrect.\nCheck how many numbers it has.\nStyle like 12345 or 12345-1234"); 
			  document.newCust.Postcode.focus();
			  return false;
			}
		}
	}
	return true;
}

function checkOption() {
  if (document.mainForm.Category[document.mainForm.Category.selectedIndex].value == 0) {
	alert("Please select a valid Category type.");
	document.mainForm.Category.focus();
  } else {
	document.mainForm.action = "/cards.html";
	document.mainForm.submit();
  }
}

// Used by CustDetail.html in the List of multiple entries section. 
function custfindform(action) {
	document.custfind.findview.value = action.value;
	document.custfind.submit();
}

// Used by CustDetail.html in both sections. 
function logon( email,password ) {
	// create some URL call here to logon as this person.
	// do it in a New Window.
}

function proofBackCard(extraText) {
	
	extraText = (typeof extraText === "undefined") ? "" : "\n"+extraText;
	
	if( document.updForm.Back.type == "hidden" ) {
		GBack = document.updForm.Back.value;
	} else {
		GBack = document.updForm.Back[document.updForm.Back.selectedIndex].value;
	}
  if( GBack == '1' ) {
    document.updForm.submit();
  } else {
		// If we're asking this question, then the Back field can't be hidden.
		if( confirm( "You have not selected 'Yes' for Back Printing.\nThere is an extra charge for Back Printing."+extraText+"\n\nSet YES for Back Printing?") ) {
			document.updForm.Back.value = 1;
			document.updForm.submit();
		}
  }
}

function setEditMode(frontback,newmode) {
	document.updForm.DisplayMode.value = newmode;
	if ( frontback == 1 ) {
		proofBackCard();
	} else {
		proofCard();
	}
}

function gotoStep(stepNo) {
	OK = true;
	// this is called from back.html to go to designs.html
	if( stepNo == 2 ) {
     	if( document.updForm.Proofed.value == 2 ) {
         if( confirm( "You have edited the Text or Styling since the last Proof.\nThese changes WILL NOT be saved unless you first PROOF the Back!\n1) Click Cancel now, and Proof the Back first, or\n2) The changes were unimportant, Proceed anyway.") ) {
				OK = true;
			} else {
				OK = false;
			}
		}
		if( OK ) {
			window.location.href = "/designs.html?function=edit";
		}
	} 

	// this is called from designs.html to go to back.html
	if( stepNo == 3 ) {
		if( document.updForm.Proofed.value == 2 ) {
			if( confirm( "You have edited the Text or Styling since the last Proof.\nThese changes WILL NOT be saved unless you first PROOF the Card!\n1) Click Cancel now, and Proof the Card first, or\n2) The changes were unimportant, Proceed anyway.") ) {
				OK = true;
			} else {
				OK = false;
			}
		}
		if( OK ) {
			if( document.updForm.Proofed.value == 1 || document.updForm.Proofed.value == 2) {
				if ( document.updForm.Step3.value == 3 ) {
					window.location.href = "/back.html?function=new";
				} else {
					window.location.href = "/ordsave.html?function=saveask";
				}
			} else {
				alert( "You must Proof your Card first to see how your text looks on it.\nClick the PROOF button first.");
			}
		}
	}

	// this is called from back.html to go to ordsave.html
	if( stepNo == 4 ) {
		if( document.updForm.Back.type == "hidden" ) {
			GBack = document.updForm.Back.value;
		} else {
			GBack = document.updForm.Back[document.updForm.Back.selectedIndex].value;
		}
		if( GBack == '1' ) {
			if( document.updForm.Proofed.value == 0 ) {
				alert( "You have not yet Entered Text or Proofed the Back.\nPlease either select NO for Back printing, or\nEdit your information and Proof first.");
				OK = false;
			}
			if( document.updForm.Proofed.value == 2 ) {
				if( confirm( "You have edited the Text or Styling since the last Proof.\nThese changes WILL NOT be saved unless you first PROOF the Card!\n1) Click Cancel now, and Proof the Back first, or\n2) The changes were unimportant, Proceed anyway.") ) {
					OK = true;
				} else {
					OK = false;
				}
			}
		}
		if( OK ) {
			window.location.href = "/ordsave.html?function=saveask&Back=" + GBack;
		}
	}
}

function addFonts( cf ) {
	document.updForm.action = "/incs/fonts.html?cf=" + cf;
	document.updForm.submit();
}

function addColours( cf ) {
	document.updForm.action = "/incs/colours.html?cf=" + cf;
	document.updForm.submit();
}

function gotoEdit( stepNo ) {
	if( stepNo == 2 ) {
		window.location = "/designs.html?function=edit";
	} else {
		window.location = "/back.html?function=edit";
	}
}

// used to proof a card
function doproof(CardNo,BackPrinting) {
	thelocation = "/incs/orderproof.html?CardNo=" + CardNo;
	if (BackPrinting) {
		popup = window.open(thelocation,'subwindow','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=no,height=560,width=470');
	} else {
		popup = window.open(thelocation,'subwindow','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=no,height=345,width=470');
	}
	popup.focus();
}

// used to proof a card
function showCopyright(DesignNo) {
	thelocation = "/incs/hintscopyright.html?DesignNo=" + DesignNo;
	hints = window.open(thelocation,'Hints','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=no,height=345,width=470');
	hints.focus();
}

// forgotten password
function pwEmail() {
	if (document.logonForm.Email.value.length < 1) {
		alert("Please enter the Email address you REGISTERED with\nand we will email your password to that address.");
		document.logonForm.Email.focus();
	} else {		
		document.logonForm.action = "/pwemail.html";
		document.logonForm.submit();
	}
}

function DispToday(){
	var d, s = "";           //Declare variables.
	var x = new Array("Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday");
	var m = new Array("January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December");
	d = new Date();
	s += x[d.getDay()] + " ";
	s += d.getDate() + " ";                   //Get day
	s += m[d.getMonth()] + " ";            //Get month
	s += d.getFullYear();                         //Get year.
	return(s);                                //Return date.
}

// used for button rollovers
function swapimg(imagename, imagesrc) {
	document.images[imagename].src=imagesrc;
}


// used for new front page
function submitDesign(DesignNo) {
	if( DesignNo > 0 ) {
		document.mainForm.DesignNo.value = DesignNo;
	}
	if( parseFloat( document.mainForm.DesignNo.value ) > 0 ) {
		document.mainForm.action = "/designs.html?function=new";
		document.mainForm.submit();
	} else {
		document.mainForm.DesignNo.value = '';
		document.mainForm.DesignNo.focus();
		alert( "This field is for those who know which design\nnumber they want. If you are not sure, you can\nselect a Category, above, to pick a design.");
	}
}



function submitCategorySearch(Category) {
	if (!Category) {
		if (document.mainForm.SelectCategory[document.mainForm.SelectCategory.selectedIndex].value == 0) {
			alert("Please select a valid Category type.");
			document.mainForm.SelectCategory.focus();
			return;
		} else {
			document.mainForm.Category.value = document.mainForm.SelectCategory[document.mainForm.SelectCategory.selectedIndex].value;
		}	  	
	} else {
		document.mainForm.Category.value = Category;
	}
	document.mainForm.action = "/cards.html";
	document.mainForm.Style.value = '';
	//document.mainForm.CorpSearch.value = '';
	document.mainForm.submit();
}


function submitCorporateSearch(CorpSearch) {
	if (!CorpSearch) {
		if (document.mainForm.CorpSearch.value.length == 0) {
			alert("Please enter a corporation to search for.");
			document.mainForm.CorpSearch.focus();
			return;
		}
		// Loop through and check that the CorpSearch from the form is not just blank spaces.
		var validchars = ' ';
		var testcs = document.mainForm.CorpSearch.value;
		var testlength = 0;
		for (var i = 0; i < testcs.length; i++) {
			if ( validchars.indexOf(testcs.charAt(i)) == 0 ) testlength++;
		}
		if (testcs.length == testlength) {
			alert("Please enter a corporation to search for.");
			document.mainForm.CorpSearch.value = '';
			document.mainForm.CorpSearch.focus();
			return;
		}
	} else {
		document.mainForm.CorpSearch.value = CorpSearch;
	}
	document.mainForm.action = "/cards.html";
	document.mainForm.Category.value = '';
	document.mainForm.Style.value = '';
	document.mainForm.Favourites.value = '';
	
	if (document.mainForm.searchTextStringInput) {
		document.mainForm.searchTextStringInput.value = "";
	}
		
	document.mainForm.submit();
}


function submitStyleSearch(Style) {
	if (!Style) {
		if (document.mainForm.SelectStyle[document.mainForm.SelectStyle.selectedIndex].value == 0) {
			alert("Please select a valid Style.");
			document.mainForm.SelectStyle.focus();
			return;
		} else {
			document.mainForm.Style.value = document.mainForm.SelectStyle[document.mainForm.SelectStyle.selectedIndex].value;
		}	  	
	} else {
		document.mainForm.Style.value = Style;
	}
	document.mainForm.action = "/cards.html";
	document.mainForm.CorpSearch.value = '';
	document.mainForm.Category.value = '';
	document.mainForm.Favourites.value = '';
	document.mainForm.submit();
}


function submitFavSearch() {
	document.mainForm.action = "/cards.html";
	document.mainForm.Style.value = '';
	document.mainForm.CorpSearch.value = '';
	document.mainForm.Category.value = '';
	document.mainForm.Favourites.value = 1;
	document.mainForm.submit();
}


// used to perform an action and then close.
// This is also in the Admin Site js file.
function doaction(ActionNo,Code,Code2,Code3) {
	thelocation = "/incs/doaction.html?ActionNo=" + ActionNo + "&Code=" + Code + "&Code2=" + Code2 + "&Code3=" + Code3;
	actpopup = window.open(thelocation,'popwindow','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,resizable=no,height=100,width=250');
	actpopup.focus();
}

// Used to perform an action in an iFrame called 'doaction'.
// This is also in the Admin Site js file.
function doaction2(ActionNo,Code,Code2,Code3) {
	parent.doaction.document.location = "doaction.html?ActionNo=" + ActionNo + "&Code=" + Code + "&Code2=" + Code2 + "&Code3=" + Code3;
}

