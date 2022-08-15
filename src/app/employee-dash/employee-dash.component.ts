import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeData } from './employee.model';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {

  formValue! : FormGroup;

  employeeObj : EmployeeData =new EmployeeData;

  allEmployeeData : any

  showAdd!:boolean
  showbtn!:boolean

  constructor(private formBuilder: FormBuilder, private api:ApiService ) { };
  


  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      department: ['']
    })
    this.getAllData();
  }

  clickAdd(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }

  addEmployee(){
    this.employeeObj.name=this.formValue.value.name;
    this.employeeObj.email=this.formValue.value.email;
    this.employeeObj.mobile=this.formValue.value.mobile;
    this.employeeObj.address=this.formValue.value.address;
    this.employeeObj.department=this.formValue.value.department;
    
    this.api.postEmployee(this.employeeObj).subscribe(res=>{
      console.log(res);
      alert("Employee Details Added Successfully 🙌");

      let ref= document.getElementById('clear')
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    },
    err=>{
      alert("Something went wrong 😢")
    }
    )
  }

  getAllData(){
    this.api.getEmployee().subscribe(res=>{
      this.allEmployeeData=res;
    })
  }

  deleteEmployee(data:any){
    this.api.deleteEmployee(data.id).subscribe(res=>{
      alert("Record Deleted Successfully")
      this.getAllData();
    })
  }

  onEditEmployee(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.employeeObj.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['department'].setValue(data.department);
  }

  updateEmployee(){
    this.employeeObj.name=this.formValue.value.name;
    this.employeeObj.email=this.formValue.value.email;
    this.employeeObj.mobile=this.formValue.value.mobile;
    this.employeeObj.address=this.formValue.value.address;
    this.employeeObj.department=this.formValue.value.department;

    this.api.updateEmployee(this.employeeObj, this.employeeObj.id).subscribe(res=>{
      alert("Employee Details Updated Successfully");
      
      let ref= document.getElementById('clear')
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    })
  }

}
