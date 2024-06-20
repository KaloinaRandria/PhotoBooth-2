import {Component, Input, OnInit} from '@angular/core';
import {fadeInOut, INavbardata} from "./helper";
import {animate, animation, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {Display} from "../../../class/util/display";
import {PageAccess} from "../../../class/util/pageAccess";
import {User} from "../../../class/model/user/user";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length > 0"
        [@submenu]="expanded ? {value: 'visible', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
        : {value: 'hidden', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}"
        class="sublevel-nav">
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a class="sublevel-nav-link" (click)="handleClick(item)" *ngIf="item.items && item.items.length > 0"
            [ngClass]="getActiveClass(item)"
        >
          <i class="sublevel-link-icon mdi mdi-checkbox-blank-circle"></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
          <i *ngIf="item.items && collapsed" class="menu-collapse-icon"
            [ngClass]="!item.expanded ? 'mdi mdi-chevron-right' : 'mdi mdi-chevron-down'"
          ></i>
        </a>
        <a class="sublevel-nav-link"
           *ngIf="!item.items || (item.items && item.items.length === 0)"
           (click)="navigate(item)"
           routerLinkActive="active-sublevel"
           [routerLinkActiveOptions]="{exact: true}"
        >
          <i class="sublevel-link-icon mdi mdi-checkbox-blank-circle"></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sublevel-menu
            [data]="item"
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          ></app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrl: './sidenav.component.css',
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}),
      animate('{{transitionParams}}') ]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent implements OnInit{
  @Input() data: INavbardata = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(public router: Router, private alert: MatSnackBar) {
  }

  ngOnInit() {
  }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = true;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbardata): string {
    return item.expanded && this.router.url.includes(item.routeLink) ? 'active-sublevel' : ''
  }

  navigate(item: INavbardata) {
    const route = 'home/' + item.routeLink;
    if (this.checkUserRole(item, route)) {
      this.router.navigate([route]).then(r => true);
    } else {
      Display.alert(this.alert,'You do not have permission to access this page!',"close",4000);
    }
  }

  checkUserRole(item: INavbardata, routeLink: string): boolean {

    let userConnected = undefined;
    try {
      userConnected = User.getUserAuth();
    } catch (e) {
      return true;
    }

    if (!userConnected) {
      return true;
    }

    const role = userConnected.role.intitule;
    const route = routeLink;

    return PageAccess.verifiate(route, role);
  }
}
