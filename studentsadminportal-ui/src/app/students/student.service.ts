import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7150';
  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/api/students');
  }
  getStudent(studentId: string) : Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/api/Students');
  }
  getStudentById(studentId: string): Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl + '/api/Students/' + studentId)
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastname: studentRequest.lastname,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/api/students/' + studentId, updateStudentRequest);
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/api/students/' + studentId);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastname: studentRequest.lastname,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    };

    return this.httpClient.post<Student>(this.baseApiUrl + '/api/Students/Students/Add', addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImage", file);

    return this.httpClient.post(this.baseApiUrl + '/api/students/' + studentId + '/upload-image',
      formData, {
      responseType: 'text'
    }
    );
  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
