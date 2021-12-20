import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogitemComponent } from '../dialogitem/dialogitem.component';
import { DialogservComponent } from '../dialogserv/dialogserv.component';

@Component({
  selector: 'app-salesadd',
  templateUrl: './salesadd.component.html',
  styleUrls: ['./salesadd.component.css']
})
export class SalesaddComponent implements OnInit {

  //variables de servicio
  idServicio: any;
  tiposerv: string;
  precioserv: string;

  total: string = '0';
  ultimoitem: number = 0;
  createVenta: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Venta';
  fechaactual: any;

  listaClientes: any[];
  listaproductos: any[];
  lista: any[];
  cliente: any = '';


  cantidadt: string = '';
  productoseleccionado: any;
  servicioseleccionado: any;
  totalproducto: any;
  item: any;
  itemservicio: any;
  listaitems: any[];
  showadd: boolean;
  showcalcular: boolean;
  totalnotaventa: string = '0';

  venta: any;
  listaventa: any[];
  idCliente: string = '0';
  ultimoitemoriginal: number = 0;
  stock: string = '0';
  actualizarproducto: any;

  cedulacliente:string='';
  nombrecliente:string='';
  direccion:string='';

  constructor(private fb: FormBuilder,
    private _ventaService: VentaService,
    private _cliente: ClienteService,
    private _servicio: ServicioService,
    private _producto: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private dialogref: MatDialog) {
  }

  ngOnInit() {
    this.fechaactual = new Date().toLocaleString();
    this.lista = [];
    this.showadd = false;
    this.showcalcular = false;
    // this.esEditar();
    this.cargarClientes();
    this.productoseleccionado = {
      cantidad: '',
      descripcion: '',
      fechacompra: '',
      idproveedor: '',
      precioproveedor: '',
      precioventa: '',
      idProducto: ''
    }
    this.actualizarproducto = {
      cantidad: '',
      descripcion: '',
      fechacompra: '',
      idproveedor: '',
      precioproveedor: '',
      precioventa: '',
      idProducto: ''
    }
    this.item = {
      cantidad: '',
      descripcion: '',
      fechacompra: '',
      idproveedor: '',
      precioproveedor: '',
      precioventa: '',
      idProducto: '',
      totalglobal: ''
    }
    this.listaitems = [];

    this.servicioseleccionado = {
      precioventa: '',
      descripcion: '',
      cantidad: ''
    }
    this.itemservicio = {
      precioventa: '',
      descripcion: '',
      totalglobal: '',
      cantidad: ''
    }
    this.venta = {
      idCliente: '',
      fechacreacion: '',
      listaventa: [],
      total: ''
    }
  }

  agregarproductos() {
    const dialog = this.dialogref.open(DialogitemComponent, {
      width: '500px'
    })

    dialog.afterClosed().subscribe(res => {
      if (res != undefined) {
        this.showcalcular = true;
        this.showadd = false;
        this.productoseleccionado = res;
        this.stock = this.productoseleccionado.cantidad;
        console.log(res);

      }
      else {
        this.showcalcular = false;
        this.showadd = false;
      }
    })
  }
  agregarservicios() {
    const dialog = this.dialogref.open(DialogservComponent, {
      width: '500px',
      // data: {idCliente: this.idCliente}
    });

    dialog.afterClosed().subscribe(res => {
      console.log(res);
      if (res != undefined) {
        this.showcalcular = true;
        this.showadd = false;
        this.productoseleccionado.descripcion = res.tiposerv;
        this.productoseleccionado.cantidad = '';
        this.productoseleccionado.precioventa = res.precioserv;
      }
      else {
        this.showcalcular = false;
        this.showadd = false;
      }
    })
  }
  cargarClientes() {
    this.listaClientes = []
    this._cliente.getclientes2().subscribe(res => {
      this.listaClientes = res;
      // console.log(this.listaClientes);
    })
  }
  cargarProductos() {
    this.listaproductos = []
    this._producto.getProductos2().subscribe(res => {
      this.listaproductos = res;
      // console.log(this.listaproductos);
    })
  }
  addProducto() {
    this.item = this.productoseleccionado;
    this.item.totalglobal = this.totalproducto;
    if (!this.listaitems.length) {
      this.listaitems[0] = this.item;
    }
    else {
      this.ultimoitem = this.listaitems.length;
      this.listaitems[this.ultimoitem] = this.item;
    }

    this.totalnotaventa = '0';
    for (let i = 0; i < this.listaitems.length; i++) {
      this.totalnotaventa = (parseFloat(this.totalnotaventa) + parseFloat(this.listaitems[i].totalglobal)).toFixed(2)
    }
    this.cancelar();
  }
  Calcular() {

    if (this.cantidadt == '' || this.cantidadt == null) {
      this.toastr.error('Ingrese la cantidad!', 'Cantidad faltante', {
        positionClass: 'toast-bottom-right'
      });
      this.totalproducto = '0';

    }
    else if (this.productoseleccionado.cantidad == '') {
      this.totalproducto = (this.productoseleccionado.precioventa * parseInt(this.cantidadt)).toFixed(2);
      this.showcalcular = false;
      this.showadd = true;
      this.productoseleccionado.cantidad = this.cantidadt;
    }
    else {
      if (parseInt(this.cantidadt) > this.productoseleccionado.cantidad) {
        this.toastr.error('No disponemos esa cantidad de productos!', 'Stock insuficiente', {
          positionClass: 'toast-bottom-right'
        });
        this.totalproducto = '0';
      }
      else {
        this.showcalcular = false;
        this.showadd = true;
        this.stock = (this.productoseleccionado.cantidad - parseInt(this.cantidadt)).toFixed(0);
        this.actualizarproducto.idProducto = this.productoseleccionado.idProducto;
        this.actualizarproducto.cantidad = this.stock;
        console.log(this.actualizarproducto);

        if (!this.lista.length) {
          this.lista[0] = this.actualizarproducto;
        }
        else {
          this.ultimoitemoriginal = this.lista.length;
          this.lista[this.ultimoitemoriginal] = this.actualizarproducto;
        }
        this.productoseleccionado.cantidad = this.cantidadt;
        console.log(this.lista);
        this.actualizarproducto = {
          cantidad: '',
          descripcion: '',
          fechacompra: '',
          idproveedor: '',
          precioproveedor: '',
          precioventa: '',
          idProducto: ''
        }
        this.totalproducto = (this.productoseleccionado.precioventa * parseInt(this.cantidadt)).toFixed(2);
      }
    }
  }
  eliminaritem(productos) {
    for (let i = 0; i < this.listaitems.length; i++) {
      if (this.listaitems[i].descripcion == productos.descripcion && this.listaitems[i].totalglobal == productos.totalglobal) {
        this.listaitems.splice(i, 1);
        break;
      }
    }
    this.totalnotaventa = '0';
    for (let i = 0; i < this.listaitems.length; i++) {
      this.totalnotaventa = (parseFloat(this.totalnotaventa) + parseFloat(this.listaitems[i].totalglobal)).toFixed(2)
    }
  }
  guardarventa() {
    if (this.idCliente == '0') {
      this.toastr.error('Debe seleccionar el cliente!', 'Cliente', {
        positionClass: 'toast-bottom-right'
      });
    }
    else if (!this.listaitems.length) {
      this.toastr.error('Seleccione productos o servicios!', 'Productos - Servicios', {
        positionClass: 'toast-bottom-right'
      });
    }
    else {
      this.venta.idCliente = this.idCliente;
      this.venta.fechacreacion = this.fechaactual;
      this.venta.listaventa = this.listaitems;
      this.venta.total = this.totalnotaventa;
      console.log(this.venta);
      console.log(this.lista);
      this._ventaService.agregarVenta(this.venta);
      for(let i = 0; i < this.lista.length; i++)
      {
        this._producto.ActualizarCantProducto(this.lista[i].idProducto,this.lista[i].cantidad);
      }
      this.toastr.success('La nota de venta fue registrada con exito!', 'Nota de venta Registrada', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/saleslist']);
    }

  }
  cancelar() {
    this.showadd = false;
    this.showcalcular = false;
    this.cantidadt = '';
    this.totalproducto = '';
    this.stock = '';
    this.productoseleccionado = {
      cantidad: '',
      descripcion: '',
      fechacompra: '',
      idproveedor: '',
      precioproveedor: '',
      precioventa: '',
      idProducto: ''
    }
    this.item = {
      cantidad: '',
      descripcion: '',
      fechacompra: '',
      idproveedor: '',
      precioproveedor: '',
      precioventa: '',
      idProducto: '',
      totalglobal: ''
    }
    // this.listaitems=[];
    // this.lista=[];
    // this.listaproductos=[];
    // this.totalnotaventa='';
  }
  buscarcliente()
  {
    if(this.cedulacliente=='')
    {
      this.toastr.error('Ingrese el número de cédula del Cliente', 'Buscar cliente', {
        positionClass: 'toast-bottom-right'});
    }
    else{
      this._cliente.getClienteCedula(parseInt(this.cedulacliente)).subscribe(res=>{
        if(res.length) 
        {
        this.nombrecliente=res[0].razonsocial;
        this.direccion=res[0].direccion;
        this.idCliente=this.nombrecliente;
        }  
        else{
          this.toastr.error('El número de cédula del Cliente es incorrecto', 'Cliente incorrecto', {
            positionClass: 'toast-bottom-right'});
            this.nombrecliente='';
            this.direccion='';
            this.idCliente='';
        }    
      });
    }
  }
}


