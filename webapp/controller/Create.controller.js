jQuery.sap.require("nav.Practice.util.formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"nav/Practice/util/formatter",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (Controller, Formatter, Filter, MessageBox, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("nav.Practice.controller.Create", {
		formatter: Formatter,
		onInit: function () {
			
	

			debugger;
			this.EmpDetails = [];
			this.att = [];
			// alert("onInit function called");
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this.handleRouteMatched, this);
			if (this.conIndex !== "undefined") {
				var tblModel = this.getView().byId("table1").getModel();
				if (tblModel) {
					tblModel.setData(null);
				}
			}

		},
		handleRouteMatched: function (oEvent) {
			debugger;
			this.conIndex = oEvent.mParameters.arguments.cpath;
			if (this.conIndex !== "undefined") {
					this.EmpDetails =[];
				var that = this;
				var busyDialog = new sap.m.BusyDialog();
				//var that = this;
				that.getOwnerComponent().getModel().read("/KEYTSet?$filter=Prn eq '" + this.conIndex + "'&$expand=PRNEXT/ITEXT,attEXT", {
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						debugger;

						// var val = [];
						// val.push(oData);
						// var oModel = {
						// 	"results": val
						// };
						that.EmpDetails = oData.results[0].PRNEXT;
						var oMData = new sap.ui.model.json.JSONModel(that.EmpDetails);
						that.getView().byId("table1").setModel(oMData);
                           
                          that.att = oData.results[0].attEXT.results;
						var fDate = that.formatter.formatDate(oData.Itdd);
						that.getView().byId('d').setText(fDate);

						// that.EmpDetails.push(oData);
						// var odataModel = new sap.ui.model.json.JSONModel(oData.results[0].PRNEXTData);
						// sap.ui.getCore().byId("emp2").setModel(odataModel);

					},
					error: function (error) {
						busyDialog.close();
						debugger;
						// if(error.response.statusCode==500){

						// }
						//var errorMsg = JSON.parse(error.response.body);
						// errorMsg = errorMsg.error.message.value;
						// that.errMsg(errorMsg);
					}

				});
		

			} else {
				 this.EmpDetails =[];
				debugger;
				this.getView().byId("qat").setValue("");
				this.getView().byId("rdt").setValue("");
				this.getView().byId("vpricee").setValue("");
				this.getView().byId("qtyy").setValue("");
				this.getView().byId("to").setValue("");
				this.getView().byId("accass").setValue("");
				this.getView().byId("costc").setValue("");
				this.getView().byId("appr").setValue("");
				this.getView().byId("gl").setValue("");

				var tblModel = this.getView().byId("table1").getModel();
				if (tblModel) {
					tblModel.setData(null);
				}
              var attModel = this.getView().byId("UploadCollection").getModel("itemattachmodel");
				if (attModel) {
					attModel.setData(null);
				}
			}
		},

		onClick: function () {
			this.getView().byId("panelreport").setExpanded(!this.getView().byId("panelreport").getExpanded());
		},
		handleValueHelp: function (oEvent) {
			debugger;

			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.project",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

		
			this._valueHelpDialog.open(sInputValue);
		},
		onAdd: function (oEvent) {

			debugger;
			var form_data = { //here using form values
				"ino": "",
				"met": "",
				"txt": "",
				"qty": "",
				"reqr": "",
				"date": ""
			};

			//var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueDialog) {
				this._valueDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.add",
					this
				);
				this.getView().addDependent(this._valueDialog);
			}

			var formModel = new sap.ui.model.json.JSONModel(form_data);
			sap.ui.getCore().byId("emp2").setModel(formModel);
			// this.EmpDetails.push(form_data);

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			
			sap.ui.getCore().byId("DP1").setMinDate(new Date());
			this._valueDialog.open();

			var sino = sap.ui.getCore().byId("ino").setValue("");
			var smaterial = sap.ui.getCore().byId("mateial").setValue(""); //this code shows blank
			//	var stext = sap.ui.getCore().byId("text").setValue("");
			var sqty = sap.ui.getCore().byId("qty").setValue("");
			var sreq = sap.ui.getCore().byId("req").setValue("");
			var sDP1 = sap.ui.getCore().byId("DP1").setValue("");
			var stext = sap.ui.getCore().byId("text").setValue("");
			var sunit = sap.ui.getCore().byId("unit").setValue("");
			var splant = sap.ui.getCore().byId("plant").setValue("");
			var sstorage = sap.ui.getCore().byId("storage").setValue("");
			var spg = sap.ui.getCore().byId("pg").setValue("");
			var sacc = sap.ui.getCore().byId("acc").setValue("");
			var mg = sap.ui.getCore().byId("gp").setValue("");

		},

		onEdit: function (oEvent) {
			debugger;
			var eindex = oEvent.getSource().getParent().getId().substr(-1);
			if(this.conIndex=="undefined"){
				var abta = this.EmpDetails[eindex];
			}
			else{
				var abta = this.EmpDetails.results[eindex];
			}
			this.editIndicator = eindex;
						// this.EmpDetails = [];
			var formModel = new sap.ui.model.json.JSONModel(abta);

			if (!this._valueDialog) {
				this._valueDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.add",
					this
				);

			}

			this._valueDialog.open();
			this.getView().addDependent(this._valueDialog);
			sap.ui.getCore().byId("emp2").setModel(formModel);

			// sap.ui.getCore().byId("emp2").getModel().refresh(true);

			//	var oAddData = new sap.ui.model.json.JSONModel(this.oModel);
			//	sap.ui.getCore().byId("emp2").setModel(oAddData);

			//var sInputValue = oEvent.getSource().getValue();

			//this.inputId = oEvent.getSource().getId();
			// create value help dialog
			/*	if (!this._valueDialog) {
					this._valueDialog = sap.ui.xmlfragment(
						"nav.Practice.fragments.",
						this
					);
					this.getView().addDependent(this._valueDialog);
				}*/
			//var myModel = this.getOwnerComponent().getModel("JSON");

			//	sap.ui.getCore().setModel(myModel);
			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value

		},

		onDelete: function (evt) {
			console.log(evt);
			var eindex = parseInt(evt.mParameters.id.substr(-1));
			delete this.EmpDetails[eindex];

			this.EmpDetails = this.EmpDetails.filter(function (element) {
				return element !== undefined;
			});

			var abta = {
				results: this.EmpDetails
			};
			var tabmodel = new sap.ui.model.json.JSONModel(abta);
			this.getView().byId("table1").setModel(tabmodel);
			this.editIndicator = undefined;
		},

		onEnter: function (event) {

			debugger;

		

			var smaterial = sap.ui.getCore().byId("mateial").getValue();
			var sinpr = sap.ui.getCore().byId("ino").getValue();
			var splant = sap.ui.getCore().byId("plant").getValue();
			var sqty = sap.ui.getCore().byId("qty").getValue();
			//var sreq = sap.ui.getCore().byId("req").getValue();
			var sDP1 = sap.ui.getCore().byId("DP1").getValue();

			var sacc = sap.ui.getCore().byId("acc").getValue();
			var sunit = sap.ui.getCore().byId("unit").getValue();
			var stext = sap.ui.getCore().byId("text").getValue();
			var sstorage = sap.ui.getCore().byId("storage").getValue();
			var smetg = sap.ui.getCore().byId("gp").getValue();
			var svendor = sap.ui.getCore().byId("vendor").getValue();
			var spg = sap.ui.getCore().byId("pg").getValue();
			var sitemc = sap.ui.getCore().byId("item3").getValue();
			var sreqr = sap.ui.getCore().byId("req").getValue();
			var vprice=sap.ui.getCore().byId("vprice").getValue();
			var otagrdate = sDP1;
			var argdatearr = otagrdate.split("/");
			var oagrdate = argdatearr[2] + "-" + argdatearr[1] + "-" + argdatearr[0] + "T" + "00:00:00";
			// var sVPrice = sap.ui.getCore().byId("vpricee").getValue();
			// var sTPrice = sap.ui.getCore().byId("to").getValue();
			// 	var sprstatus = sap.ui.getCore().byId("prsts").getValue();
			// 	var srdate = sap.ui.getCore().byId("rdt").getValue();
			// 	var sapp = sap.ui.getCore().byId("appr").getValue();
			//   	var scost = sap.ui.getCore().byId("costc").getValue();
			//   	var sgl = sap.ui.getCore().byId("gl").getValue();

			debugger;
			if (smaterial !== "" && splant !== "" && sqty !== "" && sDP1 !== "" && sacc !== "" && sunit !== "") {
				debugger;
				if(this.conIndex === "undefined")
				{
						
					var Emp = {
					//property name = binding name
					"Prn": this.conIndex?this.conIndex:"",
					"Zcurrkey": "",
					"Inpr": sinpr,
					"ZzmNo": smaterial,
					"Status": "GREEN",
					"Srtxt": stext,
					"Zzplant": splant,
					"Logrt": sstorage,
					"Matkl": smetg,
					"Msehi": sunit,
					"Itdd": oagrdate,
					"VendorNumber": svendor,
					"Ekgrp": spg,
					"Pstyp": sitemc,
					"Quant": sqty,
					//"reqr": sreq,
					"Knttp": sacc,
					"RDate": "",
					"VPrice": vprice,
					"TPrice": "0.00",
					"PrStatus": "",
					"Runr": sreqr,
					"Apprvr": "",
					"ITEXT": [{
							"Prn": this.conIndex?this.conIndex:"",
							"Inpr": sinpr,
							"Prq": "",
							"Prqkey": "",
							"Saknr": "",
							"Kostl": ""
						}
					

					]

				};
			    }
			else
				{
					var Emp = {
					//property name = binding name
					"Prn": this.conIndex?this.conIndex:"",
					"Zcurrkey": "",
					"Inpr": sinpr,
					"ZzmNo": smaterial,
					"Status": "GREEN",
					"Srtxt": stext,
					"Zzplant": splant,
					"Logrt": sstorage,
					"Matkl": smetg,
					"Msehi": sunit,
					"Itdd": oagrdate,
					"VendorNumber": svendor,
					"Ekgrp": spg,
					"Pstyp": sitemc,
					"Quant": sqty,
					//"reqr": sreq,
					"Knttp": sacc,
					"RDate": "",
					"VPrice": this.editIndicator ? this.EmpDetails.results[this.editIndicator].VPrice : vprice,
					"TPrice": this.editIndicator ? this.EmpDetails.results[this.editIndicator].TPrice : "0.00",
					"PrStatus": "",
					"Runr": sreqr,
					"Apprvr": "",
					"ITEXT": [{
							"Prn": this.conIndex?this.conIndex:"",
							"Inpr": sinpr,
							"Prq": "",
							"Prqkey": "",
							"Saknr": "",
							"Kostl": ""
						}
						// "VPrice": this.EmpDetails[this.editIndicator].VPrice?this.EmpDetails[this.editIndicator].VPrice:"",
						// "TPrice": this.EmpDetails[this.editIndicator].TPrice?this.EmpDetails[this.editIndicator].TPrice:"",
						// 	"PrStatus": this.EmpDetails[this.editIndicator].PrStatus?this.EmpDetails[this.editIndicator].PrStatus:"",
						//  	"RDate": this.EmpDetails[this.editIndicator].RDate?this.EmpDetails[this.editIndicator].RDate:"",
						// 	"Apprvr": this.EmpDetails[this.editIndicator].Apprvr?this.EmpDetails[this.editIndicator].Apprvr:"",
						// 	"Saknr": "",
						//"Kostl": "",

					]

				};
}

					if(this.conIndex === "undefined")
                     {
                     	if (this.editIndicator) {
					this.EmpDetails[this.editIndicator] = Emp;
					debugger;
				} else {
					this.EmpDetails.push(Emp);
				}
                     }
                     else{
                     
				if (this.editIndicator) {
					this.EmpDetails.results[this.editIndicator] = Emp;
					debugger;
				} else {
					this.EmpDetails.push(Emp);
				}
                     }
				// var ata = {
				// 	results: this.EmpDetails
				// };

				if (this.conIndex === "undefined") {
					var ata = {
						results: this.EmpDetails
					};
				} else {
					var ata = this.EmpDetails;
				}

				var tabmodel = new sap.ui.model.json.JSONModel(ata);
				this.getView().byId("table1").setModel(tabmodel);
				this.editIndicator = undefined;
				this._valueDialog.close();

			} else if (!smaterial) {
				sap.ui.getCore().byId("mateial").setValueState("Error");
				sap.m.MessageToast.show("Enter the Material No!");
			}
			if (!splant) {
				sap.ui.getCore().byId("plant").setValueState("Error");
				sap.m.MessageToast.show("Enter the valid text!");
			}
			if (!sqty) {
				sap.ui.getCore().byId("qty").setValueState("Error");
				sap.m.MessageToast.show("Enter the Quantity!");
			}

			if (!sDP1) {
				sap.ui.getCore().byId("DP1").setValueState("Error");
				sap.m.MessageToast.show("Enter the Plant!");
			}
			if (!sacc) {
				sap.ui.getCore().byId("acc").setValueState("Error");
				sap.m.MessageToast.show("Enter the valid input!");
			}
			if (!sunit) {
				sap.ui.getCore().byId("unit").setValueState("Error");
				sap.m.MessageToast.show("Enter the Item no!");

			}

		},

		onExpand: function (evt) {

			debugger;
			this.eindex = parseInt(evt.mParameters.id.substr(-1));
			this.getView().byId("panelreport").setExpanded(true);
			if (this.conIndex === "undefined") {
				var itemjson = this.EmpDetails[this.eindex];
			} else {
				var itemjson = this.EmpDetails.results[this.eindex];
			}

			// var itemjson = this.EmpDetails.results[this.eindex];
			var oitemmodel = new sap.ui.model.json.JSONModel(itemjson);
			this.getView().byId("SimpleFormDisplay480_12120Dual").setModel(oitemmodel, "accmodel");
			this.getView().byId("costc").setValue(itemjson.ITEXT.results[0].Kostl);
			this.getView().byId("gl").setValue(itemjson.ITEXT.results[0].Saknr);
			// this.getView().byId("vpricee").setValue(itemjson.this.EmpDetails.results.VPrice);

		},
		onAccept: function (oEvent) {
			debugger;
			// this.oitem[this.i].ZzmNo = this.getView().byId("mateial").getValue();
			// this.oitem[this.i].Srtxt = this.getView().byId("text").getValue();
			// this.oitem[this.i].Zzplant = this.getView().byId("plant").getValue();
			// this.oitem[this.i].Logrt = this.getView().byId("storage").getValue();
			// this.oitem[this.i].Matkl = this.getView().byId("gp").getValue();
			// this.oitem[this.i].Msehi = this.getView().byId("unit").getValue();
			// this.oitem[this.i].Itdd = this.getView().byId("DP1").getValue();
			// this.oitem[this.i].VendorNumber = this.getView().byId("vendor").getValue();
			// this.oitem[this.i].Ekgrp = this.getView().byId("pg").getValue();
			// this.oitem[this.i].Pstyp = this.getView().byId("item3").getValue();
			// this.oitem[this.i].Runr = this.getView().byId("req").getValue();
			// this.oitem[this.i].Inpr = this.getView().byId("ino").getValue();
			// this.oitem[this.i].Knttp = this.getView().byId("acc").getValue();
			// this.oitem[this.i].Quant = this.getView().byId("qty").getValue();
			var otagrdate = this.getView().byId("rdt").getValue();
			var argdatearr = otagrdate.split("/");
			var oagrdate = argdatearr[2] + "-" + argdatearr[1] + "-" + argdatearr[0] + "T" + "00:00:00";
			
			
       
             	if (this.conIndex === "undefined") 
              {
              	var oBinding = this.getView().byId("table1").getBinding("items");
			var qnt = oBinding.oList[this.eindex].Quant;
		    this.EmpDetails[this.eindex].ITEXT[0].Prq = qnt;
			var oBinding = this.getView().byId("table1").getBinding("items");
			var unit = oBinding.oList[this.eindex].Msehi;
			this.EmpDetails[this.eindex].ITEXT[0].Prqkey = unit;
			this.EmpDetails[this.eindex].RDate = oagrdate;
			this.EmpDetails[this.eindex].VPrice = this.getView().byId("vpricee").getValue();
			this.EmpDetails[this.eindex].Apprvr = this.getView().byId("appr").getValue();
			this.EmpDetails[this.eindex].PrStatus = this.getView().byId("prsts").getSelectedKey();
			this.EmpDetails[this.eindex].ITEXT[0].Saknr = this.getView().byId("gl").getValue();
			this.EmpDetails[this.eindex].ITEXT[0].Kostl = this.getView().byId("costc").getValue();
              }
              else
              {
            var oBinding = this.getView().byId("table1").getBinding("items");
            var qnt = oBinding.oList[this.eindex].Quant;
			this.EmpDetails.results[this.eindex].ITEXT[0].Prq = qnt;
		
            var unit = oBinding.oList[this.eindex].Msehi;
			this.EmpDetails.results[this.eindex].ITEXT[0].Prqkey = unit;
			
			
			 var d = oBinding.oList[this.eindex].Itdd;
			this.EmpDetails.results[0].RDate = d;
			this.EmpDetails.results[1].RDate = d;
			
			this.EmpDetails.results[this.eindex].PrStatus = this.getView().byId("prsts").getSelectedKey();
			
			this.EmpDetails.results[this.eindex].VPrice = this.getView().byId("vpricee").getValue();
			
			this.EmpDetails.results[this.eindex].ITEXT[0].Saknr = this.getView().byId("gl").getValue();
			this.EmpDetails.results[this.eindex].ITEXT[0].Kostl = this.getView().byId("costc").getValue();
				// this.EmpDetails.results[0].RDate = oagrdate;
		 //   var oagrdate = oBinding.oList[this.eindex].Itdd;
			// this.EmpDetails.results[0].ITEXT[this.eindex].RDate = oagrdate;
			
			//this.EmpDetails[this.eindex].RDate = oagrdate;
              }
              	
              
		},

		onAllow: function () {

			debugger;
			var accassign = {

				"qt": this.getView().byId("qat").getValue(),
				"dt": this.getView().byId("rdt").getValue()
			};
			this.empDetails[this.eindex].accassign = accassign;
		},

		onExit: function () {
			this._valueDialog.close();
		},
		onBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("master-target", true);
		},
		matValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.mvalueHelpDialog) {
				this.mvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.material",
					this
				);
				this.getView().addDependent(this.mvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhMnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("mat1").setModel(formmodel);
					//	sap.ui.getCore().byId("mat1").getModel("form").refresh(true);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this.mvalueHelpDialog.open(sInputValue);
		},
		matValueHelpClose: function (oEvent) {
			debugger;
			// reset the filter
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([]);

			var aContexts = oEvent.getParameter("selectedContexts");
			var i = parseInt(aContexts[0].sPath.substr(-1));

			if (aContexts && aContexts.length) {

				var matno = sap.ui.getCore().byId("mateial");
				var text = sap.ui.getCore().byId("text");
				var unit = sap.ui.getCore().byId("unit");
				var gp = sap.ui.getCore().byId("gp");
				var pg = sap.ui.getCore().byId("pg");
				var vprice = sap.ui.getCore().byId("vprice");

				var smatno = oBinding.oList[i].ZzmNo;
				var stext = oBinding.oList[i].ZzmDescription;
				var sunit = oBinding.oList[i].Zzunit;
				var sgp = oBinding.oList[i].ZzmGroup;
				var spg = oBinding.oList[i].ZzpurchasingG;
				var sprice = oBinding.oList[i].ZzstandardPrice;

				matno.setValue(smatno);
				text.setValue(stext);
				unit.setValue(sunit);
				gp.setValue(sgp);
				pg.setValue(spg);
				vprice.setValue(sprice);

			}
		},

		plantValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.pvalueHelpDialog) {
				this.pvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.plant",
					this
				);
				this.getView().addDependent(this.pvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhPlnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("plant1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this.pvalueHelpDialog.open(sInputValue);
		},
		plantValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("plant"),
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);

				// var sTitle=oSelectedItem.getTitle();
				// var sDescription=oSelectedItem.getDescription();
				// var sPlant=sTitle +"-"+ sDescription;
				// oText.setValue(sPlant);
			}
		},

		storageValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.svalueHelpDialog) {
				this.svalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.storage",
					this
				);
				this.getView().addDependent(this.svalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhSlSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("storage1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this.svalueHelpDialog.open(sInputValue);
		},
		storageValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("storage"),
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		vendorValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.vvalueHelpDialog) {
				this.vvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.vendor",
					this
				);
				this.getView().addDependent(this.vvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhVnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("vendor1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.vvalueHelpDialog.open(sInputValue);
		},
		vendorValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("vendor"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);

				// 	sTitle = oSelectedItem.getTitle();
				// var sDescription = oSelectedItem.getDescription();
				// var svendor = sTitle + "-" + sDescription;
				// oText.setValue(svendor);
			}
		},

		itemcValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.ivalueHelpDialog) {
				this.ivalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.item",
					this
				);
				this.getView().addDependent(this.ivalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhIcSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("itemc1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.ivalueHelpDialog.open(sInputValue);
		},
		itemcValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("item3"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		accValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.acvalueHelpDialog) {
				this.acvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.acc",
					this
				);
				this.getView().addDependent(this.acvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhAaSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("acc1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.acvalueHelpDialog.open(sInputValue);
		},
		accValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("acc"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);

				// 	sTitle = oSelectedItem.getTitle();
				// var sDescription = oSelectedItem.getDescription();
				// var sacc = sTitle + "-" + sDescription;
				// oText.setValue(sacc);
			}
		},

		costValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.covalueHelpDialog) {
				this.covalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.cost",
					this
				);
				this.getView().addDependent(this.covalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhCcSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("cost1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.covalueHelpDialog.open(sInputValue);
		},

		costValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = this.getView().byId("costc"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		glaccValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.glvalueHelpDialog) {
				this.glvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.glacc",
					this
				);
				this.getView().addDependent(this.glvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhGlnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("glacc1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.glvalueHelpDialog.open(sInputValue);
		},

		glaccValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = this.getView().byId("gl"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		approverValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.appvalueHelpDialog) {
				this.appvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.approver",
					this
				);
				this.getView().addDependent(this.appvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhApSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("approver1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.appvalueHelpDialog.open(sInputValue);
		},

		approverValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = this.getView().byId("appr"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},
		onUpload: function () {
			debugger;
			var oTable = this.getView().byId("table1");
			var oFileUploader = this.getView().byId("fileUploader");
			if (!oFileUploader.getValue()) {
				sap.m.MessageToast.show("Choose a file first");
				return;
			} else {
				var file = oFileUploader.getFocusDomRef().files[0];
				if (file && window.FileReader) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var strCSV = e.target.result;
						var arrCSV = strCSV.match(/[\w.]+(?=,?)/g);
						var noOfCols = 6;
						var hdrRow = arrCSV.splice(0, noOfCols);
						var data = [];
						while (arrCSV.length > 0) {
							var obj = {};
							var row = arrCSV.splice(0, noOfCols);
							for (var i = 0; i < row.length; i++) {
								obj[hdrRow[i]] = row[i].trim();
							}
							data.push(obj);
						}
						var itemobj = {
							results: data
						};
						var model = new sap.ui.model.json.JSONModel(itemobj);
						oTable.setModel(model);
					};
					reader.readAsText(file);
				}
			}
		},
		onDownload: function () {

			var oModelarr = [{

				"ZzmNo": "",
				"Zzplant": "",
				"Quant": "",
				//"reqr": sreq,
				"Itdd": "",
				"Knttp": "",
				"Msehi": "",
				"Srtxt": "",
				"Logrt": "",
				"Matkl": "",
				"VendorNumber": "",
				"Ekgrp": "",
				"Pstyp": "",
				"Runr": "",
				"VPrice": "",
				"TPrice": "",
				"PrStatus": "",
				"RDate": "",
				"Apprvr": "",
				"Saknr": "",
				"Kostl": "",
				"Inpr": ""

			}];
			var oModel = new sap.ui.model.json.JSONModel(oModelarr);
			var oExport = new Export({
				exportType: new ExportTypeCSV({
					separatorChar: ","
				}),
				models: oModel,

				// binding information for the rows aggregation
				rows: {
					path: "/"
				},
				columns: [{
						name: "ZzmNo",
						template: {
							content: "{ZzmNo}"
						}
					}, {
						name: "Zzplant",
						template: {
							content: "{Zzplant}"
						}
					}, {
						name: "Quant",
						template: {
							content: "{Quant}"
						}
					}, {
						name: "Itdd",
						template: {
							content: "{Itdd}"
						}
					}, {
						name: "Knttp",
						template: {
							content: "{Knttp}"
						}
					}, {
						name: "Msehi",
						template: {
							content: "{Msehi}"
						}
					}]
					// {
					// // 	name: "Srtxtt",
					// 	template: {
					// 		content: "{Srtxt}"
					// 	}
					// }, {
					// 	name: "Logrt",
					// 	template: {
					// 		content: "{Logrt}"
					// 	}
					// }, {
					// 	name: "Matkl",
					// 	template: {
					// 		content: "{Matkl}"
					// 	}
					// }, {
					// 	name: "VVendorNumber",
					// 	template: {
					// 		content: "{VendorNumber}"
					// 	}
					// }, {
					// 	name: "Ekgrp",
					// 	template: {
					// 		content: "{Ekgrp}"
					// 	}
					// }, {
					// 	name: "Pstyp",
					// 	template: {
					// 		content: "{Pstyp}"
					// 	}
					// }, {
					// 	name: "Runr",
					// 	template: {
					// 		content: "{Runr}"
					// 	}
					// }, {
					// 	name: "VPrice",
					// 	template: {
					// 		content: "{VPrice}"
					// 	}
					// }, {
					// 	name: "TPrice",
					// 	template: {
					// 		content: "{TPrice}"
					// 	}
					// }, {
					// 	name: "PrStatus",
					// 	template: {
					// 		content: "{PrStatus}"
					// 	}
					// }, {
					// 	name: "RDate",
					// 	template: {
					// 		content: "{RDate}"
					// 	}
					// }, {
					// 	name: "Apprvr",
					// 	template: {
					// 		content: "{Apprvr}"
					// 	}
					// }, {
					// 	name: "Saknr",
					// 	template: {
					// 		content: "{Saknr}"
					// 	}
					// }, {
					// 	name: "Kostl",
					// 	template: {
					// 		content: "{Kostl}"
					// 	}
					// }, {
					// 	name: "Inpr",
					// 	template: {
					// 		content: "{Inpr}"
					// 	}
					// }]
			});
			oExport.saveFile().catch(function (oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function () {
				oExport.destroy();
			});

		},
		onSave: function () {
			debugger;
			var flag=false;
			if(this.conIndex=="undefined" && this.EmpDetails.length){
				flag=true;
			}
			else if(!this.conIndex!="undefined" && this.EmpDetails.results.length){
				flag=true;
			}
			if(flag){
			if (this.conIndex === "undefined") {

				// var EmpDetail = this.EmpDetails[0];
				// var otagrdate = EmpDetail.Itdd;
				// var argdatearr = otagrdate.split("/");
				// var oagrdate = argdatearr[2] + "-" + argdatearr[1] + "-" + argdatearr[0] + "T" + "00:00:00";
				var that = this;

				var obj = {
					"Prn": "",
					"PRNEXT": this.EmpDetails,
					"attEXT" : [

                        ]
				};
				
				debugger;
				that.getOwnerComponent().getModel().create("/KEYTSet", obj, {
					success: function (oData, OResponse) {
						debugger;
						sap.m.MessageToast.show("PR Number Generated:" + oData.Prn);
					},
					error: function (err, oResponse) {
						debugger;
					}
				});
			} else {
				var EmpDetail = this.EmpDetails.results[0];
				// var that = this;
				// var date;
				// var otagrdate = this.formatter.formatDate(EmpDetail.Itdd);
				// var argdatearr = otagrdate.split("/");
				// var oagrdate = argdatearr[2] + "-" + argdatearr[1] + "-" + argdatearr[0] + "T" + "00:00:00";

				// var knttp = EmpDetail.Knttp;
				// var knttpkeykey = knttp.substring(knttp.lastIndexOf("-") + 1, knttp.length);
				// var knttpdes = knttp.substring(0, knttp.lastIndexOf("-"));
				// var obj1 = {
				// 	"Prn": "",
				// 	"Inpr": "",
				// 	"ZzmNo": EmpDetail.ZzmNo,
				// 	"Srtxt": EmpDetail.Srtxt,
				// 	"Zzplant": EmpDetail.Zzplant,
				// 	"Logrt": EmpDetail.Logrt,
				// 	"Matkl": EmpDetail.Matkl,
				// 	"Msehi": EmpDetail.Msehi,
				// 	"Itdd": oagrdate,

				// 	"VendorNumber": EmpDetail.VendorNumber,
				// 	"Ekgrp": EmpDetail.Ekgrp,
				// 	"Pstyp": EmpDetail.Pstyp,
				// 	"Quant": EmpDetail.Quant,
				// 	"Knttp": EmpDetail.Knttp,

				// 	"RDate": oagrdate,
				// 	"VPrice": this.getView().byId("vpricee").getValue(),
				// 	"TPrice": EmpDetail.TPrice,
				// 	"PrStatus": this.getView().byId("prsts").getValue(),
				// 	"Runr": "",
				// 	"Apprvr": this.getView().byId("appr").getValue()
					var obj1 = {
					"Prn": this.conIndex,
					"PRNEXT": this.EmpDetails
				};
				this.getOwnerComponent().getModel().create("/KEYTSet" , obj1, {
					success: function (oData, OResponse) {
						debugger;
						sap.m.MessageToast.show("Updated Successfully!");
					},
					error: function (err, oResponse) {
						debugger;
					}
				});
				// var obj2 = {
				// 	"Prn": "",
				// 	"Inpr": "",
				// 	"Prq": EmpDetail.Quant,
				// 	"Prqkey": EmpDetail.Msehi,
				// 	"Saknr": this.getView().byId("gl").getValue(),
				// 	"Kostl": this.getView().byId("costc").getValue()
				// };
				// that.getOwnerComponent().getModel().update("/prdataSet(Prn='" + this.c.pr + "',Inpr='" + this.c.inpr + "')", obj2, {
				// 	success: function (oData, OResponse) {
				// 		debugger;

				// 	},
				// 	error: function (err, oResponse) {
				// 		debugger;
				// 	}
				// });

			}
}
else{
	sap.m.MessageToast.show("No Item!");
}
		},
		 onMaterial: function(){
          
			debugger;
			// get a handle on the global XAppNav service
			this.oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
	
		    var hash1 = (this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
							target: {
								semanticObject: "zlast1",
								action: "display"
							}
						})) || "";
            this.oCrossAppNavigator.toExternal({
			     	target: {
					shellHash: hash1
				}
			});
		
          },
            onVendor: function(){
          	
          				debugger;
			// get a handle on the global XAppNav service
			this.oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
	
		    var hash1 = (this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
							target: {
								semanticObject: "vensem",
								action: "display"
							}
						})) || "";
            this.oCrossAppNavigator.toExternal({
			     	target: {
					shellHash: hash1
				}
			});
		
          },
          
          
          //Attachment
		
		getCsrfToken : function(oResponse) {
			this.getOwnerComponent().getModel().oHeaders["x-csrf-token"] = "Fetch"
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			this.getOwnerComponent().getModel().read("/KEYTSet", {
				async : false,
				success : function(oData, oResponse) {
					busyDialog.close();
					debugger;
					if(oResponse.headers["x-csrf-token"] != undefined)
					{
						that.getOwnerComponent().getModel().oHeaders["x-csrf-token"] = oResponse.headers["x-csrf-token"];
					}
					
					// var itemAttachArr=oData.results;
					// var itemAttachObj={itemAttachment:itemAttachArr};
					// var oModel = new sap.ui.model.json.JSONModel(itemAttachObj);
					// var idUploadCollection = that.getView().byId("UploadCollection");
					// idUploadCollection.setModel(oModel,"itemattachmodel");
				},
				error:function(error){
					busyDialog.close();
					debugger;
					//busyDialog.close();
		//				var errorMsg = JSON.parse(error.response.body);
		//				errorMsg = errorMsg.error.message.value;
		//				that.errMsg(errorMsg);
				}
			});
		},
	onChange: function(oEvent) {
		var oUploadCollection = oEvent.getSource();
		this.getCsrfToken();
		var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
			name: "x-csrf-token",
			value: this.getOwnerComponent().getModel().oHeaders["x-csrf-token"]
		});
		oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
	},
	onFileSizeExceed: function(oEvent) {
		//alert("FileSizeExceed event triggered");
		sap.m.MessageToast.show("FileSizeExceed event triggered.");
	},

	onTypeMissmatch: function(oEvent) {
	//	alert("TypeMissmatch event triggered");
		sap.m.MessageToast.show("TypeMissmatch event triggered.");
	},
	onUploadComplete: function(oEvent) {
		var oUploadCollection = this.byId("UploadCollection");
		var oData = oUploadCollection.getModel("itemattachmodel");
		debugger;
		
		if(oData?oData.getData():undefined){
			this.itemArr=oData.getData().itemAttachment;
		}
		else{
			this.itemArr=new Array();
		}
		
	
		this.itemArr.unshift({
			"Filename": oEvent.getParameter("files")[0].fileName,
			"Refno":"",
			"Archiveid":""
		});
		var itemAttachObj={itemAttachment:this.itemArr};
		var oModel=new sap.ui.model.json.JSONModel(itemAttachObj);
		this.getView().byId("UploadCollection").setModel(oModel,"itemattachmodel");
		sap.m.MessageToast.show("Upload Completed");
	},

	onBeforeUploadStarts: function(oEvent) {
		// Header Slug
		var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
			name: "slug",
			value: oEvent.getParameter("fileName")
		});
		oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
	},

	getAttachmentTitleText: function() {
		var aItems = this.byId("UploadCollection").getItems();
		return "Uploaded (" + aItems.length + ")";
	},

	onDownloadItem: function() {
		
				var url="/sap/opu/odata/sap/ZPR_DATA_SRV/attachmentSet(Prn='this.conIndex',Refno='',ArchId='0025')/$value";
				sap.m.URLHelper.redirect(url, true);
	
			
	},
	//download the file
	onSelectionChange: function() {
		var oUploadCollection = this.byId("UploadCollection");
		// If there's any item selected, sets download button enabled
		if (oUploadCollection.getSelectedItems().length > 0) {
			this.byId("downloadButton").setEnabled(true);
		} else {
			this.byId("downloadButton").setEnabled(false);
			this.byId("versionButton").setEnabled(false);
		}
	},
	onFileDeleted:function(oEvent)
	{
		debugger;
		this.deleteItemById(oEvent.getParameter("documentId"));
	},
	deleteItemById: function(oEvt) {
		debugger;
		var archiveId;
		var that = this;
		var busyDialog = new sap.m.BusyDialog();
		this.getOwnerComponent().getModel().remove("/attachmentSet(ArchivId='"+archiveId+"',Refno=' ',Zzagreementnum='"+this.conIndex+"')/$value", {
			async : false,
			success : function(oData, oResponse) {
				busyDialog.close();
				debugger;
			},
			error:function(){
				busyDialog.close();
				debugger;
			}
		});	
		// var oData = this.byId("UploadCollection").getModel("itemattachmodel").getData();
		// var aItems = jQuery.extend(true, {}, oData).results;
		// jQuery.each(aItems, function(index) {
		// 	if (aItems[index] && aItems[index].FileId === sItemToDeleteId) {
		// 		aItems.splice(index, 1);
		// 	}
		// });
		// this.byId("UploadCollection").getModel("itemattachmodel").setData({
		// 	"results": aItems
		// });
		// this.byId("attachmentTitle").setText(this.getAttachmentTitleText());
	}
          

	});
});