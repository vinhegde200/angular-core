import { SearchOperation } from "./constants";

export interface ApiResponse<T> {
    data: T;
}

export interface PortalError {
    code: number;
    message: string;
}

export interface SearchRequest {
    pageNumber?: number;
    pageSize?: number;
    searchCriterias: SearchCriteria[];
    sortCriterias: SortCriteria[];
}

export interface SearchCriteria {
    column?: string;
    op?: string;
    value1?: string;
    value2?: string;
}

export interface SortCriteria {
    column?: string;
    order?: number; // asc or desc
}

export interface PaginatedResponse<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}

export interface StatusResponse {
    status: string;
}

export enum StatusResponses {
    OK = 'OK',
    FAILED = 'FAILED',
    NO_RECORDS = 'NO_RECS'
}

export class TablePageControl {
    constructor(first: number, pageSize: number) {
        this.first = first;
        this.pageSize = pageSize;
    }
    totalRecords: number = 0;
    first: number = 0;
    pageSize: number = 10;

    updatePageNum(first: number) {
        this.first = first;
    }
    getPageNum() {
        return (this.first / this.pageSize) + 1;
    }
}

export interface MatchModeOptions {
    [key: string]: { label: string; value: SearchOperation }[];
}

export interface DefaultSearchOptions {
    [key: string]: SearchOperation
}
