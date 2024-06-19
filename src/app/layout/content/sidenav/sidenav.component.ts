import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navData} from "./nav-data";
import {animate, animation, keyframes, style, transition, trigger} from "@angular/animations";
import {fadeInOut, INavbardata} from "./helper";
import {NavigationEnd, Router} from "@angular/router";
import { SublevelMenuComponent } from './sublevel-menu.component';
import {filter} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Display} from "../../../class/util/display";
import {User} from "../../../class/model/user/user";
import {PageAccess} from "../../../class/util/pageAccess";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])

  ]
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData = navData;
  multiple: boolean = false;
  userConnected: any = undefined;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveItem();
    });

    this.updateActiveItem();

    try {
      this.userConnected = User.getUserAuth();
    } catch (e) {
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router, private alert: MatSnackBar) {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbardata): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbardata): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  activeItem: INavbardata | null = null;


  shrinkItems(item: INavbardata): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }

    if (!item.items || item.items.length == 0) {
      this.navigate(item);
    }
  }

  navigate(item: INavbardata) {
    const route = 'home/' + item.routeLink;
    if (this.checkUserRole(item, route)) {
      this.activeItem = item;
      this.router.navigate([route]).then(r => true);
    } else {
      Display.alert(this.alert,'You do not have permission to access this page!',"close",4000);
    }
  }

  checkUserRole(item: INavbardata, routeLink: string): boolean {
    if (!this.userConnected) {
      return true;
    }

    const role = this.userConnected.role.intitule;
    const route = routeLink;

    return PageAccess.verifiate(route, role);
  }

  updateActiveItem() {
    const currentUrl = this.router.url;
    const activeRouteLink = currentUrl.split('/').pop();
    this.activeItem = this.navData.find(item => item.routeLink === activeRouteLink) || null;
  }
}
