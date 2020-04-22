/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"nav/Practice/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});