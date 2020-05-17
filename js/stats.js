// General variables for detection
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
var isAndroid = navigator.userAgent.toUpperCase().indexOf('ANDROID') > -1;
var isPC = ((navigator.userAgent.toUpperCase().indexOf('WINDOWS') > -1) || (navigator.userAgent.toUpperCase().indexOf('LINUX') > -1));
var isChromebook = navigator.userAgent.toUpperCase().indexOf('CROS') > -1;

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
	} else if (isChromebook) {
		content += "<p class='title'>Unknown Chromebook</p>"
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
	} else if (platform.os == null) {
		content += "<p><b>Operating system: </b> Unknown</p>";
	} else {
		content += "<p><b>Operating system: </b> Unknown</p>";
	}
	// CPU architecture
	if (window.navigator.platform) {
		content += "<p><b>Architecture: </b> " + window.navigator.platform.split(" ").splice(-1) + "</p>";
	} else if (window.navigator.cpuClass) {
		content += "<p><b>Architecture: </b> " + window.navigator.cpuClass + "</p>";
	} else {
		content += "<p><b>Architecture: </b> Unknown</p>";
	}
	// Language
	if (navigator.languages) {
		content += "<p><b>Language:</b> " + navigator.languages[0] + "</p>";
	} else if (navigator.language) {
		content += "<p><b>Language:</b> " + navigator.language + "</p>";
	} else if (navigator.userLanguage) {
		content += "<p><b>Language:</b> " + navigator.userLanguage + "</p>";
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
	// Cookies
	if (navigator.cookieEnabled == true) {
		content += "<p><b>Cookies:</b> Enabled</p>";
	} else {
		content += "<p><b>Cookies:</b> Disabled</p>";
	}
	// Do not track
	if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack) {
		if (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1") {
			content += "<p><b>Do Not Track:</b> Enabled";
		} else {
			content += "<p><b>Do Not Track:</b> Disabled";
		}
	} else {
		content += "<p><b>Do Not Track:</b> Not supported";
	}
	// User agent
	content += "<p><b>User agent:</b> " + navigator.userAgent + "</p>";
	// Buttons
	if (platform.name === "Chrome") {
		content += "<p><a class='button' href='https://support.google.com/chrome/answer/95414' target='_blank'>Check for browser updates</a></p>"
	} else if (platform.name === "Firefox") {
		content += "<p><a class='button' href='https://support.mozilla.org/en-US/kb/update-firefox-latest-version' target='_blank'>Check for browser updates</a></p>"
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
		for (var i = 0; i < x; i++) {
			if (navigator.plugins[i].version == null) {
				var version = "Unknown"
			} else {
				var version = navigator.plugins[i].version
			}
			content += "<tr><td>" + navigator.plugins[i].name + "</td><td>" + version + "</td></tr>"; 
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