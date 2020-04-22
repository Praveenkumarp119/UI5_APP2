jQuery.sap.require("nav.Practice.util.formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"nav/Practice/util/formatter"
], function (Controller,Formatter) {
	"use strict";
	
	return Controller.extend("nav.Practice.controller.Detail", {
		
		formatter:Formatter,
		onInit: function () {
				debugger;
				this.att = [];
        var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.attachRoutePatternMatched(this._handleRouteMatched,this);
		},
		 	onCreate: function(){
		 		debugger;
		 	var router = sap.ui.core.UIComponent.getRouterFor(this);
        	router.navTo("Create",{cpath:"undefined"},true);
		},
		
		onEdit: function(){
			debugger;
				var router = sap.ui.core.UIComponent.getRouterFor(this);
              	router.navTo("Create",{cpath:this.conIndex},true);
	        },
		
		_handleRouteMatched : function(oEvent){
			debugger;
			
			
			this.conIndex=oEvent.mParameters.arguments.cpath;
			

			
	
			// this.conInpr=parseInt(oEvent.mParameters.arguments.cpath2);
				var that=this;
				var busyDialog = new sap.m.BusyDialog();
				that.getOwnerComponent().getModel().read("/KEYTSet?$filter=Prn eq '"+this.conIndex+"'&$expand=PRNEXT/ITEXT,attEXT", {
					async : false,
					success : function(oData, oResponse) {
						busyDialog.close();
						debugger;
						var oModel = new sap.ui.model.json.JSONModel(oData.results[0].PRNEXT.results[0]);
						that.getView().byId("ObjectPageLayout").setModel(oModel,"DetailModel");
						
						var odataModel = new sap.ui.model.json.JSONModel(oData.results[0].PRNEXT);
						that.getView().byId("mDetails").setModel(odataModel);
						
						that.EmpDetails=oData.results[0].PRNEXT;
						
						  that.att = oData.results[0].attEXT.results;
						var oattchModel = new sap.ui.model.json.JSONModel(oData.results[0].attEXT);
						that.getView().byId("attchment").setModel(oattchModel);
						
					},
					error:function(error){
						busyDialog.close();
						debugger;
						// if(error.response.statusCode==500){
							
						// }
						//var errorMsg = JSON.parse(error.response.body);
						// errorMsg = errorMsg.error.message.value;
						// that.errMsg(errorMsg);
					}
				
				});
		},
		
		
		onExpand: function (evt) {

			debugger;
			this.eindex = parseInt(evt.mParameters.id.substr(-1));
			this.getView().byId("panelreport").setExpanded(true);
			var itemjson = this.EmpDetails.results[this.eindex];
			var oitemmodel = new sap.ui.model.json.JSONModel(itemjson);
			this.getView().byId("SimpleFormDisplay").setModel(oitemmodel, "accmodel");

       debugger;
            var oCostmodel = new sap.ui.model.json.JSONModel(itemjson.ITEXT.results);
			this.getView().byId("SimpleFormDisplay").setModel(oCostmodel, "costdetails");

	


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
          onDownloadItem : function(oEvent){
          	debugger;
			var id=oEvent.getParameter("id").split("-")[8];
			var archiveId=this.att[id].ArchId;
			var url="https://linux-gi6m:8001/sap/opu/odata/sap/ZPR_DATA_SRV/attachmentSet(Prn='"+ this.conIndex +"',Refno='',ArchId='"+archiveId+"')/$value";
			sap.m.URLHelper.redirect(url);
          }
		

	});
});