var zvatcontent = " ";
var zvatfiletype = " ";
var zvatfilename = " ";
var Zcr_content = " ";
var Zcr_type = " ";
var Zcr = " ";
var Zid_content = " ";
var Zid_type = " ";
var Zid = " ";
var Zsl_content = " ";
var Zsl_type = " ";
var Zsl = " ";
var zcustomerid = " ";
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	'sap/m/MessagePopover',
	'sap/m/MessageBox',
	'sap/m/MessagePopoverItem',
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, Fragment, Filter, MessagePopover, MessageBox, MessagePopoverItem, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("customeratt.zsd1.controller.CustomerAtt", {
		onInit: function () {

		},
		handleLiveChange: function (oEvent) {
			var oTextArea = oEvent.getSource(),
				iValueLength = oTextArea.getValue().length,
				iMaxLength = oTextArea.getMaxLength(),
				sState = iValueLength > iMaxLength ? "Warning" : "None";

			oTextArea.setValueState(sState);
		},
		onSubmit: function () {
			zcustomerid = this.getView().byId("idTemp").getValue();
			var that = this;
			var oModel = that.getOwnerComponent().getModel();
			sap.m.MessageToast.show("PLEASE WAIT WHILE THE DATA LOADS");
			var sPath = "/attachmentsSet('" + zcustomerid + "')";
			oModel.read(sPath, {
				success: function (oData, response) {
					debugger;
					var oModel3 = new sap.ui.model.json.JSONModel(oData);
					var osf = that.getView().byId("idCustomerDetails");
					osf.setModel(oModel3);

					//attatchments start
					if (oModel3.oData.Zvat !== "") {
						that.zvatcontent = oModel3.oData.Zvat_content;
						zvatcontent = oModel3.oData.Zvat_content;
						that.zvatfiletype = oModel3.oData.Zvat_type;
						zvatfiletype = oModel3.oData.Zvat_type;
						zvatfilename = oModel3.oData.Zvat;
						that.getView().byId("idfileVatBtn").setText(oModel3.oData.Zvat);
						that.getView().byId("idfileVatBtn").setType("Accept");
						if (oModel3.oData.AwsFilePathVAT !== "") {
							that.getView().byId("idfileVatBtn").insertCustomData(new sap.ui.core.CustomData({
								key: "AwsFilePath",
								value: oModel3.oData.AwsFilePathVAT

							}));
						}
					} else {
						that.getView().byId("idfileVatBtn").setVisible(true);
						that.getView().byId("idfileVatBtn").setText("NO FILE UPLOADED");
						that.getView().byId("idfileVatBtn").setType("Reject");
					}

					if (oModel3.oData.Zcr !== "") {
						that.Zcr_content = oModel3.oData.Zcr_content;
						Zcr_content = oModel3.oData.Zcr_content;
						that.Zcr_type = oModel3.oData.Zcr_type;
						Zcr_type = oModel3.oData.Zcr_type;
						Zcr = oModel3.oData.Zcr;
						that.getView().byId("idfileCrBtn").setType("Accept");
						that.getView().byId("idfileCrBtn").setText(oModel3.oData.Zcr);
						if (oModel3.oData.AwsFilePathCR !== "") {
							that.getView().byId("idfileCrBtn").insertCustomData(new sap.ui.core.CustomData({
								key: "AwsFilePath",
								value: oModel3.oData.AwsFilePathCR

							}));
						}
					} else {
						that.getView().byId("idfileCrBtn").setVisible(true);
						that.getView().byId("idfileCrBtn").setText("NO FILE UPLOADED");
						that.getView().byId("idfileCrBtn").setType("Reject");
					}

					if (oModel3.oData.Zid !== "") {
						that.Zid_content = oModel3.oData.Zid_content;
						Zid_content = oModel3.oData.Zid_content;
						that.Zid_type = oModel3.oData.Zid_type;
						Zid_type = oModel3.oData.Zid_type;
						Zid = oModel3.oData.Zid;
						that.getView().byId("idfileIDBtn").setType("Accept");
						that.getView().byId("idfileIDBtn").setText(oModel3.oData.Zid);
						if (oModel3.oData.AwsFilePathID !== "") {
							that.getView().byId("idfileIDBtn").insertCustomData(new sap.ui.core.CustomData({
								key: "AwsFilePath",
								value: oModel3.oData.AwsFilePathID

							}));
						}
					} else {
						that.getView().byId("idfileIDBtn").setVisible(true);
						that.getView().byId("idfileIDBtn").setText("NO FILE UPLOADED");
						that.getView().byId("idfileIDBtn").setType("Reject");
					}

					if (oModel3.oData.Zsl !== "") {
						that.Zsl_content = oModel3.oData.Zsl_content;
						Zsl_content = oModel3.oData.Zsl_content;
						that.Zsl_type = oModel3.oData.Zsl_type;
						Zsl_type = oModel3.oData.Zsl_type;
						Zsl = oModel3.oData.Zsl;
						that.getView().byId("idfileSlBtn").setType("Accept");
						that.getView().byId("idfileSlBtn").setText(oModel3.oData.Zsl);
						if (oModel3.oData.AwsFilePathVAT !== "") {
							that.getView().byId("idfileSlBtn").insertCustomData(new sap.ui.core.CustomData({
								key: "AwsFilePath",
								value: oModel3.oData.AwsFilePathSL

							}));
						}
					} else {
						that.getView().byId("idfileSlBtn").setVisible(true);
						that.getView().byId("idfileSlBtn").setText("NO FILE UPLOADED");
						that.getView().byId("idfileSlBtn").setType("Reject");
					}

					//attachments end

				},
				error: function (oData, response) {
					sap.m.MessageToast.show("No Data retreived");
				}
			});
		},

		//open customer CR  file
		openCRFile: function (oEvent) {

			debugger;
			var obtn = oEvent.getSource();
			//now you have access to the respective button
			var customDataObject = obtn.getCustomData();
			var customData;
			if (customDataObject.length > 0) {
				customData = customDataObject[0].getValue();
				if (!this.displayContent) {
					this.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", this);
					this.getView().addDependent(this.displayContent);
				}
				sap.ui.getCore().byId("idPdfViewer").setVisible(false);
				sap.ui.getCore().byId("image").setVisible(true);
				sap.ui.getCore().byId("image").setSrc(customData);
				this.displayContent.open();
				return;
			}
			var Zftype = 'CR';

			var Ztempid = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(Ztempid=" + "'" + Ztempid + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}
						if (oData.AwsFilePath) {
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(oData.AwsFilePath);
							this.displayContent.open();
							return;
						}
						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		//open customer CR  file
		openVATFile: function (oEvent) {

			debugger;
			var obtn = oEvent.getSource();
			var customDataObject = obtn.getCustomData(); //[0].getValue();
			var customData;
			if (customDataObject.length > 0) {
				customData = customDataObject[0].getValue();
				if (!this.displayContent) {
					this.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", this);
					this.getView().addDependent(this.displayContent);
				}
				sap.ui.getCore().byId("idPdfViewer").setVisible(false);
				sap.ui.getCore().byId("image").setVisible(true);
				sap.ui.getCore().byId("image").setSrc(customData);
				this.displayContent.open();
				return;
			}
			var Zftype = 'VAT';

			var Ztempid = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(Ztempid=" + "'" + Ztempid + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open customer ID  file
		openIDFile: function (oEvent) {

			debugger;
			var obtn = oEvent.getSource();
			var customDataObject = obtn.getCustomData(); //[0].getValue();
			var customData;
			if (customDataObject.length > 0) {
				customData = customDataObject[0].getValue();
				if (!this.displayContent) {
					this.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", this);
					this.getView().addDependent(this.displayContent);
				}
				sap.ui.getCore().byId("idPdfViewer").setVisible(false);
				sap.ui.getCore().byId("image").setVisible(true);
				sap.ui.getCore().byId("image").setSrc(customData);
				this.displayContent.open();
				return;
			}
			var Zftype = 'ID';

			var Ztempid = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(Ztempid=" + "'" + Ztempid + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},

		//open customer ID  file
		openLicenseFile: function (oEvent) {
			var obtn = oEvent.getSource();
			var customDataObject = obtn.getCustomData(); //[0].getValue();
			var customData;
			if (customDataObject.length > 0) {
				customData = customDataObject[0].getValue();
				if (!this.displayContent) {
					this.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", this);
					this.getView().addDependent(this.displayContent);
				}
				sap.ui.getCore().byId("idPdfViewer").setVisible(false);
				sap.ui.getCore().byId("image").setVisible(true);
				sap.ui.getCore().byId("image").setSrc(customData);
				this.displayContent.open();
				return;
			}
			debugger;

			var Zftype = 'LICENSE';

			var Ztempid = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(Ztempid=" + "'" + Ztempid + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		onPressBarCloseBtn: function (oEvent) {
			this.displayContent.close();
			this.fragOpen = undefined;
		},
		verifiedVATFile: function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
			if (Ztempid !== "") {

				switch (status) {
				case 'Reject':
					status = 'R';
					break;
				case 'Approve':
					status = 'A';
					// code block
					break;
				default:
					// code block
				}

				var entry = {
					Zcustomer: Ztempid,
					Zstatus: status,
					ZdocumentType: "VAT"
				};

				//create entry
				oModel.create("/statusSet",
					entry, {
						success: function (data) {
							sap.m.MessageToast.show("Data Successfully updated!");
						},
						error: function (data) {
							sap.m.MessageToast.show("Data updation failed!");
						}

					}); //entry end

			}
		},

		verifiedCRFile: function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
			if (Ztempid !== "") {

				switch (status) {
				case 'Reject':
					status = 'R';
					break;
				case 'Approve':
					status = 'A';
					// code block
					break;
				default:
					// code block
				}

				var entry = {
					Zcustomer: Ztempid,
					Zstatus: status,
					ZdocumentType: "CR"
				};

				//create entry
				oModel.create("/statusSet",
					entry, {
						success: function (data) {
							sap.m.MessageToast.show("Data Successfully updated!");
						},
						error: function (data) {
							sap.m.MessageToast.show("Data updation failed!");
						}

					}); //entry end

			}
		},

		verifiedIDFile: function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
			if (Ztempid !== "") {

				switch (status) {
				case 'Reject':
					status = 'R';
					break;
				case 'Approve':
					status = 'A';
					// code block
					break;
				default:
					// code block
				}

				var entry = {
					Zcustomer: Ztempid,
					Zstatus: status,
					ZdocumentType: "ID"
				};

				//create entry
				oModel.create("/statusSet",
					entry, {
						success: function (data) {
							sap.m.MessageToast.show("Data Successfully updated!");
						},
						error: function (data) {
							sap.m.MessageToast.show("Data updation failed!");
						}

					}); //entry end

			}
		},

		verifiedSlFile: function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
			if (Ztempid !== "") {

				switch (status) {
				case 'Reject':
					status = 'R';
					break;
				case 'Approve':
					status = 'A';
					// code block
					break;
				default:
					// code block
				}

				var entry = {
					Zcustomer: Ztempid,
					Zstatus: status,
					ZdocumentType: "LICENSE"
				};

				//create entry
				oModel.create("/statusSet",
					entry, {
						success: function (data) {
							sap.m.MessageToast.show("Data Successfully updated!");
						},
						error: function (data) {
							sap.m.MessageToast.show("Data updation failed!");
						}

					}); //entry end

			}
		},

		onSaveComments: function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
			var comments = this.getView().byId("idTextArea").getValue();
			if (Ztempid !== "") {

				var entry = {
					Zcustomer: Ztempid,
					Zstatus: 'C',
					Zcomments: comments,
					ZdocumentType: "OTHERS"
				};

				//create entry
				oModel.create("/statusSet",
					entry, {
						success: function (data) {
							sap.m.MessageToast.show("Comments Successfully updated!");
						},
						error: function (data) {
							sap.m.MessageToast.show("Comments updation failed!");
						}

					}); //entry end

			}
		}

	});
});