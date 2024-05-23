
using {riskmanagement as rm} from '../db/schema';

@path: 'service/risk'
service RiskService {
    entity Risks       as projection on rm.Risks;
    annotate Risks with @odata.draft.enabled;

    entity Mitigations as projection on rm.Mitigations;
    annotate Mitigations with @odata.draft.enabled;

    @readonly entity ListOfRisks  as
        select from Risks {
            key ID,
                title,
                owner
        };

    // @readonly entity ListOfRisks as projection on Risks {
    //         key ID,
    //             title,
    //             owner
    //     };

    // BusinessPartner will be used later
    //@readonly entity BusinessPartners as projection on rm.BusinessPartners;
}