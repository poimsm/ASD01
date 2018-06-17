import { Component, OnInit } from "@angular/core";
// import { PostService } from '../../providers/post.service';
import { DataService } from "../../providers/data.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(public _ds: DataService) {}

  ngOnInit() {}

  ingresar(proveedor: string) {
    this._ds.login(proveedor);
  }
  salir() {
    this._ds.logout();
  }
}
