import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UploadService {
  url: string = 'http://127.0.0.1:8000/payments-';
  fileReader!: FileReader;
  data: any;

  constructor(private http: HttpClient) {
    this.fileReader = new FileReader();
  }

  readFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fileReader.readAsText(file); 
      this.fileReader.onload = () => {
        let content = this.fileReader.result as string;
        let rows = content.split('\n');
        let data = rows.map((row) => row.split(','));
        this.data = this.convertData(data);
        resolve(this.data);
      };
      this.fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  convertData(data: string[][]) {
    let columns = data?.[0];
    if (!columns) {
      return [];
    }
    let rows = data.filter((row) => row.length > 0).slice(1);
    let result = rows.map((row) => {
      let obj: any = {};
      for (let i = 0; i < columns.length; i++) {
        obj[columns[i]] = row[i];
      }
      return obj;
    });
    return result;
  }

  async uploadFile(file: File) : Promise<any[]> {
    let data: any[] = await this.readFile(file);
    let json = JSON.stringify(data);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json'); 
    return data; 
  }

  getPayments(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/payments-status');
  }
}