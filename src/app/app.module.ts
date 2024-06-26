import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HeaderComponent } from './layout/content/header/header.component';
import { SidenavComponent } from './layout/content/sidenav/sidenav.component';
import { BodyComponent } from './layout/content/body/body.component';
import { DashboardComponent } from './layout/home/dashboard/dashboard.component';
import { HomeComponent } from './layout/home/home.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { SublevelMenuComponent } from './layout/content/sidenav/sublevel-menu.component';
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import {CdkMenu, CdkMenuModule, CdkMenuTrigger} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import { BadRequestComponent } from './layout/status/bad-request/bad-request.component';
import { SendComponent } from './layout/element/button/send-btn/send.component';
import { GitBtnComponent } from './layout/element/button/git-btn/git-btn.component';
import { ProBtnComponent } from './layout/element/button/pro-btn/pro-btn.component';
import { HvBtnComponent } from './layout/element/button/hv-btn/hv-btn.component';
import { ServerErrorComponent } from './layout/status/server-error/server-error.component';
import {BaseChartDirective} from "ng2-charts";
import { BaseContentComponent } from './layout/home/base-content/base-content.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardHeader, MatCardModule} from "@angular/material/card";
import { InputStyleComponent } from './layout/element/input/input-style/input-style.component';
import { InsertStaffComponent } from './layout/home/staff/insert-staff/insert-staff.component';
import { ListStaffComponent } from './layout/home/staff/list-staff/list-staff.component';
import { InsertClientComponent } from './layout/home/client/insert-client/insert-client.component';
import { ListClientComponent } from './layout/home/client/list-client/list-client.component';
import { InsertMaterialComponent } from './layout/home/material/insert-material/insert-material.component';
import { ListMaterialComponent } from './layout/home/material/list-material/list-material.component';
import { InsertThemeComponent } from './layout/home/theme/insert-theme/insert-theme.component';
import { ListThemeComponent } from './layout/home/theme/list-theme/list-theme.component';
import { InsertReservationComponent } from './layout/home/reservation/insert-reservation/insert-reservation.component';
import { ListReservationComponent } from './layout/home/reservation/list-reservation/list-reservation.component';
import { InsertRoomComponent } from './layout/home/room/insert-room/insert-room.component';
import { ListRoomComponent } from './layout/home/room/list-room/list-room.component';
import { InsertCategoryComponent } from './layout/home/category/insert-category/insert-category.component';
import { ListCategoryComponent } from './layout/home/category/list-category/list-category.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { MaterialThemeComponent } from './layout/home/theme/material-theme/material-theme.component';
import { PopUpComponent } from './layout/home/staff/list-staff/pop-up/pop-up.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { StatisticComponent } from './layout/home/theme/statistic/statistic.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddComponent } from './layout/home/material/list-material/add/add.component';
import { StatMaterielComponent } from './layout/home/material/stat-materiel/stat-materiel.component';
import {MatFormField} from "@angular/material/form-field";
import {MatAutocomplete, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ModifyClientComponent } from './layout/home/client/list-client/modify-client/modify-client.component';
import { ModifyRoomComponent } from './layout/home/room/list-room/modify-room/modify-room.component';
import { ModifyCategComponent } from './layout/home/category/list-category/modify-categ/modify-categ.component';
import {MatDatepicker, MatDatepickerToggle} from "@angular/material/datepicker";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInput} from "@angular/material/input";
import {FullCalendarModule} from "@fullcalendar/angular";
import { MatRadioModule } from '@angular/material/radio';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendrierComponent } from './layout/home/calendrier/calendrier.component';
import { PopUpConfirmationComponent } from './layout/home/reservation/list-reservation/pop-up-confirmation/pop-up-confirmation.component'; // Importez le plugin dayGrid
import { StatRevenueComponent } from './layout/home/revenue/stat-revenue/stat-revenue.component';
import { InsertRecordComponent } from './layout/home/record/insert-record/insert-record.component';
import { ListRecordComponent } from './layout/home/record/list-record/list-record.component';
import { PopUpEditRecordComponent } from './layout/home/record/list-record/pop-up-edit-record/pop-up-edit-record.component';
import { LogoutPopUpComponent } from './layout/content/header/logout-pop-up/logout-pop-up.component';
import { SuccessComponent } from './layout/home/reservation/insert-reservation/result/success/success.component';
import { DangerComponent } from './layout/home/reservation/insert-reservation/result/danger/danger.component';
import { SheduleComponent } from './layout/home/reservation/insert-reservation/result/shedule/shedule.component';
import { InsertServicesComponent } from './layout/home/services/insert-services/insert-services.component';
import { ListServicesComponent } from './layout/home/services/list-services/list-services.component';
import { ProfitRevenueComponent } from './layout/home/revenue/profit-revenue/profit-revenue.component';
import { StatisticsClientComponent } from './layout/home/client/statistics-client/statistics-client.component';
import { StatisticsReservationComponent } from './layout/home/reservation/statistics-reservation/statistics-reservation.component';
import { ModiftThemeComponent } from './layout/home/theme/list-theme/modift-theme/modift-theme.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";
import {NgApexchartsModule} from "ng-apexcharts";
import { StatServiceComponent } from './layout/home/services/stat-service/stat-service.component';
import { EventComponent } from './layout/home/event/event.component';
import { ActualThemeComponent } from './layout/content/actual-theme/actual-theme.component';
import { ProfitStatComponent } from './layout/element/profit-stat/profit-stat.component';
import { ReservationDoneComponent } from './layout/home/reservation/reservation-done/reservation-done.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    HomeComponent,
    SublevelMenuComponent,
    BadRequestComponent,
    SendComponent,
    GitBtnComponent,
    ProBtnComponent,
    HvBtnComponent,
    ServerErrorComponent,
    BaseContentComponent,
    InputStyleComponent,
    InsertStaffComponent,
    ListStaffComponent,
    InsertClientComponent,
    ListClientComponent,
    InsertMaterialComponent,
    ListMaterialComponent,
    InsertThemeComponent,
    ListThemeComponent,
    InsertReservationComponent,
    ListReservationComponent,
    InsertRoomComponent,
    ListRoomComponent,
    InsertCategoryComponent,
    ListCategoryComponent,
    MaterialThemeComponent,
    PopUpComponent,
    StatisticComponent,
    AddComponent,
    StatMaterielComponent,
    ModifyClientComponent,
    ModifyRoomComponent,
    ModifyCategComponent,
    CalendrierComponent,
    PopUpConfirmationComponent,
    StatRevenueComponent,
    InsertRecordComponent,
    ListRecordComponent,
    PopUpEditRecordComponent,
    LogoutPopUpComponent,
    SuccessComponent,
    DangerComponent,
    SheduleComponent,
    InsertServicesComponent,
    ListServicesComponent,
    ProfitRevenueComponent,
    StatisticsClientComponent,
    StatisticsReservationComponent,
    ModiftThemeComponent,
    StatServiceComponent,
    EventComponent,
    ActualThemeComponent,
    ProfitStatComponent,
    ReservationDoneComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        FontAwesomeModule,
        NgOptimizedImage,
        CdkMenu,
        CdkMenuTrigger,
        OverlayModule,
        CdkMenuModule,
        BaseChartDirective,
        MatIcon,
        MatFabButton,
        MatCard,
        MatCardHeader,
        MatCardActions,
        MatButton,
        MatCardModule,
        ReactiveFormsModule,
        MatProgressSpinner,
        CarouselModule.forRoot(),
        MatDialogModule,
        MatFormField,
        MatAutocomplete,
        MatOption,
        MatSelect,
        MatAutocompleteModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        MatDatepickerToggle,
        MatDatepicker,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInput,
        FullCalendarModule,
        MatRadioModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginator,
        NgApexchartsModule
    ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
