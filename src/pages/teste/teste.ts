import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-teste',
  templateUrl: 'teste.html',
})
export class TestePage {
  nome: string =  '';
  idade: number = 0;
  tipo: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    this.nome = this.navParams.get('nome');
    this.idade = this.navParams.get('idade');
  }


  fecharPagina() {
    let params = {
      mensagem: this.idade >= 18 ? 'O usuário é maior de idade' : 'O usuário é menor de idade'
    }
    this.viewCtrl.dismiss(params)
  }

  

}
