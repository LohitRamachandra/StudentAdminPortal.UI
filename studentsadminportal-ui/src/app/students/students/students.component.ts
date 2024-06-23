import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from 'src/app/models/api-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  displayedColumns : string[] = ['firstName','lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> =new MatTableDataSource();
@ViewChild(MatPaginator) matPaginator!: MatPaginator;
  constructor(private studentService: StudentService){

  }
  ngOnInit(): void {
    //Fetch Students
    this.studentService.getStudent()
    .subscribe(
      (successResponse) =>{
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

}
