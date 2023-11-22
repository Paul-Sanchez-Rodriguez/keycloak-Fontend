import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdolescentService } from '@soa/adolescent/services/adolescent.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TutorDto, UpdateTutorDto } from '@soa/adolescent/model/UpdateTutorDto';

@Component({
  selector: 'app-adolescent-list',
  templateUrl: './adolescent-list.component.html',
  styleUrls: ['./adolescent-list.component.scss']
})
export class AdolescentListComponent {

  adolescentColumns: string[] = ['select', 'name', 'Apellidos', 'dni'];
  dataSource: any[] = [];
  dataTutor: any[] = [];
  idTutorAnterior: any;
  idTutornuevo: any;
  dataSouceUpdate: any[] = [];
  attorneyForm!: FormGroup;
  selection = new SelectionModel<any>(true, []);

  seleccionados: any;

  constructor(private fb: FormBuilder, private adolescentService: AdolescentService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll();
    this.findAllTutor();
  };


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    for(const teen of this.dataSource){
      let updateTutorData: TutorDto = {
        teenId: teen.transaccionalAllocation.id_adolescente
      };

      this.dataSouceUpdate.push(updateTutorData);
    };

    console.log(this.dataSouceUpdate)
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  seleccionado(seleccionado: any) {
    this.selection.toggle(seleccionado);
    let seleccionadoFormat: TutorDto = {
      teenId: seleccionado.transaccionalAllocation.id_adolescente
    };
    //this.dataSouceUpdate = seleccionadoFormat;
    this.dataSouceUpdate.push(seleccionadoFormat)
    console.log("seleccionado" + this.dataSouceUpdate);
  }

  findAll() {
    this.adolescentService.findAll().subscribe((res) => {
      this.dataSource = res
      console.log(res)
    });
  }

  UpdateTutores() {

    let updateTutorData: UpdateTutorDto = {
      legalGuardianId: this.idTutornuevo,
      description: "actualizado del front",
      teens: this.dataSouceUpdate
    };

    console.log(updateTutorData)

    this.adolescentService.UpdateAdolescent(updateTutorData).subscribe(res => {
      console.log(res)
    })


    this.findAll();
    this.selection.clear();
    this.idTutorAnterior = '';
    this.idTutornuevo = '';
    this.dataSouceUpdate= [];
  }

  findAllTutor() {
    this.adolescentService.findAlltutor().subscribe((res) => {
      this.dataTutor = res
      console.log(res)
    });
  }

  findbyIdTutor(idTutor: any) {
    this.adolescentService.findbyIdTutor(idTutor).subscribe((res) => {
      this.dataSource = res
      console.log(res)
    });
  }
}
