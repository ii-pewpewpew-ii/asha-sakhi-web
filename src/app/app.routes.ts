import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientListComponent } from './dashboard/patient-list/patient-list.component';
import { AppointmentListComponent } from './dashboard/appointment-list/appointment-list.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { HomeComponent } from './dashboard/home/home.component';
import { DietChatComponent } from './dashboard/diet-chat/diet-chat.component';

export const routes: Routes = [{
    path: "login",
    component: LoginComponent
},
{
    path: 'dashboard',
    component: DashboardComponent,
    children: [{
        path: "patient-list",
        component: PatientListComponent
    }, {
        path: "appointment-list",
        component: AppointmentListComponent
    },
    {
        path: "patient",
        component: PatientProfileComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "diet-chat",
        component: DietChatComponent
    }
    ]
},
];
