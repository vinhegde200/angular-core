export interface PortalException {
    message: string;
    code: string;
}

export interface SuccessResponse {
    totalRecords: number;
    failedRecords: number;
    portalExceptions?: PortalException[];
}