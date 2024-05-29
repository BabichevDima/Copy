sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("riskmanagementfreestyle.controller.RisksView", {
            onInit: function () {

            },

            formatImpact: function(value) {
                if (Number(value.replace(/,/g, '')) >= 100000) {
                    return "Error";
                } else if (Number(value.replace(/,/g, '')) >= 50000) {
                    return "Warning";
                }
                return "None";
            },

            // Method to call the custom action
            async onSetHighImpact(oEvent) {
                debugger
                const oSelectedItem = this.byId("idProductsTable").getSelectedItem();
                if (!oSelectedItem) {
                    MessageToast.show("Please select a risk first.");
                    return;
                }

                oSelectedItem.getBindingContext().getObject()

                const oBindingContext = oSelectedItem.getBindingContext();
                const sId = oBindingContext.getProperty("ID");
                const nImpact = oBindingContext.getProperty("impact");
                const oModel = this.getView().getModel();
                

                const oContext = oModel.bindContext('/setHighImpact(...)')
                try {
                    await oContext.setParameter('riskID', sId).setParameter('currentImpact', nImpact).execute()
                    MessageToast.show("Risk impact updated successfully.");
                    oModel.refresh();
                  } catch (oError) {
                    MessageToast.show("Failed to update risk impact.");
                  }
            }
        });
    });
