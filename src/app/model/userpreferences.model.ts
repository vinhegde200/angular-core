export interface ColumnPreference {
    columnDisplayName: string; // User customized header
    columnName: string; // Corresponds to Field
    columnType?: string;
    columnWidth?: number;
    isVisible?: boolean;
    order?: number;
    columnFilter?: Filter;
    isFilterable?: boolean;
    filterSource?: string;
    isPinned: boolean;
    isSortable?: boolean;
}

export interface Filter {
    op: string;
    value1: string;
    value2: string;
}

export interface UserPreferences {
    id?: number;
    userId?: number;
    tableName?: string;
    preferenceName?: string;
    description?: string;
    isActive?: boolean;
    color?: string;
    columnPreferences: ColumnPreference[];
}