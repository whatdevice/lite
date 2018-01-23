// General variables for detection
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
var isAndroid = navigator.userAgent.toUpperCase().indexOf('ANDROID') > -1;
var isPC = ((navigator.userAgent.toUpperCase().indexOf('WINDOWS') > -1) || (navigator.userAgent.toUpperCase().indexOf('LINUX') > -1));

// Device info
function printDeviceInfo() {
	var content = "";
	var warning = "";
	// Device name
	if (platform.manufacturer && platform.product) {
		// Some devices have the same value for both
		if (platform.manufacturer == platform.product) {
			content += "<p class='title'>Unknown " + platform.manufacturer + " device</p>";
		} else {
			content += "<p class='title'>" + platform.manufacturer + " " + platform.product + "</p>";
		}
	} else if (platform.product) {
		content += "<p class='title'>" + platform.product + "</p>";
	} else if (isAndroid) {
		content += "<p class='title'>Unknown Android device</p>"
	} else {
		// Determine if running a Mac
		if (isMac) {
			content += "<p class='title'>Unknown Mac computer</p>";
		// Anything else is a PC
		} else if (isPC) {
			content += "<p class='title'>Unknown PC</p>";
		} else {
			content += "<p class='title'>Unknown device</p>";
		}
	}
	// Operating system
	if (platform.os) {
		content += "<p><b>Operating system: </b> " + platform.os + "</p>";
	} else {
		content += "<p><b>Operating system: </b> Unknown</p>";
	}
	// Language
	if (navigator.languages) {
		content += "<p><b>Language:</b> " + navigator.languages[0] + "</p>";
	} else if (navigator.language) {
		content += "<p><b>Language:</b> " + navigator.language + "</p>";
	} else {
		content += "<p><b>Language:</b> Unavailable</p>";
	}
	// Write data to page
	document.getElementById("device").innerHTML = content;
}

// Browser info
function printBrowserInfo() {
	var content = "";
	// Browser name and version
	content += "<p class='title'>" + platform.name + " " + platform.version + "</p>";
	// Rendering engine
	content += "<p><b>Rendering engine:</b> " + platform.layout + "</p>";
	// Misc
	content += "<p><b>Cookies enabled:</b> " + navigator.cookieEnabled + "</p>";
	content += "<p><b>User agent:</b> " + navigator.userAgent + "</p>";
	// Buttons
	if (platform.name === "Chrome") {
		content += "<p><a href='https://support.google.com/chrome/answer/95414' target='_blank'><button type='button' class='btn btn-default'>Check for browser updates</button></a></p>"
	} else if (platform.name === "Firefox") {
		content += "<p><a href='https://support.mozilla.org/en-US/kb/update-firefox-latest-version' target='_blank'><button type='button' class='btn btn-default'>Check for browser updates</button></a></p>"
	}
	// Write data to page
	document.getElementById("browser").innerHTML = content;
}

// Plugins info
function printPluginInfo() {
	var content = "";
	// Check if any plugins are installed
	if (navigator.plugins.length == 0) {
		content += "<p>No plugins were detected.</p>"
	} else {
		var x = navigator.plugins.length;
		content += "<p><b>Total plugins installed:</b> " + x + "</p>";
		// Generate table
		content += "<p><table cellpadding=10 cellspacing=0 width=100%><tr><th>Plugin</th><th>Version</th></tr>"
		for(var i=0;i<x;i++)
		{
		  content += "<tr><td>" + navigator.plugins[i].name + "</td><td>" + navigator.plugins[i].version + "</td></tr>"; 
		}
		content += "</table></p>"
	}
	// Write data to page
	document.getElementById("plugins").innerHTML = content;
}

// Load everything
printDeviceInfo();
printBrowserInfo();
printPluginInfo();