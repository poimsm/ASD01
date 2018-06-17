import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment";

import { app_routing } from "./app.routes";

import { PostService } from "./providers/post.service";
import { BrowserService } from "./providers/browser.service";
import { DataService } from "./providers/data.service";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
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
import { PmComponent } from "./components/pm/pm.component";
import { RecienteComponent } from "./components/reciente/reciente.component";
import { HotComponent } from "./components/hot/hot.component";
import { SiguiendoComponent } from "./components/siguiendo/siguiendo.component";
import { ProductoComponent } from "./components/producto/producto.component";
import { Land1Component } from "./components/land1/land1.component";
import { Land2Component } from "./components/land2/land2.component";
import { Land3Component } from "./components/land3/land3.component";
import { LikesComponent } from "./components/likes/likes.component";
import { GuardadoComponent } from "./components/guardado/guardado.component";
import { NgDropFilesDirective } from "./directive/ng-drop-files.directive";
import { DropZoneDirective } from "./directives/drop-zone.directive";
import { NavegarService } from "./providers/navegar.service";
import { InputComponent } from "./components/input/input.component";
import { MyPostComponent } from "./components/my-post/my-post.component";
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    TimelineComponent,
    TiendaComponent,
    CanalComponent,
    JooperComponent,
    TableroComponent,
    UserComponent,
    Tablero2Component,
    Content1Component,
    Content2Component,
    User2Component,
    Timeline2Component,
    User3Component,
    Home2Component,
    LoginComponent,
    LandingComponent,
    PmComponent,
    RecienteComponent,
    HotComponent,
    SiguiendoComponent,
    ProductoComponent,
    Land1Component,
    Land2Component,
    Land3Component,
    LikesComponent,
    GuardadoComponent,
    NgDropFilesDirective,
    DropZoneDirective,
    InputComponent,
    MyPostComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    app_routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [PostService, DataService, BrowserService, NavegarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
