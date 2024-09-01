import { Tenant } from "./company.model";

export interface Role {
    id?: number;
    name: string;
    description?: string;
}

export interface AppUserData {
    id?: number;
    sid?: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    accessToken?: string;
    password?: string;
    roles?: Role[];
    tenant: Tenant;
    enabled: boolean;
    companies?: Company[];
    company?: string;
    erpcontactid?: number;
}

// export interface ConsumerCompany {
//     id?: number;
//     name?: string;
//     description?: string;
//     website?: string;
//     domain?: string;
//     title?: string;
// }

export interface Company {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    website?: string;
    domain?: string;
    title?: string;
    isActive?: boolean;
    branding?: Branding;
    type?: number;
}

export interface Branding {
    id?: number;
    banner?: string;
    introText?: string;
    logoSmall?: string;
    logoLarge?: string;
}

export interface Page {
    id?: number,
    name?: string;
    sections: PageSection[];
}

export interface PageSection {
    id?: number;
    order?: number;
    name?: string;
    header: string;
    content: string;
}