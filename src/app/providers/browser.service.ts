import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class BrowserService {
  constructor(private router: Router) {}

  goPlaces(donde: string) {
    if (donde === "adelante") {
      this.router.navigate(["/", "reciente"]);
    }
    if (donde === "chat") {
      this.router.navigate(["/", "chat"]);
    }
    if (donde === "user") {
      this.router.navigate(["/", "user"]);
    }
    if (donde === "land1") {
      this.router.navigate(["../", "landing", "land1"]);
    }
    if (donde === "land2") {
      this.router.navigate(["../", "landing", "land2"]);
    }
    if (donde === "land3") {
      this.router.navigate(["../", "landing", "land3"]);
    }
    if (donde === "chaat") {
      this.router.navigate(["../", "landing", "land3"]);
    }
    if (donde === "post") {
      this.router.navigate(["/", "post"]);
    }
    console.log("aaaaajammmm");
  }
}
