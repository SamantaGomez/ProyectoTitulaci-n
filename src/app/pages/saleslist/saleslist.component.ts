import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { VentaService } from 'src/app/services/venta.service';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.css']
})
export class SaleslistComponent implements OnInit {

  ventas: any[] = [];
  palabrabuscar:string='';

   constructor(private _ventaService: VentaService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getVentas()
  }

  getVentas() {
    this._ventaService.getVentas().subscribe(data => {
      this.ventas = [];
      data.forEach((element: any) => {
        this.ventas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      for (let i = 0; i < this.ventas.length; i++) {
        this._ventaService.buscarventacliente(this.ventas[i].idCliente).snapshotChanges().subscribe(res=>{
          // console.log(res);
          
        })
      }
      // console.log(this.ventas);
    });
    
  }

  eliminarVenta(id: string) {
    const confirmacion = confirm('Esta seguro de eliminar el registro?');
    if (confirmacion){
      this._ventaService.eliminarVenta(id);
      this.toastr.error('La venta fue eliminada con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
  async GenerarPDF(venta)
  {
    const pdf = new PdfMakeWrapper();
    pdf.info({
      title: 'Nota de Venta'
    });
    pdf.add(new Txt('Lubricar SG').fontSize(22).bold().color('#A30E0E').alignment('center').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('Nota de Venta').fontSize(20).bold().alignment('center').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Table([
      [{ text: 'Cliente: '+ venta.idCliente}, {text: ' Fecha: ' + venta.fechacreacion}]]).alignment('center').layout('noBorders').fontSize(15).widths(['50%', '50%']).end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Txt('\n').end);
    pdf.add(new Table([
      [{text: 'Descripción', fillColor:'#A30E0E', color:'#fff'}, {text: 'Cantidad', fillColor:'#A30E0E', color:'#fff'}, {text: 'Precio Unitario', fillColor:'#A30E0E', color:'#fff'},{text: 'Total', fillColor:'#A30E0E', color:'#fff'}]]).alignment('center').fontSize(14).widths(['40%', '20%','20%','20%']).end);  
    for (let i = 0; i < venta.listaventa.length; i++) {
      pdf.add(new Table([
        [{text: venta.listaventa[i].descripcion}, {text: venta.listaventa[i].cantidad}, {text: venta.listaventa[i].precioventa+ ' $ '},{text: venta.listaventa[i].totalglobal+ ' $ '}]]).alignment('center').fontSize(14).widths(['40%', '20%','20%','20%']).end);  
    }
    pdf.add(new Txt('\n').end);
    pdf.add(new Table([
      [{}, {}, {text: 'Total:', fillColor:'#A30E0E', color:'#fff'},{text: venta.total + ' $ '}]]).alignment('center').layout('noBorders').fontSize(15).widths(['40%', '20%','20%','20%']).end);  
    pdf.add(new Txt('\n').end);
    pdf.create().open();
  } 
  // filtro 
  buscar() {
    this.palabrabuscar = '';
  }
}
