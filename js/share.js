// General variables for detection
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
var isAndroid = navigator.userAgent.toUpperCase().indexOf('ANDROID') > -1;
var isPC = ((navigator.userAgent.toUpperCase().indexOf('WINDOWS') > -1) || (navigator.userAgent.toUpperCase().indexOf('LINUX') > -1));

// Create twitter share link
function createTwitterLink() {
	// Create message
	var message = "I have a ";
	if (platform.manufacturer && platform.product) {
		// Some devices have the same value for both
		if (platform.manufacturer == platform.product) {
			message += platform.manufacturer + " device";
		} else {
			message += platform.manufacturer + " " + platform.product;
		}
	} else if (platform.product) {
		message += platform.product;
	} else if (isAndroid) {
		message += "Android device"
	} else {
		// Determine if running a Mac
		if (isMac) {
			message += "Mac";
		// Anything else is a PC
		} else if (isPC) {
			message += "PC";
		} else {
			message += "device";
		}
	}
	// Append operating system
	if (platform.os) {
		message += ", running " + platform.os;
	}
	// Append browser info
	message += ", with " + platform.name + " " + platform.version + ". See your results at http://what-device.com."
	// Create links
	return encodeURIComponent(message);
}

// Create HTML page with report
function createPopup() {
    var opened = window.open("");
    opened.document.write("<html><head><title>WhatDevice Report</title><style>body {font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;}</style></head><body>" + createReport("html") + "</body></html>");
    // Inform user how to save file to computer
    opened.window.alert("To save this to your computer, press CTRL+S (Windows/Linux) or ⌘+S (Mac) on your keyboard. This may not work in some browsers.");
}

// Create HTML page with report, then print it
function createPrintPopup() {
	var opened = window.open("");
	opened.document.write("<html><head><title>WhatDevice Report</title><meta name='viewport' content='width=device-width, initial-scale=1'><style>body {font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;}</style></head><body>" + createReport("html") + "</body></html>");
	opened.document.close();
	opened.focus();
	opened.print();
	opened.close();
}

// Create device report
function createReport(format) {
	var date = new Date();
	var n = date.toDateString();
	var time = date.toLocaleTimeString();
	// Header
	var report = "---- WHAT-DEVICE.COM RESULTS ----\nGenerated: " + n + " " + time + "\nNote: This report was generated using WhatDevice Lite.\n\n";
	// Device info
	report += "-- DEVICE INFO --\nManufacturer: " + platform.manufacturer + "\nProduct: " + platform.product + "\nOperating system: " + platform.os + "\n\n";
	// Browser info
	report += "-- BROWSER INFO --\nBrowser: " + platform.name + " " + platform.version + "\nRendering engine: " + platform.layout + "\nCookies enabled: " + navigator.cookieEnabled + "\nUser agent string: " + navigator.userAgent + "\n\n";
	// Plugin info
	report += "-- PLUGIN INFO --\n"
	if (navigator.plugins.length == 0) {
		report += "No plugins were detected.\n"
	} else {
		var x = navigator.plugins.length;
		report += "Plugins list:\n";
		// Generate list
		for (var i = 0; i < x; i++) {
			if (navigator.plugins[i].version == null) {
				var version = "unknown"
			} else {
				var version = navigator.plugins[i].version
			}
			report += "- " + navigator.plugins[i].name + ", version " + version + "\n"; 
		}
		report += "\n"
	}
    // If report is requested in HTML format, replace line breaks with <br> tag
    if (format == "html") {
        var find = "\n";
        var re = new RegExp(find, 'g');
        report = report.replace(re, "<br />");
    }
    return report;
}

// Write share links to page
function writeSendLinks() {
    content = "<p><b>Note:</b> Some of these links may not work, depending on what browser and device you are using.</p>";
    // Save as file
    content += "<p><a href='javascript:createPopup()'>Save to computer &#xbb;</a></p>"
    // Print
    content += "<p><a href='javascript:createPrintPopup()'>Print &#xbb;</a></p>"
    // Email
    content += "<p><a href='mailto:?to=&body=" + encodeURIComponent(createReport("text")) + "&subject=WhatDevice%20Report'>Share via email &#xbb;</a></p>";
    // SMS (from http://blog.julianklotz.de/the-sms-uri-scheme/)
	if (platform.manufacturer == "Apple") {
		// iOS 8+ format
		content += "<p><a href='sms:&body=" + encodeURIComponent(createReport("text")) + "'>Share via SMS &#xbb;</a></p>";
	} else {
		// Android format
		content += "<p><a href='sms:?body=" + encodeURIComponent(createReport("text")) + "'>Share via SMS &#xbb;</a></p>";
	}
    // Twitter
    content += "<p><a href='https://twitter.com/intent/tweet?text=" + createTwitterLink() + "' target='_blank'>Share via Twitter &#xbb;</a></p>";
    // Write data to page
    document.getElementById("share").innerHTML = content;
}

// Write text copy of report to page
function writeReport() {
    document.getElementById("report").innerHTML = "<p>" + createReport("html") + "</p>";
}

// Load everything
writeSendLinks();
writeReport();