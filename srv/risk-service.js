
// Import the cds facade object (https://cap.cloud.sap/docs/node.js/cds-facade)
const cds = require('@sap/cds')

// The service implementation with all service handlers
module.exports = cds.service.impl(async function() {

    // Define constants for the Risk and BusinessPartner entities from the risk-service.cds file
    const { Risks, Mitigations, BusinessPartners } = this.entities;

    // This handler will be executed directly AFTER a READ operation on RISKS
    // With this we can loop through the received data set and manipulate the single risk entries
    this.after("READ", Risks, async (data) => {
        // Convert to array, if it's only a single risk, so that the code won't break here
        const risks = Array.isArray(data) ? data : [data];

        // Get all the mitigations
        const aMitigations = await SELECT.from(Mitigations)
        console.log(aMitigations)

        // Looping through the array of risks to set the virtual field 'criticality' that you defined in the schema
        risks.forEach((risk) => {
            if( risk.impact >= 100000) {
                risk.criticality = 1;
            } else {
                risk.criticality = 2;
            }

            // set criticality for priority
            switch (risk.prio_code) {
                case 'H':
                    risk.PrioCriticality = 1;
                    break;
                case 'M':
                    risk.PrioCriticality = 2;
                    break;
                case 'L':
                    risk.PrioCriticality = 3;
                    break;
                default:
                    break;
            }
        })
    });

    // Implement the custom action
    this.on('setHighImpact', async (oReq) => {
        const { riskID, currentImpact } = oReq.data;
        const nUpdatedImpact = currentImpact + 10000
        const result = await UPDATE(Risks).set({ impact: nUpdatedImpact }).where({ ID: riskID });
        return result > 0;
    });
  });