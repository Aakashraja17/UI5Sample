sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], (BaseController,JSONModel) => {
    "use strict";
  
    return BaseController.extend("app.splitapp.controller.FormView", {
        onInit() {
        //   var oModel = new JSONModel();
        //       oModel.loadData("/model/mockData/toolsData.json");
        //       this.getView().setModel(oModel, "ToolsData");
        },
        onListView: function () {
            let oRoute = this.getOwnerComponent().getRouter();
            //oRoute.initialize();
            oRoute.navTo("RouteMasterView");
          },
    });
  });