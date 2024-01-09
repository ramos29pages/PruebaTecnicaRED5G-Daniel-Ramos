import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UploadService {
  url: string = '';
  fileReader!: FileReader;
  data: any;

  constructor(private http: HttpClient) {
    this.fileReader = new FileReader();
  }

  readFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fileReader.readAsText(file); // Esto lee el contenido del archivo como un string
      this.fileReader.onload = () => {
        // Esto se ejecuta cuando el archivo se ha leído
        let content = this.fileReader.result as string; // Esto obtiene el contenido del archivo como un string
        let rows = content.split('\n'); // Esto separa el string por los saltos de línea y obtiene un array con las filas del archivo
        let data = rows.map((row) => row.split(','));
        console.log('READ_FILE:::',data);   
        this.data = this.convertData(data);
        resolve(this.data); // Esto devuelve el array bidimensional
      };
      this.fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  convertData(data: string[][]) {
    let columns = data?.[0]; // Esto obtiene el primer elemento del array, que contiene los nombres de las columnas, si el array no es nulo o indefinido
    if (!columns) {
      // Si columns es nulo o indefinido, se devuelve un array vacío
      return [];
    }
    let rows = data.filter((row) => row.length > 0).slice(1); // Esto obtiene el resto del array, que contiene los valores de las filas, eliminando los elementos vacíos
    let result = rows.map((row) => {
      // Esto recorre cada fila y crea un objeto con las propiedades y valores correspondientes
      let obj: any = {}; // Esto crea un objeto vacío
      for (let i = 0; i < columns.length; i++) {
        // Esto recorre cada columna
        obj[columns[i]] = row[i]; // Esto asigna al objeto la propiedad y el valor correspondientes a la columna y la fila
      }
      return obj; // Esto devuelve el objeto
    });
    console.log('RESULTADO_CSV:::', result);
    return result; // Esto devuelve el array de objetos
  }

  async uploadFile(file: File) : Promise<any[]> {
    let data: any[] = await this.readFile(file);
    let json = JSON.stringify(data);
    console.log('RESULTADO_DATA:::', data);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json'); 
    return data; 
    // this.http.post(this.url, json, {headers: headers});
  }
}