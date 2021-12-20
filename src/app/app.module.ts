import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';

//MATERIAL
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {environment} from '../environments/environment';
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';
import { AuthService } from './services/auth.service';
import { StocktakingComponent } from './pages/stocktaking/stocktaking.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StocktakingaddComponent } from './pages/stocktakingadd/stocktakingadd.component';

import { ProductoService } from './services/producto.service';
import { StockoptionsComponent } from './pages/stockoptions/stockoptions.component';
import { ServlistComponent } from './pages/servlist/servlist.component';
import { ServaddComponent } from './pages/servadd/servadd.component';
import { PaysheetComponent } from './pages/paysheet/paysheet.component';
import { PaysheetaddComponent } from './pages/paysheetadd/paysheetadd.component';
import { ProvideraddComponent } from './pages/provideradd/provideradd.component';
import { ProviderlistComponent } from './pages/providerlist/providerlist.component';
import { SaleslistComponent } from './pages/saleslist/saleslist.component';
import { SalesaddComponent } from './pages/salesadd/salesadd.component';
import { CustomerlistComponent } from './pages/customerlist/customerlist.component';
import { CustomeraddComponent } from './pages/customeradd/customeradd.component';
import { DialogitemComponent } from './pages/dialogitem/dialogitem.component';
import { DialogservComponent } from './pages/dialogserv/dialogserv.component';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FiltroclientePipe } from './pipes/filtrocliente.pipe';
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserinfoComponent,
    StocktakingComponent,
    StocktakingaddComponent,
    StockoptionsComponent,
    ServlistComponent,
    ServaddComponent,
    PaysheetComponent,
    PaysheetaddComponent,
    ProvideraddComponent,
    ProviderlistComponent,
    SaleslistComponent,
    SalesaddComponent,
    CustomerlistComponent,
    CustomeraddComponent,
    DialogitemComponent,
    DialogservComponent,
    FiltroclientePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatIconModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    
  ],
  providers: [AuthService, ProductoService],
  entryComponents: [DialogitemComponent, DialogservComponent],
  bootstrap: [AppComponent],

})
export class AppModule { }
