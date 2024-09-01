import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { Configuration } from '../../../model/config.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { SplitterModule } from 'primeng/splitter';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { ConfigurationsComponent } from '../configurations/configurations.component';
import { TranslationComponent } from '../translation/translation.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule,
    SplitterModule,
    TreeTableModule,
    ConfigurationsComponent,
    TranslationComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TreeModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  @ViewChild('configuration') configuration?: ConfigurationsComponent;
  @ViewChild('translation') translation?: TranslationComponent;

  settingsList: TreeNode<any>[] = [];
  selectedModule: string | undefined;

  selectedNode: TreeNode<any> | undefined;
  constructor(private ss: SettingsService) {

  }

  ngOnInit(): void {
    this.settingsList = 
    [
      {
        key: "0",
        expanded: false,
        label: "Configurations",
        selectable: false,
        children: [
          {
            key: "4",
            label: "Keycloak Configurations",
            data: {
              name: "Configurations",
              id: "configurations"
            }
          }
        ]
      },
      {
        key: "1",
        expanded: false,
        label: 'Language Settings',
        selectable: false,
        children: [
          {
            key: "3",
            label: "Languages",
            data: {
              name: "Languages",
              id: "languages"
            }
          }
        ]
      }
    ];
  }

  handleSelection(event: TreeNodeSelectEvent) {
    if (event.node?.data?.id) {
      this.showPage(event.node.data);
    } else {
      event.node.expanded = true;
    }
  }

  showPage(node: any) {
    console.log('NODE DATA IS ', node);
    this.selectedModule = node.id;
  }
}

class SettingsData {
  id?: string;
  label?: string;
  tooltip?: string;
  help?: string;
  icon?: string;
}
