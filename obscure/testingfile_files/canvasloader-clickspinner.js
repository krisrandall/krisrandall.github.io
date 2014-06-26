/*
 * use with the heartcode-canvasloader..
 * 
 * defines showClickRefreshSpinner and hideClickRefreshSpinner
 * 
 */
var click_spinner_canvas_loader = false;

// note that the containerId should be positioned relatively 
function showClickRefreshSpinner(containerId) {
	
	if (click_spinner_canvas_loader) {
		click_spinner_canvas_loader.show();
	} else {		
		click_spinner_canvas_loader = new CanvasLoader(containerId);
		click_spinner_canvas_loader.setColor('#d92713'); // default is '#000000'
		click_spinner_canvas_loader.setDiameter(47); // default is 40
		click_spinner_canvas_loader.setDensity(49); // default is 40
		click_spinner_canvas_loader.setRange(0.8); // default is 1.3
		click_spinner_canvas_loader.show(); // Hidden by default		
	}
	
	// This bit is only for positioning - not necessary
	$("#canvasLoader").css("position", "absolute");
	var canvasHeight = $("#canvasLoader").height();
	var canvasWidth = $("#canvasLoader").width();
	var spinnerHeight = $("#" + containerId).height();
	var spinnerWidth = $("#" + containerId).width();
	
	var top = (spinnerHeight / 2) - canvasHeight;
	var left = (spinnerWidth / 2) - (canvasWidth / 2);
	
	$("#canvasLoader").css({
		"top": top + "px",
		"left": left + "px"
	});
}

function hideClickRefreshSpinner() {
	if (click_spinner_canvas_loader) {
		click_spinner_canvas_loader.hide();
		click_spinner_canvas_loader = false; // reset the spinner object incase it was wiped via ajax call
	}
}
