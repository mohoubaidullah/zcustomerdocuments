/*global QUnit*/

sap.ui.define([
	"customeratt/zsd1/controller/CustomerAtt.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CustomerAtt Controller");

	QUnit.test("I should test the CustomerAtt controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});