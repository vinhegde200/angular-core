import { ErpCompany } from "./erpcompany.model";
import { ErpCustomer } from "./erpcustomer.model";

export interface Tenant {
    id?: number;
    name?: string;
    description?: string;
}

export interface PkgCompany {
    id?: number;
    code?: string;
    name?: string;
    contactName?: string;
    contactEmail?: string;
    address?: string
    website?: string;
    domain?: string;
    title?: string;
    description?: string;
    isActive?: boolean;
    branding?: PkgCompBranding;
    tenantCompanyMap?: TenantCompanyMap;
    erpCompany?: ErpCompany;
}

export interface PkgCompBranding {
    id?: number;
    banner?: string;
    introText?: string;
    logoSmall?: string;
    logoLarge?: string;
}

export interface ConsCompany {
    id?: number;
    code?: string;
    name?: string;
    contactName?: string;
    contactEmail?: string;
    address?: string
    website?: string;
    domain?: string;
    title?: string;
    description?: string;
    isActive?: boolean;
    branding?: PkgCompBranding;
    erpCustomer?: ErpCustomer;
}

export interface TenantCompanyMap {
    id?: number;
    pkgcompanyid?: number;
    tenant: Tenant;
}

export interface ConsCompBranding {
    id?: number;
    banner?: string;
    introText?: string;
    logoSmall?: string;
    logoLarge?: string;
}

export interface UpdatePkgCmpConsumerCmpItemsRequest {
    itemId: number;
    visibility?: boolean;
    modifiedBy?: string;
}

export interface UpdateConsumerCmpItemsRequest {
    itemId: number;
    visibility?: boolean;
    modifiedBy?: string;
}