import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./layout/login/login.component";
import {DashboardComponent} from "./layout/home/dashboard/dashboard.component";
import {BadRequestComponent} from "./layout/status/bad-request/bad-request.component";
import {HomeComponent} from "./layout/home/home.component";
import {InsertStaffComponent} from "./layout/home/staff/insert-staff/insert-staff.component";
import {ListStaffComponent} from "./layout/home/staff/list-staff/list-staff.component";
import {InsertClientComponent} from "./layout/home/client/insert-client/insert-client.component";
import {ListClientComponent} from "./layout/home/client/list-client/list-client.component";
import {InsertMaterialComponent} from "./layout/home/material/insert-material/insert-material.component";
import {ListMaterialComponent} from "./layout/home/material/list-material/list-material.component";
import {InsertThemeComponent} from "./layout/home/theme/insert-theme/insert-theme.component";
import {ListThemeComponent} from "./layout/home/theme/list-theme/list-theme.component";
import {InsertReservationComponent} from "./layout/home/reservation/insert-reservation/insert-reservation.component";
import {ListReservationComponent} from "./layout/home/reservation/list-reservation/list-reservation.component";
import {ListRoomComponent} from "./layout/home/room/list-room/list-room.component";
import {InsertRoomComponent} from "./layout/home/room/insert-room/insert-room.component";
import {InsertCategoryComponent} from "./layout/home/category/insert-category/insert-category.component";
import {ListCategoryComponent} from "./layout/home/category/list-category/list-category.component";
import {MaterialThemeComponent} from "./layout/home/theme/material-theme/material-theme.component";
import { StatisticComponent } from './layout/home/theme/statistic/statistic.component';
import { StatMaterielComponent } from './layout/home/material/stat-materiel/stat-materiel.component';
import {CalendrierComponent} from "./layout/home/calendrier/calendrier.component";
import {StatRevenueComponent} from "./layout/home/revenue/stat-revenue/stat-revenue.component";
import { InsertRecordComponent } from './layout/home/record/insert-record/insert-record.component';
import { ListRecordComponent } from './layout/home/record/list-record/list-record.component';
import { InsertServicesComponent } from './layout/home/services/insert-services/insert-services.component';
import { ListServicesComponent } from './layout/home/services/list-services/list-services.component';
import { ProfitRevenueComponent } from './layout/home/revenue/profit-revenue/profit-revenue.component';
import { StatisticsClientComponent } from './layout/home/client/statistics-client/statistics-client.component';
import { StatisticsReservationComponent } from './layout/home/reservation/statistics-reservation/statistics-reservation.component';
import {StatServiceComponent} from "./layout/home/services/stat-service/stat-service.component";
import {EventComponent} from "./layout/home/event/event.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'calendar', component: CalendrierComponent },
      { path: 'event', component: EventComponent },
      { path: 'staff/insert', component: InsertStaffComponent },
      { path: 'staff/list', component: ListStaffComponent },
      { path: 'client/insert', component: InsertClientComponent },
      { path: 'client/list', component: ListClientComponent },
      { path: 'material/insert', component: InsertMaterialComponent },
      { path: 'material/list', component: ListMaterialComponent },
      { path: 'material/stat', component: StatMaterielComponent },
      { path: 'theme/insert', component: InsertThemeComponent },
      { path: 'theme/insert/materiel', component: MaterialThemeComponent },
      { path: 'theme/list', component: ListThemeComponent },
      { path: 'theme/statistics', component: StatisticComponent },
      { path: 'reservation/insert', component: InsertReservationComponent },
      { path: 'reservation/list', component: ListReservationComponent },
      { path: 'room/list', component: ListRoomComponent },
      { path: 'room/insert', component: InsertRoomComponent },
      { path: 'category/insert', component: InsertCategoryComponent },
      { path: 'category/list', component: ListCategoryComponent },
      { path: 'revenue/statistics', component: StatRevenueComponent },
      { path: 'record/insert', component: InsertRecordComponent },
      { path: 'record/list', component: ListRecordComponent },
      { path: 'services/insert', component: InsertServicesComponent },
      { path: 'services/list', component:  ListServicesComponent},
      { path: 'services/analyse', component:  StatServiceComponent},
      { path: 'revenue/profit', component:  ProfitRevenueComponent},
      { path: 'reservation/statistics', component:  StatisticsReservationComponent},
      { path: 'client/statistics', component:  StatisticsClientComponent}
    ]
  },
  { path: '**', component: BadRequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
