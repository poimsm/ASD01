import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ChatComponent } from "./components/chat/chat.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { TiendaComponent } from "./components/tienda/tienda.component";
import { CanalComponent } from "./components/canal/canal.component";
import { JooperComponent } from "./components/jooper/jooper.component";
import { TableroComponent } from "./components/tablero/tablero.component";
import { UserComponent } from "./components/user/user.component";
import { Tablero2Component } from "./components/tablero2/tablero2.component";
import { Content1Component } from "./components/content1/content1.component";
import { Content2Component } from "./components/content2/content2.component";
import { User2Component } from "./components/user2/user2.component";
import { Timeline2Component } from "./components/timeline2/timeline2.component";
import { User3Component } from "./components/user3/user3.component";
import { Home2Component } from "./components/home2/home2.component";
import { LoginComponent } from "./components/login/login.component";
import { LandingComponent } from "./components/landing/landing.component";
import { HotComponent } from "./components/hot/hot.component";
import { RecienteComponent } from "./components/reciente/reciente.component";
import { SiguiendoComponent } from "./components/siguiendo/siguiendo.component";
import { PmComponent } from "./components/pm/pm.component";
import { ProductoComponent } from "./components/producto/producto.component";
import { Land1Component } from "./components/land1/land1.component";
import { Land2Component } from "./components/land2/land2.component";
import { Land3Component } from "./components/land3/land3.component";
import { Land4Component } from "./components/land4/land4.component";

import { LikesComponent } from "./components/likes/likes.component";
import { GuardadoComponent } from "./components/guardado/guardado.component";
import { MyPostComponent } from "./components/my-post/my-post.component";
import { NotificacionesComponent } from "./components/notificaciones/notificaciones.component";

const app_routes: Routes = [
  {
    path: "home2",
    component: Home2Component,
    children: [
      { path: "content1", component: Content1Component },
      { path: "content2", component: Content2Component },
      { path: "tablero2", component: Tablero2Component },
      { path: "chat", component: ChatComponent },
      { path: "**", pathMatch: "full", redirectTo: "content1" }
    ]
  },
  {
    path: "user2",
    component: User2Component,
    children: [
      {
        path: "tablero2",
        component: Tablero2Component,
        children: [{ path: "user2", component: User2Component }]
      }
    ]
  },
  {
    path: "tablero2",
    component: Tablero2Component,
    children: [{ path: "user2", component: User2Component }]
  },
  {
    path: "landing",
    component: LandingComponent,
    children: [
      { path: "land1", component: Land1Component },
      { path: "land2", component: Land2Component },
      { path: "land3", component: Land3Component },
      { path: "land4", component: Land4Component }
    ]
  },
  { path: "user", component: UserComponent },
  { path: "timeline2", component: Timeline2Component },
  { path: "tablero", component: TableroComponent },
  { path: "user3", component: User3Component },
  { path: "login", component: LoginComponent },
  { path: "reciente", component: RecienteComponent },
  { path: "siguiendo", component: SiguiendoComponent },
  { path: "pm", component: PmComponent },
  { path: "producto", component: ProductoComponent },
  { path: "hot", component: HotComponent },
  { path: "chat", component: ChatComponent },
  { path: "guardado", component: GuardadoComponent },
  { path: "mypost/:action/:id", component: MyPostComponent },
  { path: "notificaciones", component: NotificacionesComponent },

  { path: "**", pathMatch: "full", redirectTo: "landing/land1" }
];

export const app_routing = RouterModule.forRoot(app_routes);
