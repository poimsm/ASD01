import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pm",
  templateUrl: "./pm.component.html",
  styleUrls: ["./pm.component.css"]
})
export class PmComponent implements OnInit {
  imgURL =
    "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
  showName1: boolean;
  showName2: boolean;
  showName3: boolean;
  showName4: boolean;
  showName5: boolean;

  constructor() {}
  ngOnInit() {}

  navegar() {
    // mmm
  }
}
