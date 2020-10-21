import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, Platform, ToastController } from 'ionic-angular';
import { TestePage } from '../teste/teste';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  texto: string = '';
  itemsLista = [];
  constructor(
    public navCtrl: NavController, 
    public platform: Platform,
    public alertCtrl: AlertController,
    public loaderCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
    ) {
  }

  abrirPage() {
    this.navCtrl.push(TestePage)
  }

  abrirModal() {
    let parametros = {
      nome: 'Lorenzo',
      idade: 18
    }
    let modal = this.modalCtrl.create(TestePage, parametros);
    modal.present();
    modal.onWillDismiss(data => console.log('retorno da modal: ', data))
  }


  addItem() {
    let item = this.texto;
    this.itemsLista.push(item);
    this.texto = '';
  }

  abrirLoader() {
    let loader = this.loaderCtrl.create({
      content: 'Carregando...'
    });
    loader.present();
    setTimeout(() => {
      loader.dismiss();
    }, 3000)
  }

  abrirToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário logado com sucesso',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  
  
  
  abrirAlerta() {
    let alert = this.alertCtrl.create({
      title: 'Alerta!',
      message: 'Houve um erro ao requisitar',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        },
        {
          text: 'Tentar novamente',
          role: 'confirm',
          handler: () => {
            console.log('requisicao')
          }
        }
      ]
    });
    alert.present();
  }


}
