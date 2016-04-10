import {Component, OnInit} from "angular2/core";
import {ControlGroup, Control, Validators, FormBuilder} from "angular2/common";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: "login",
    templateUrl: "/client/login/login.html", styleUrls: ["/client/login/login.css"]
})

export class LoginComponent {
    loginForm: ControlGroup;

    constructor(private _formbuiler: FormBuilder, private _router: Router) { }

    ngOnInit() {
        this.loginForm = this._formbuiler.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    login() {
        console.log(this.loginForm);
        this._router.navigate(["Dashboard"]);
    }
}