import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { UserPreferencesService } from '../../../services/userpreferences.service';
import { ApiResponse, PortalError } from '../../../model/common.model';
import { UserPreferences } from '../../../model/userpreferences.model';
import { AccessService } from '../../../services/access.service';
import { forkJoin, firstValueFrom } from 'rxjs';
import { TableMetadataService } from '../../../services/tablemetadata.service';
import { ColumnDetails, TableMetadata } from '../../../model/tablemetadata.model';
import { ROLES } from '../../../model/constants';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { MessageDlgService } from '../error-dlg/msg-dlg.service';

@Component({
  selector: 'app-userpreferences',
  standalone: true,
  imports: [
    TranslateModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './userpreferences.component.html',
  styleUrl: './userpreferences.component.scss'
})
export class UserPreferencesComponent implements OnInit {

  constructor(private userPreferencesService: UserPreferencesService, private tableMetadataService: TableMetadataService, private accessService: AccessService, private msgDialogService: MessageDlgService) {

  }

  allUserPreferences: UserPreferences[] = [];
  activeUserPreferences?: UserPreferences;
  tableMetaDataWithUserPreferences?: TableMetadata;
  selectedColumns?: ColumnDetails[] = [];
  tableName: string | undefined = undefined;
  isAnyAdmin: boolean = false;
  currentRole: ROLES = ROLES.user;
  isUserPreferencesLoading: boolean = false;
  searchString: string = "";

  @ViewChild('columnDisplayName') columnDisplayNameInputElement!: ElementRef;

  @Input("tableName") set _tableName(_t: string | undefined) {
    this.tableName = _t;
    if (this.tableName) {
      this.loadDefaultUserPreferences();
    }
  }

  @Input("currentRole") set _currentRole(_cr: string | undefined) {
    console.log("Current role:", _cr);
    this.currentRole = (_cr) ? (_cr as ROLES) : ROLES.user;
  }

  @Input("canSelectVisibility") canSelectVisibility: boolean = false;

  @Output("onClose") onClose = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.loadDefaultUserPreferences();
  }

  async loadDefaultUserPreferences() {
    try {
      if (this.isUserPreferencesLoading == false) {
        this.isUserPreferencesLoading = true;
        if (this.accessService?.user?.id && this.tableName) {
          this.isAnyAdmin = this.accessService.isAnyAdmin();
          forkJoin([
            this.userPreferencesService.getUserPreferencesForTable(this.accessService.user.id, this.tableName),
            this.tableMetadataService.getTableMetadata(this.tableName),
          ]).subscribe({
            next: (res: any) => {
              var userPreferencesResponse = res[0] as ApiResponse<UserPreferences[]>;
              var tableMetadataResponse = res[1] as ApiResponse<TableMetadata>;
              this.allUserPreferences = userPreferencesResponse.data;
              var temp = tableMetadataResponse.data;
              if (temp != null && temp.columnDetails != null) {
                temp.columnDetails = temp.columnDetails.sort((o1, o2) => o1.order != undefined && o2.order != undefined ? o1.order - o2.order : 0);
                if (this.currentRole == ROLES.admin) {
                  temp.columnDetails = temp.columnDetails;
                } else {
                  temp.columnDetails = temp.columnDetails.filter(c => c.visibleToRoles.includes(this.currentRole));
                }
                this.tableMetaDataWithUserPreferences = temp;
              }
              var activePreferences = this.allUserPreferences.filter(o => o.isActive ==
                true);
              if (activePreferences?.length > 0 && this.tableMetaDataWithUserPreferences != undefined) {
                this.activeUserPreferences = activePreferences[0];
                //apply the user preferenes over metadata.
                this.tableMetaDataWithUserPreferences.columnDetails.forEach(column => {
                  var selectedColumns = this.activeUserPreferences?.columnPreferences.filter(o => o.columnName == column.columnName);
                  if (selectedColumns != null && selectedColumns?.length > 0) {
                    column.isPreferred = selectedColumns[0].isVisible;
                    column.isPinned = selectedColumns[0].isPinned;
                    column.isSelected = true;
                    column.order = selectedColumns[0].order;
                    column.columnDisplayName = selectedColumns[0].columnDisplayName;
                  }
                });
                this.tableMetaDataWithUserPreferences.columnDetails = this.tableMetaDataWithUserPreferences?.columnDetails.sort((o1, o2) => o1.order != undefined && o2.order != undefined ? o1.order - o2.order : 0);
                this.selectedColumns = this.tableMetaDataWithUserPreferences.columnDetails;
              }
              else if (this.tableMetaDataWithUserPreferences != undefined) {
                this.tableMetaDataWithUserPreferences.columnDetails.forEach(column => {
                  column.isSelected = column.isPreferred;
                });
                this.tableMetaDataWithUserPreferences.columnDetails = this.tableMetaDataWithUserPreferences?.columnDetails.sort((o1, o2) => o1.order != undefined && o2.order != undefined ? o1.order - o2.order : 0);
                this.selectedColumns = this.tableMetaDataWithUserPreferences.columnDetails;
              }
              this.isUserPreferencesLoading = false;
            },
            error: (err: PortalError) => {
              console.log(err);
              this.msgDialogService.showErrorMsg("Failed to get user preferences");
              this.isUserPreferencesLoading = false;
            }
          })
        }
        else {
          this.msgDialogService.showErrorMsg("User Id or Table Name is invalid");
          this.isUserPreferencesLoading = false;
        }
      }
    }
    catch (err) {
      this.msgDialogService.showErrorMsg("Failed to load user preferences");
      this.isUserPreferencesLoading = false;
    }
  }

  async savePreferences() {
    // make sure atleast one column is selected
    if (this.selectedColumns?.filter(cd => cd.isSelected)?.length == 0) {
      this.msgDialogService.showError("Please select at least one column");
      return;
    }
    // update the tablemetadata with user selection, its helpful in pkg company or customer company admin preferences
    this.tableMetaDataWithUserPreferences?.columnDetails.forEach(cd => {
      if (this.selectedColumns != undefined) {
        var temp = this.selectedColumns.filter(sc => sc.columnName == cd.columnName);
        if (temp != undefined && temp.length > 0) {
          cd.columnDisplayName = temp[0].columnDisplayName;
          cd.isPinned = temp[0].isPinned;
          cd.isPreferred = temp[0].isPreferred;
          cd.order = temp[0].order;
          cd.visibleToRoles = temp[0].visibleToRoles;
          cd.isSelected = temp[0].isSelected;
        }
      }
    });

    var selectedColumns = this.tableMetaDataWithUserPreferences?.columnDetails.filter(cd => cd.isSelected);
    if (selectedColumns != undefined) {
      // if there is already an user preference, update it.
      if (this.activeUserPreferences != undefined && this.activeUserPreferences != null) {
        var newUserPreference: UserPreferences = Object.assign(this.activeUserPreferences);
        newUserPreference.columnPreferences = selectedColumns.map(o => {
          return {
            columnDisplayName: o.columnDisplayName,
            columnName: o.columnName,
            isPinned: o.isPinned,
            isVisible: o.isSelected,
            order: o.order,
          };
        });
        var updatedUserPreferences = await firstValueFrom(this.userPreferencesService.updateUserPreferences(this.activeUserPreferences.id as number, newUserPreference));
        console.log(updatedUserPreferences);
        this.closeDialog(true);
      }
      else {
        var newUserPreference: UserPreferences = {
          isActive: true,
          preferenceName: 'Default',
          tableName: this.tableMetaDataWithUserPreferences?.tableName as string,
          userId: this.accessService.user?.id as number,
          columnPreferences: selectedColumns.map(o => {
            return {
              columnDisplayName: o.columnDisplayName,
              columnName: o.columnName,
              isPinned: o.isPinned as boolean,
              isVisible: o.isSelected,
              order: o.order,
            };
          })
        }
        var createdUserPreferences = await firstValueFrom(this.userPreferencesService.createUserPreferences(newUserPreference));
        if (createdUserPreferences != undefined && createdUserPreferences.data != undefined) {
          this.allUserPreferences.push(createdUserPreferences.data);
          this.activeUserPreferences = createdUserPreferences.data;
        }
        console.log(createdUserPreferences);
        this.closeDialog(true)
      }
      // update table metadata if admin changes any visibility.
      if (this.isAnyAdmin && this.tableMetaDataWithUserPreferences != undefined) {
        await firstValueFrom(this.tableMetadataService.updateTableMetadata(this.tableMetaDataWithUserPreferences.tableName as string, this.tableMetaDataWithUserPreferences));
      }
    }
  }

  closeDialog(flag: boolean = false) {
    this.onClose.emit(flag);
  }

  onRowReorder(event: any) {
    if (this.tableMetaDataWithUserPreferences != undefined) {
      for (var i = 0; i < this.tableMetaDataWithUserPreferences?.columnDetails.length; i++) {
        this.tableMetaDataWithUserPreferences.columnDetails[i].order = i + 1;
      }
    }
  }

  toggleVisibility(columnDetails: ColumnDetails) {
    if (columnDetails.visibleToRoles.includes(ROLES.user) == true) {
      columnDetails.visibleToRoles = columnDetails.visibleToRoles.filter(o => o != ROLES.user);
    }
    else {
      columnDetails.visibleToRoles.push(ROLES.user);
    }
    console.log(columnDetails);
    console.log(this.tableMetaDataWithUserPreferences);
  }

  togglePinned(columnDetails: ColumnDetails) {
    columnDetails.isPinned = !columnDetails.isPinned;
  }

  isPinned(columnDetails: ColumnDetails) {
    return columnDetails.isPinned;
  }

  editColumn(columnDetails: ColumnDetails) {
    if (columnDetails.canEditColumnHeader == true) {
      columnDetails.canEditColumnHeader = false;
    }
    else {
      columnDetails.canEditColumnHeader = true;
      this.columnDisplayNameInputElement?.nativeElement.focus();
    }
  }

  canShowToUser(columnDetails: ColumnDetails) {
    var result = columnDetails.visibleToRoles.includes(ROLES.user);
    return result;
  }

  toggleEditColumnHeader(columnDetails: ColumnDetails) {
    columnDetails.canEditColumnHeader = false;
  }

  onSearch(event: any) {
    if (this.searchString == "") {
      this.selectedColumns = this.tableMetaDataWithUserPreferences?.columnDetails;
    }
    else {
      this.selectedColumns = this.tableMetaDataWithUserPreferences?.columnDetails.filter(cd => cd.columnDisplayName.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  onSelectAll(event: any) {
    if (event.checked == true) {
      this.selectedColumns?.forEach(sc => sc.isSelected = true);
    }
    else {
      this.selectedColumns?.forEach(sc => sc.isRequired != true ? sc.isSelected = false : "");
    }
  }

  getPinTitle(columnDetails: any): string {
    return this.isPinned(columnDetails) ? 'common.unpin' : 'common.pin';
  }
}