export interface TableMetadata
{
    id: number;
    tableName: string;
    columnDetails: ColumnDetails[];
    cDate?: Date;
    mDate?: Date;
    createdBy?: string;
    modifiedBy?: string;
}

export interface ColumnDetails
{
    columnName: string;
    columnDisplayName: string;
    columnType: string;
    isSearchable?: boolean;
    isFilterable?: boolean;
    isPreferred?: boolean;
    order?: number;
    filterSource?: FilterSource;
    visibleToRoles: string[];
    isSelected?: boolean;
    isPinned: boolean;
    isRequired?: boolean;
    canEditColumnHeader?: boolean;
}

export interface FilterSource {
    apiUrl: string;
    code: string;
    name: string;
}