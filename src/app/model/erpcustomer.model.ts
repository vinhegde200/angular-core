import { ConsCompany } from "./company.model";

export interface ErpCustomer {
    id?: number;
    tableRecordId?: number;
    companyNumber?: number;
    customerCode?: string;
    customerName?: string;
    currencyCode?: string;
    termsCode?: string;
    taxCode?: string;
    creditLimit?: number;
    customerGroup?: string;
    invoiceType?: number;
    customerType?: number;
    customerActive?: number;
    creditStatus?: number;
    customerStatus?: number;
    attributes?: ErpCustomerAttributes;
    selected?: boolean;
}

export interface ErpCustomerAttributes {
    lastUserCode?: string;
    generalLedgerCode?: string;
    vatRegistrationNumber?: string;
    agentCode?: string;
    agentPercentage?: number;
    letterCode?: string;
    undersPercentage?: number;
    oversPercentage?: number;
    billingGenerationType?: number;
    billingInterval?: number;
    billingStyle?: number;
    qualityCertificate: boolean;
    confirmationDocumentCode?: string;
    qualityCertificateCode?: string;
    invoiceReferenceLabelCode?: string;
    ediNumber?: string;
    agent: boolean;
    webAddress?: string;
    crmGroupCode?: string;
    notes?: string;
    palletReferenceLabelCode?: string;
    orderChargeMode?: number;
    orderCharge?: number;
    edi850Type: boolean;
    priceGroupCode?: string;
    specialPriceGroupCode?: string;
    confirmationPickPrintCoverUpLabel?: number;
    confirmationPickPrintShipAddressLabel?: number;
    confirmationPickPrintShipDocument?: number;
    confirmationPickPrintCustomerInvoice?: number;
    confirmationPickPrintBillOfLading?: number;
    confirmationPickPrintConfirmationDocument?: number;
    confirmationPickPrintQualityCertificate?: number;
    creditGenerationType?: number;
    creditInterval?: number;
    confirmationPickPrintInvoiceLabel?: number;
    confirmationPickPrintPalletLabel?: number;
    creditLimitLevel?: number;
    techniqueId?: string;
    techniqueMainAddressNumber?: number;
    monthlySalesAgentId?: string;
    customerLongName?: string;
    invoiceOnlyCompleteOrders?: number;
    invoiceAllCompleteOrders?: number;
    customerMarginGroupCode?: string;
    csdCertificate?: string;
    fiscalFolio?: string;
    thirdPartyProductCategory?: string;
    thirdPartyTitleCode?: string;
    thirdPartyId?: string;
    thirdPartyTaxMethod?: string;
    storeFront: boolean;
    storeFrontCustomerId?: string;
    interCompany: boolean;
    externalReference?: string;
    lastInvoiceDate?: string;
    glCode: string;
}

// export interface ErpPkgCustomerMap {
//     id?: number;
//     pkgCompanyId?: number;
//     createdBy?: string;
//     erpCustomer?: ErpCustomer;
//     consCompany?: ConsCompany;
//     needCreation?: boolean;
// }

export interface ErpConsumerCompanyMap {
    id?: number;
    consumerCompanyId?: number;
    createdBy?: string;
    erpCustomer?: ErpCustomer;
    consCompany?: ConsCompany;
    needCreation?: boolean;
    selected?: boolean;
    created?: boolean;
}

export interface ErpCustomerDTO {
    id: number; // PK
    companyNumber: number;
    customerCode?: string;
    customerName?: string;
    currencyCode?: string;
    termsCode?: string;
    taxCode?: string;
    creditLimit: number;
    customerGroup?: string;
    invoiceType: number;
    customerType: number;
    customerActive: number;
    creditStatus: number;
    customerStatus: number;
    erpCustomerContacts?: ErpCustomerContactDTO[];
    erpCustomerAddresses?: ErpCustomerAddressDTO[];
}

export interface ErpCustomerContactDTO {
    id: number;
    lastUserCode?: string;
    tableRecId: number;
    compNum: number;
    custCode?: string;
    custContactCode?: string;
    custContactName?: string;
    salutation?: string;
    printLang?: string;
    telephone?: string;
    fax?: string;
    email?: string;
    cellPhone?: string;
    jobDescription?: string;
    mailFrequency: number;
    notes?: string;
    addressNum: number;
    techniqueId?: string;
    dsfContactId?: string;
    contactFirstName?: string;
    contactMiddleName?: string;
    contactLastName?: string;
    storeFront: boolean;
    invalidEmail?: boolean;
}

export interface ErpCustomerAddressDTO {
    id: number;
    tableRecId: number;
    compNum: number;
    custCode?: string;
    statement: boolean;
    billing: boolean;
    shipping: boolean;
    addressRef?: string;
    addressee?: string;
    addrName?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    town?: string;
    county?: string;
    postCode?: string;
    country?: string;
    email?: string;
    printLang?: string;
    countryCode?: string;
    billGenType: number;
    billStyle: number;
    billingInterval: number;
    deliveryTerms?: string;
    taxCode?: string;
    acknowledgement: boolean;
    useEmail: number;
    addressType?: string;
    remittance: boolean;
    addressNum: number;
    active: boolean;
    defaultShipAddr: boolean;
    defaultBillAddr: boolean;
    storefront: number;
    mailing: boolean;
    countyCode?: string;
    selected?: boolean;
}
