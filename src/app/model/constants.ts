export enum CONSTANTS {
    ERR_UNAUTHORIZEZD = 210,
}

export enum ROLES {
    admin = "admin",
    pkgadmin = "pkgadmin",
    consadmin = "consadmin",
    broker = "broker",
    user = "user",
    any = "any"
}

export enum TABLE_NAMES_FOR_USER_PREFERENCES {
    ITEM = "item",
    CUSTOMER_SALES_ORDER= "customer_sales_order",
    SALES_ORDER= "sales_order"
}

export enum COMPANY_TYPE {
    TYPE_PKG = 0,
    TYPE_CONS = 1
}

export const DEBUNCING_TIME_FOR_REST_API = 500;
export const API_ENDPOINTS = {

    //Items API
    GET_CURRENT_USER_CONSUMER_COMPANY_ITEMS: `/api/admin/item`,
    POST_TO_GET_ADMIN_CONSUMER_COMPANY_ITEM_MAP: (custCompanyId: number) => `/api/admin/item/${custCompanyId}/map`,
    UPDATE_ADMIN_PACK_COMP_CONSUMER_COMP_ITEM_MAP: (pkgCompanyId: number, custCompanyId: number) => `/api/admin/pkgcomp/${pkgCompanyId}/${custCompanyId}/item/map`,
    UPDATE_ADMIN_CONSUMER_COMP_ITEM_MAP: (custCompanyId: number) => `/api/admin/consumercomp/
    ${custCompanyId}/item/map`,
    POST_TO_GET_ADMIN_CONSUMER_COMP_ITEM_MAPS_FOR_CURRENT_USER: `/api/admin/item`,
    POST_ADMIN_CONSUMER_COMP_ITEM: (custCompanyId: number) => `/api/admin/item/${custCompanyId}`,
    GET_ITEM_PRICE_BREAKUP_FOR_CUST_ITEM: (custCompId: number, itemId: number) => `/api/admin/erpitem/${custCompId}/${itemId}/price`,

    //erp item API
    GET_ADMIN_ERP_ITEMS_FOR_CONSUMER_COMPANY: (custCompanyId: number) => `/api/admin/erpitem/${custCompanyId}`,
    POST_TO_GET_ADMIN_ERP_MAPPED_ITEMS_FOR_CONSUMER_COMPANY: (custCompanyId: number) => `/api/admin/erpitem/${custCompanyId}/map`,

    //consumer company API
    POST_TO_GET_ADMIN_CONSUMER_COMPANIES_BY_PKG_COMP_ID: (pkgCompanyId: number) => `/api/admin/consumercomp/${pkgCompanyId}/list`,
    POST_ADMIN_CONSUMER_COMPANY_BY_PKG_COMP_ID: (pkgCompanyId: number) => `/api/admin/consumercomp/${pkgCompanyId}`,
    PUT_ADMIN_CONSUMER_COMPANY_BY_ID: (custCompanyId: number) => `/api/admin/consumercomp/${custCompanyId}`,
    POST_ADMIN_CONSUMER_COMPANY_BRANDING: (custCompanyId: number) => `/api/admin/consumercomp/${custCompanyId}/branding`,
    GET_ADMIN_CONSUMER_COMPANY_BY_CODE: (code: string) => `/api/admin/consumercomp/bycode/${code}`,

    //ERP customer API
    GET_ADMIN_ERP_CUSTOMERS_FOR_PKG_COMPANY: (pkgCompanyId: number) => `/api/admin/erpcust/${pkgCompanyId}`,
    POST_TO_GET_ADMIN_ERP_MAPPED_CUSTOMERS_FOR_PKG_COMPANY: (pkgCompanyId: number) => `/api/admin/erpcust/${pkgCompanyId}/map`,

    //ERP Company API
    GET_ADMIN_ERP_COMPANIES: `/api/admin/erpcomp`,
    POST_TO_GET_ADMIN_ERP_MAPPED_COMPANIES: (tenantId: number) => `/api/admin/erpcomp/${tenantId}/map`,

    //USER API
    POST_TO_GET_ADMIN_USERS_OF_A_COMPANY: (companyName: string) => `/api/admin/user/${companyName}/list`,

    //pkg company API
    POST_TO_GET_ADMIN_PKG_COMPANIES: `/api/admin/pkgcomp/list`,
    GET_ADMIN_PKG_COMPANY_BY_CODE: (code: string) => `/api/admin/pkgcomp/${code}`,
    POST_ADMIN_PKG_COMPANY: `/api/admin/pkgcomp`,
    UPDATE_ADMIN_PKG_COMPANY_BY_ID: (pkgCompanyId: number) => `/api/admin/pkgcomp/${pkgCompanyId}`,
    POST_ADMIN_PKG_COMPANY_BRANDING: (pkgCompanyId: number) => `/api/admin/pkgcomp/${pkgCompanyId}/branding`,

    // SalesOrder API
    POST_TO_GET_SALES_ORDER_OF_CUSTOMER: (customerCompanyId: number) => `/api/admin/salesorder/${customerCompanyId}`,

    // Inventory API
    POST_TO_GET_INVENTORY_OF_CUSTOMER: (customerCompanyId: number) => `/api/admin/erpitem/${customerCompanyId}/inventories`,

    // Shopping cart
    ADD_ITEMS_TO_USER_CART: () => `/api/customer/cart`,
    GET_USER_CART_ITEMS: () => `/api/customer/cart`,
    DELETE_USER_CART_ITEM: (cartItemId: number) => `/api/customer/cart/item/${cartItemId}`,
    UPDATE_ORDER_QUANTITY: () => `/api/customer/cart/`,
    ADD_ORDER_SHIPMENT: () => `/api/customer/cart/address`,
    GET_ORDER_SHIPMENTS: (cartId: number) => `/api/customer/cart/${cartId}/address`,
    DELETE_ORDER_SHIPMENTS: (cartId: number, addrId: number) => `/api/customer/cart/${cartId}/address/${addrId}`,
    UPDATE_ORDER_SHIPMENTS: (cartId: number, addrId: number) => `/api/customer/cart/${cartId}/address/${addrId}`,
    ADD_SHIPMENT_PO: (cartId: number) => `/api/customer/cart/${cartId}/purchaseorder`,
    UPDATE_SHIPMENT_PO: (cartId: number) => `/api/customer/cart/${cartId}/purchaseorder`,
    GET_SHIPMENT_PO: (cartId: number) => `/api/customer/cart/${cartId}/purchaseorder`,
    PLACE_ORDER: (cartId: number) => `/api/customer/cart/order/${cartId}`,
    DELETE_CART: (cartId: number) => `/api/customer/cart/${cartId}`,

    GET_TABLE_METADATA: (tableName: string) => `/api/admin/tablemetadata?tableName=${tableName}`,
    UPDATE_TABLE_METADATA: (tableName: string) => `/api/admin/tablemetadata?tableName=${tableName}`,

    POST_CREATE_USER_PREFERENCES: "/api/user/preferences",
    PUT_UPDATE_USER_PREFERENCES: (preferenceId: number) => `/api/user/preferences/${preferenceId}`,
    GET_USER_PREFERENCES: (userId: number) => `/api/user/preferences/${userId}/list`,
    GET_CURRENT_USER_PREFERENCES: "/api/admin/user/preferences/list",
    DELETE_USER_PREFERENCES: (preferenceId: number) => `/api/user/preferences/${preferenceId}`,
    GET_USER_PREFERENCES_FOR_TABLE_NAME: (userId: number, tableName: string) => `/api/user/preferences/${userId}?tableName=${tableName}`,

    // ERP CUST
    GET_ERP_CUST_ADDRESS: () => `/api/admin/erpcust/contactaddress`,

    //global config APIs
    GET_APP_CONFIGURATIONS: "/api/global/appconfigurations",
    POST_APP_CONFIGURATIONS: "/api/global/appconfigurations",
    GET_TRANSLATIONS_FOR_LANGUAGE: (langid: number)=> `/api/global/translations/${langid}`,
    GET_ALL_TRANSLATION_LANGUAGES: "/api/global/translationlangs",
    POST_TRANSLATIONS_FOR_LANGUAGE: (lang: string)=> `/api/global/translations/${lang}`,

    GET_TENANT_CONFIGURATIONS: (tenantId: number) => `/api/global/tenantconfigurations/${tenantId}`,
    POST_TENANT_CONFIGURATIONS: (tenantId: number) => `/api/global/tenantconfigurations/${tenantId}`,

    //access APIs
    POST_LOGIN:"/api/access/login",
    GET_LOGOUT: "/api/access/logout",
    GET_VALIDATE_USER: "/api/access/validate",
    GET_PERMISSIONS: "/api/access/permissions",

    GET_COMPANY_ALONG_WITH_BRANDING: (companyName: string) => `/api/branding/company/${companyName}`,
    GET_BRANDING_FOR_COMPANY: (companyName: string) => `/api/branding/${companyName}`,

    GET_ERP_CUST_ADDRESS_BY_ID: (consumercompId : number) => `/api/admin/erpcust/${consumercompId}/contactaddress`,
    GET_ERP_CUST_CONTACTS_BY_COMP_ID: (consumercompId : number) => `/api/admin/erpcust/${consumercompId}/customercontacts`,

}

export enum SearchOperation {
    EQUAL = "eq",
    NOT_EQUAL = "ne",
    GREATER_THAN = "gt",
    LESS_THAN = "lt",
    GREATER_THAN_EQUAL = "ge",
    LESS_THAN_EQUAL = "le",
    //IN = "in",
    //NOT_IN = "ni",
    CONTAINS = "cn",
    NOT_CONTAINS = "nc",
    STARTS_WITH = "sw",
    NOT_STARTS_WITH = "ns",
    ENDS_WITH = "ew",
    NOT_ENDS_WITH = "new",
    BETWEEN = "bw",
    NOT_BETWEEN = "nb"
}

//used in p-table to support column filter support.
export const COLUMN_FILTERS_MATCH_MODES_FOR_STRING = [
    { labelKey: 'common.equals', value: SearchOperation.EQUAL },
    { labelKey: 'common.not_equals', value: SearchOperation.NOT_EQUAL },
    { labelKey: 'common.contains', value: SearchOperation.CONTAINS },
    { labelKey: 'common.not_contains', value: SearchOperation.NOT_CONTAINS },
    { labelKey: 'common.starts_with', value: SearchOperation.STARTS_WITH },
    { labelKey: 'common.not_starts_with', value: SearchOperation.NOT_STARTS_WITH },
    { labelKey: 'common.ends_with', value: SearchOperation.ENDS_WITH },
    { labelKey: 'common.not_ends_with', value: SearchOperation.NOT_ENDS_WITH },
];

export const COLUMN_FILTERS_MATCH_MODES_FOR_CURRENCY = [
    { labelKey: 'common.equals', value: SearchOperation.EQUAL },
    { labelKey: 'common.not_equals', value: SearchOperation.NOT_EQUAL },
    { labelKey: 'common.greater_than', value: SearchOperation.GREATER_THAN },
    { labelKey: 'common.less_than', value: SearchOperation.LESS_THAN },
    { labelKey: 'common.greater_than_or_equals', value: SearchOperation.GREATER_THAN_EQUAL },
    { labelKey: 'common.less_than_or_equals', value: SearchOperation.LESS_THAN_EQUAL },
    // { labelKey: 'Between', value: SearchOperation.BETWEEN },
    // { labelKey: 'Not Between', value: SearchOperation.NOT_BETWEEN }
];
export const COLUMN_FILTERS_MATCH_MODES_FOR_NUMBER = [
    { labelKey: 'common.equals', value: SearchOperation.EQUAL },
    { labelKey: 'common.not_equals', value: SearchOperation.NOT_EQUAL },
    { labelKey: 'common.greater_than', value: SearchOperation.GREATER_THAN },
    { labelKey: 'common.less_than', value: SearchOperation.LESS_THAN },
    { labelKey: 'common.greater_than_or_equals', value: SearchOperation.GREATER_THAN_EQUAL },
    { labelKey: 'common.less_than_or_equals', value: SearchOperation.LESS_THAN_EQUAL },
    // { labelKey: 'Between', value: SearchOperation.BETWEEN },
    // { labelKey: 'Not Between', value: SearchOperation.NOT_BETWEEN }
];

export const DEFAULT_FILTER_MATCH_MODES = {
    string: SearchOperation.CONTAINS,
    currency: SearchOperation.EQUAL,
    int : SearchOperation.EQUAL
};