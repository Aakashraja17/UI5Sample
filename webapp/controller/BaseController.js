sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";
 
    return Controller.extend("app.splitapp.controller.BaseController", {
        onInit() {
 
        },
        getModel:function(model){
            return this.getOwnerComponent().getModel(model);
        }
 
    });
});