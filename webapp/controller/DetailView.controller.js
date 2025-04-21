sap.ui.define([
  //"sap/ui/core/mvc/Controller",
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], (BaseController, JSONModel, Fragment, Filter, FilterOperator) => {
  "use strict";

  return BaseController.extend("app.splitapp.controller.DetailView", {

    onInit: function () {
      let oRouter = this.getOwnerComponent().getRouter();
      oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
    },
    onRouteMatched: function (oEvent) {
      console.log(oEvent);
      let index = oEvent.getParameter("arguments").index;
      let sPath = "ToolsData>/toolData/" + index;
      let oView = this.getView();
      console.log(oView)
      oView.bindElement(sPath);

      //code for table
      // let oModel = this.getModel("ToolsData");

      // let sString = oModel.getProperty("/toolData/" + index + "/toolsName");
      // let filterName = new sap.ui.model.Filter("toolsName",
      //     sap.ui.model.FilterOperator.EQ,
      //     sString)
      // let aFilter = [filterName]
      // let oTable = this.getView().byId("idSupTable")
      // let binding = oTable.getBinding("items");
      // binding.filter(aFilter);
    },
    onListView: function () {
      let oRoute = this.getOwnerComponent().getRouter();
      //oRoute.initialize();
      oRoute.navTo("RouteMasterView");
    },
    onConfimSupp: function (oEvent) {
      let oSeletedItems = oEvent.getParameter("selectedItem")
      let sValue = oSeletedItems.getProperty("info")
      let oInput = sap.ui.getCore().byId(this.inputFiled)
      oInput.setValue(sValue)
      // confirm the choice
      // we need the value that selected
      // we need to place it exactly at the same input field where the value was selected
      // you are setting the value on that input field
    },
    onF4Help: function (oEvent) {
      // let myInputField where the popup actually popped up

      this.inputField = oEvent.getSource().getId();
      let oModel = this.getView().getModel("ToolsData")
      let aData = oModel.getProperty("/supplierSet")
      let deepcopy = JSON.parse(JSON.stringify(aData))
      let oModelFrag = new JSONModel({ newSupp: deepcopy })

      if (!this.oDialog) {
        this.oDialog = Fragment.load({
          fragmentName: "app.splitapp.Fargments.popUp",
          controller: this
        }).then((dialog) => {
          this.oDialog = dialog;
          this.getView().addDependent(this.oDialog);
          this.getView().setModel(oModelFrag, "FragModel")
          this.oDialog.open();
        })
      } else {
        this.oDialog.open();
      }
    },

    onConfirmSupp: function (oEvent) {

      let oSelectedItems = oEvent.getParameter("selectedItem");
      let sValue = oSelectedItems.getProperty("info");
      let onInput = sap.ui.getCore().byId(this.inputField);
      onInput.setValue(sValue);
      //confirm the choice
      //we need the value that selected
      //we need to place it exactly at the same field where the value was selected
      //you are setting the value on that input field
    },
    onFilter: function () {
      let aFilter = []
      let sName = this.getView().byId("idInputSupp").getValue()
      let sCity = this.getView().byId("idInputCity").getValue()
      if (sName) {
        let filterName = new Filter("supplierName", FilterOperator.Contains, sName)
        aFilter.push(filterName)
      }
      if (sCity) {
        let filterName = new Filter("location", FilterOperator.Contains, sCity)
        aFilter.push(filterName)
      }
      let oTable = this.getView().byId("idSupTable")
      let binding = oTable.getBinding("items");
      binding.filter(aFilter);

    }

  });
});