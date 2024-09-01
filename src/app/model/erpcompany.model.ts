import { PkgCompany } from "./company.model";

export class ErpCompany {
    id?: number; // Primary key, generated one
    companyNumber?: number;
    companyName?: string;
    addressNumber?: number;
    baseCurrencyCode?: string;
    bankAccountNumber?: string;
    bankCode?: string;
    bankAccountName?: string;
    vatRegNumber?: string;
    bankCountry?: string;
    logoPath?: string;
    tableRecordId?: number;
    groupCode?: string;
    attributes?: ErpCompanyAttributes;
    selected?: boolean;
}

export class ErpCompanyAttributes {
    sirenNumber?: number;
    siretNumber?: string;
    sepaUserNumber?: string;
    nextDraftCreditNumber?: number;
    nextBolNumber?: number;
    vatQuarterEnd?: string;
    vatQuarterEndMs?: number;
    vatQuarterEndDelta?: number;
    bacsFileFormat?: number;
    bacsBlockSize?: number;
    bacsDriveLetter?: string;
    bacsUserNumber?: number;
    bacsDirectory?: string;
    bacsFileName?: string;
    clieopLastSeqNumDate?: string;
    clieopLastSeqNumDateMs?: number;
    clieopLastSeqNumber?: number;
    clieopLastSeqNumDateDelta?: number;
    bicSwiftCode?: string;
    externalRef?: string;
    nextCreditNumber?: number;
    nextDraftBillNumber?: number;
    nextShipReqNumber?: number;
    nextSaleOrderNumber?: number;
    nextBillNumber?: number;
    nextPurchaseOrderNumber?: number;
    nextJobNumber?: number;
    currentYearNumber?: number;
    currentQuarterNumber?: number;
    sepaFileFormat?: number;
    oaCompany?: number;
    eibanNumber?: string;
    nicNumber?: number;
    allowCanadianTaxCodes?: number;
    currentPeriodNumber?: number;
    lastUserCode?: string;
    mdmId?: string;
}

export interface ErpPkgCompanyMap {
    id?: number;
    pkgCompanyId?: number;
    createdBy?: string;
    erpCompany?: ErpCompany;
    pkgCompany?: PkgCompany;
    needCreation?: boolean;
    selected?: boolean;
    created?: boolean;
}