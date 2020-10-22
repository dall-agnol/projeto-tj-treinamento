import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, LoadingController, ModalController, NavController, Platform, ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { CepProvider } from '../../providers/cep/cep';
import { TestePage } from '../teste/teste';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  texto: string = '';
  itemsLista = [];
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    public navCtrl: NavController, 
    public platform: Platform,
    public alertCtrl: AlertController,
    public loaderCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public cepService: CepProvider,
    public camera: Camera
    ) {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
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

  consultarCep() {
    let loader = this.loaderCtrl.create({content: 'Consultando...'});
    loader.present();
    this.cepService.consultaCep('90640000')
    .subscribe(retorno => {
      loader.dismiss();
      console.log('retorno: ', retorno);
    }, err => {
      loader.dismiss();
      console.log('erro ao consultar: ', err)
    })
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


  abrirCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
      .then(image => {
        let base64Image = 'data:image/jpeg;base64,' + image;
        console.log(base64Image)
    })
      .catch(erro => console.log(erro))

  }


}
