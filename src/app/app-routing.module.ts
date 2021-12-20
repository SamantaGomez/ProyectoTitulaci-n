import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './pages/login/login.component';
import { RegisterComponent} from './pages/register/register.component';
import { UserinfoComponent} from './pages/userinfo/userinfo.component';
import {StocktakingComponent} from './pages/stocktaking/stocktaking.component';
import {StocktakingaddComponent} from './pages/stocktakingadd/stocktakingadd.component';
import {StockoptionsComponent} from './pages/stockoptions/stockoptions.component';
import {ServaddComponent} from './pages/servadd/servadd.component';
import {ServlistComponent} from './pages/servlist/servlist.component';
import {PaysheetaddComponent} from './pages/paysheetadd/paysheetadd.component';
import {PaysheetComponent} from './pages/paysheet/paysheet.component';
import {ProvideraddComponent} from './pages/provideradd/provideradd.component';
import {ProviderlistComponent} from './pages/providerlist/providerlist.component';
import {SalesaddComponent} from './pages/salesadd/salesadd.component';
import {SaleslistComponent} from './pages/saleslist/saleslist.component';
import { CustomerlistComponent } from './pages/customerlist/customerlist.component';
import { CustomeraddComponent } from './pages/customeradd/customeradd.component';

const routes: Routes = [
{path:'', redirectTo:'/login', pathMatch:'full'},
{path:'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'register/:id', component: RegisterComponent},
{path:'userinfo', component: UserinfoComponent},
{path:'stocktaking', component: StocktakingComponent},
{path:'stocktakingadd', component: StocktakingaddComponent},
{path:'stocktakingedit/:id', component: StocktakingaddComponent},
{path:'stockoptions', component: StockoptionsComponent},
{path:'servlist', component: ServlistComponent},
{path:'servadd', component: ServaddComponent},
{path:'servedit/:id', component: ServaddComponent},
{path:'paysheet', component: PaysheetComponent},
{path:'paysheetadd', component: PaysheetaddComponent},
{path:'paysheetedit/:id', component: PaysheetaddComponent},
{path:'providerlist',component:ProviderlistComponent},
{path:'provideradd',component:ProvideraddComponent},
{path:'provideredit/:id',component:ProvideraddComponent},
{path:'saleslist',component:SaleslistComponent},
{path:'salesadd',component:SalesaddComponent},
{path:'salesedit/:id',component:SalesaddComponent},
{path:'customerlist',component:CustomerlistComponent},
{path:'customeradd',component:CustomeraddComponent},
{path:'customeredit/:id',component:CustomeraddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
