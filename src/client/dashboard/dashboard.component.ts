import {Component} from "angular2/core";

@Component({
    selector: "dashboard",
    template: `
        <h3> {{message}} </h3>
    `
})

export class DashboardComponent {
    public name = "Smart Quiz";
    public message = "";

    constructor() {
        this.message = "Heloo " + this.name + " !";

    }
}
