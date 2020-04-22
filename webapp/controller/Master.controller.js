sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller,MessageBox) {
	"use strict";
	

	return Controller.extend("nav.Practice.controller.Master", {
		onInit: function () {
			debugger;
			
        
			var that = this;
			debugger;
			this.getOwnerComponent().getModel().read("/KEYTSet", {
				async : false,
	             	success : function(oData, oResponse) {
					debugger;
				//	busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					that.getView().byId("ID_LIST_MASTER").setModel(formmodel,"MasterModel");
					
					var firstitem = that.getView().byId("ID_LIST_MASTER").getItems()[0];
					var prnum=firstitem.getProperty("title").split(":")[1].trim();
					
					
					
// ;					var i="undefined";
					var router = sap.ui.core.UIComponent.getRouterFor(that);
				router.navTo("detail",{cpath:prnum},true);
				
				var itemCount = that.getView().byId("ID_LIST_MASTER").getAggregation("items").length;
					that.getView().byId("page1").setTitle("PR Master("+itemCount+")");
				},
				error:function(error){
					debugger;
					MessageBox.error(JSON.parse(error.response.body).error.message.value,{
							title: error.response.statusText
						});
					//busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.attachRoutePatternMatched(this._handleRouteMatched,this);
		
		
		
		
		},
			onCreate: function(){
			var router = sap.ui.core.UIComponent.getRouterFor(this);
         	router.navTo("Create",true);
		},
		_handleRouteMatched : function(oevnt)
	{
		if(oevnt.getParameter("name") === "master-target"){
			var busyDialog = new sap.m.BusyDialog();
			
			var that = this;
			debugger;
			this.getOwnerComponent().getModel().read("/KEYTSet", {
				async : false,
				success : function(oData, oResponse) {
					debugger;
					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					that.getView().byId("ID_LIST_MASTER").setModel(formmodel,"MasterModel");
					
					var firstitem = that.getView().byId("ID_LIST_MASTER").getItems()[0];
					var prnum=firstitem.getProperty("title").split(":")[1].trim();
						var itemCount = that.getView().byId("ID_LIST_MASTER").getAggregation("items").length;
					that.getView().byId("page1").setTitle("PR Master("+itemCount+")");
					
// ;					var i="undefined";
					var router = sap.ui.core.UIComponent.getRouterFor(that);
				router.navTo("detail",{cpath:prnum},true);
				},
				error:function(error){
					debugger;
					//busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			

		}
	},
	onEmpListPress : function(evt) {
		console.log(evt);
		// var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
		// // var sel = {
		// // 	"pr":evt.getParameters().listItem.getBindingContext("MasterModel").getObject().Prn,
		// // 	"inpr":evt.getParameters().listItem.getBindingContext("MasterModel").getObject().Inpr
		// // };
		
		// //var empIndex=evt.getParameters().listItem.getBindingContext("MasterModel").getObject().Prn;
		// oRouter.navTo("detail",{cpath:},true);
		
		
		var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			var empIndex=evt.getParameters().listItem.getBindingContext("MasterModel").getObject().Prn;
			oRouter.navTo("detail",{cpath:empIndex},true);
	
	},
	onFilter : function(){
		if (!this.onFilterdialog) {
			this.onFilterdialog = sap.ui.xmlfragment("nav.Practice.fragments.filterMaster", this);
			this.getView().addDependent(this.onFilterdialog);
	 }
	 this.onFilterdialog.open();
	},
	filterConfirm: function(oEvent){
	     	var oView = this.getView();
			var oTable = oView.byId("ID_LIST_MASTER");
			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");
			// apply filters 
		  var aFilters = [];
		  for (var i = 0, l = mParams.filterItems.length; i < l; i++) {
		    var oItem = mParams.filterItems[i];
		    var aSplit = oItem.getKey().split("-");
		    var sPath = aSplit[0];
		    var vOperator = aSplit[1];
		    var vValue1 = aSplit[2];
		    var vValue2 = aSplit[3];
		    var oFilter = new sap.ui.model.Filter(sPath, vOperator, vValue1,vValue2);
		    aFilters.push(oFilter);
		  }
		  oBinding.filter(aFilters);
	},
	onSort: function(){
		debugger;
				if (!this.onSortdialog) {
			this.onSortdialog = sap.ui.xmlfragment("nav.Practice.fragments.sortMaster", this);
			this.getView().addDependent(this.onSortdialog);
	 }
	 this.onSortdialog.open();
	},
	SortConfirm: function(oEvent){
		debugger;
		
			debugger;
			var aFilters = [];
			var aSorters=[];
			var oView = this.getView();
			var oTable = oView.byId("ID_LIST_MASTER");
			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");
			// applygroup
			if (mParams.groupItem) {
			    var sPath = mParams.groupItem.getKey();
			    var bDescending = mParams.groupDescending;
			    var vGroup = function(oContext) {
			      var name = oContext.getProperty(sPath);
			  return {
			    key: name,
			    text: name
			  };
			};
				aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
			} 
			
			//		applysorter
			var sPath1 = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath1, bDescending));
			oBinding.sort(aSorters);
			
			// apply filters 
		  
		  for (var i = 0, l = mParams.filterItems.length; i < l; i++) {
		    var oItem = mParams.filterItems[i];
		    var aSplit = oItem.getKey().split("-");
		    var sPath = aSplit[0];
		    var vOperator = aSplit[1];
		    var vValue1 = aSplit[2];
		    var vValue2 = aSplit[3];
		    var oFilter = new sap.ui.model.Filter(sPath, vOperator, vValue1,vValue2);
		    aFilters.push(oFilter);
		  }
		  oBinding.filter(aFilters);
		  //var itemCount = this.getView().byId("ContractList").getAggregation("items").length;
		  //this.getView().byId("idMasterPage").setTitle("Agreements("+itemCount+")");

	},
	
		onSearch : function (oEvt) {

        // add filter for search
        var aFilters = [];
        var sQuery = oEvt.getSource().getValue();
        debugger;
        if (sQuery && sQuery.length > 0) {
            var filter = new sap.ui.model.Filter("Prn", sap.ui.model.FilterOperator.Contains, sQuery);
            aFilters.push(filter);
        }

        // update list binding
        var list = this.getView().byId("ID_LIST_MASTER");
        var binding = list.getBinding("items");
        binding.filter(aFilters);
    }
	});
});