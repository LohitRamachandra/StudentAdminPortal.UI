import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from 'src/app/models/api-models/student.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  displayedColumns : string[] = ['firstName','lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> =new MatTableDataSource();

  constructor(private studentService: StudentService){

  }
  ngOnInit(): void {
    //Fetch Students
    this.studentService.getStudent()
    .subscribe(
      (successResponse) =>{
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

}
