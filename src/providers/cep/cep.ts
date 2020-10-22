import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CepProvider {

  constructor(private http: HttpClient) {
    console.log('Hello CepProvider Provider');
  }

  consultaCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
  }

}
