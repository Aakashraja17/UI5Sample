sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Sorter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {

            // var oModel = new JSONModel();
            // oModel.loadData("/model/mockData/toolsData.json");
            // this.getView().setModel(oModel, "ToolsData");

            //this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);
        },
        onDetailView: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView");

        },
        onFormView:function(){
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteFormView");
        },
        onSort: function () {
            if (!this.bDescending) {
                this.bDescending = false;
            }
            var oSorter = new Sorter("toolsName", this.bDescending);
            var oList = this.getView().byId("idList");
            var oBindList = oList.getBinding("items");
            oBindList.sort(oSorter);
            this.bDescending = !this.bDescending;
        },
        onSearch: function (oControlEvent) {
            var oSearchStr = oControlEvent.getParameter("query") || oControlEvent.getParameter("newValue");
            var oName = new Filter("toolsName", FilterOperator.Contains, oSearchStr);
            var oAvail = new Filter("availability", FilterOperator.Contains, oSearchStr);
            var aFilter = [oName, oAvail];
            var oMainFilter = new Filter({
                filters: aFilter,
                and: false
            });
            var oList = this.getView().byId("idList");
            var oBindList = oList.getBinding("items");
            oBindList.filter(oMainFilter);
        },
        onItemSelect: function (oEvent) {
            var oList = oEvent.getParameter("listItem");
            let sPath=oList.getBindingContextPath();
            let aItem=sPath.split("/");
            let id=aItem[aItem.length-1];

            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView", {
                index:id
            });
        }
    });
});