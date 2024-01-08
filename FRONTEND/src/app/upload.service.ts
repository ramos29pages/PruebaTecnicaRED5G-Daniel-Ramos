import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let csvToJson = require('convert-csv-to-json'); 

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  url: string = '';

  constructor(private http: HttpClient) {}

  csvToObject(file: File) {
    let result = csvToJson.getJsonFromCsv(file);
    return result;
  }

}
