import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
    selector: "app",
    template: `
        <div class="container">
            <div id="header" class="navbar navbar-inverse navbar-fixed-top">
                <div class="navbar-header">
                    <a class="navbar-brand" [routerLink]="['Dashboard']">
                       Angular 2
                    </a>
                </div>
                <nav class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li>
                            <a [routerLink]="['Dashboard']">Dashboard</a>
                        </li>                                        
                    </ul>
                </nav>
            </div>
            <div id="wrapper">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    // {
    //     path: "/",
    //     redirectTo: ["Dashboard"]
    // },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardComponent,
        useAsDefault: true
    }
])

export class AppComponent { }
