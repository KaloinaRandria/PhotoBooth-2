import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Constants} from "../../../../class/util/constants";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from '@angular/material/dialog';
import {CalendrierComponent} from '../../calendrier/calendrier.component';
import {Display} from '../../../../class/util/display';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoomService} from "../../../../service/room/room.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BaseService} from "../../../../service/base.service";
import {SheduleComponent} from "./result/shedule/shedule.component";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-insert-reservation',
  templateUrl: './insert-reservation.component.html',
  styleUrls: ['./insert-reservation.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate(300)
      ]),
    ])
  ]
})
export class InsertReservationComponent implements OnInit {
  searchControl = new FormControl();
  options: any[] = [];
  services: any[] = [];
  salles: any[] = [];
  filteredOptions: Observable<any[]> | undefined;

  form: any = {
    clientS: '',
    service: '',
    salle: '',
    date: '',
    debut: '',
    fin: '',
    nombre: '',
    photograph: 'false'
  };

  available: boolean = false;
  canShow: boolean = false;
  data: any;
  dataError: any;

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar : MatSnackBar, private serve: BaseService) {}

  ngOnInit() {
    this.getAllClient();
    this.getAllService();
    this.getAllSalle();
    // Initialisation de filteredOptions déplacée ici pour s'assurer que options est mis à jour
    this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterOptions(value))
    );
  }

  private _filterOptions(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }

  getAllClient() {
    this.http.get(Constants.BACK_URL + '/client/all').subscribe({
      next: (valiny: any) => {
        console.log('Clients retrieved:', valiny); // Ajouter un log pour vérifier les données
        this.options = this.createOptions(valiny.data);
        // Mise à jour de filteredOptions après avoir mis à jour les options
        this.filteredOptions = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterOptions(value))
        );
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  createOptions(data: any) {
    const options = [];
    for (let i = 0; i < data.length; i++) {
      options.push({ value: data[i].id_client, viewValue: data[i].nom + ' ' + data[i].prenom });
    }
    return options;
  }

  getAllService() {
    this.http.get(Constants.BACK_URL + '/service/all').subscribe({
      next: (valiny: any) => {
        this.services = valiny.data;
        console.log(this.services);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getAllSalle() {
    this.http.get(Constants.BACK_URL + '/salle/all').subscribe({
      next: (valiny: any) => {
        this.salles = valiny.data;
        console.log(this.salles);
      },
      error: (err) => {
        console.error(err);
        Display.alert(this.snackBar , (err.error.message),"close",6000);
      }
    });
  }

  submit() {
    console.log(this.form);
  }

  check() {
    this.style = "";
    console.log(this.form);
    const date = this.form.date;
    const heureDebut = this.form.debut;
    const heureFin = this.form.fin;
    const id_salle = this.form.salle;
    const service = this.form.service;
    const nb = this.form.nombre;
    if (date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth(); // Pas besoin de +1 ici
      const day = today.getDate();


      const todayMidnight = new Date(year, month, day, 0, 0, 0, 0);


      const inputDate = new Date(date);

      if (inputDate < todayMidnight) {
        Display.alert(this.snackBar, 'Date cannot be before today', "close", 3000);
        return;
      }
    }
    if (heureDebut && heureFin) {
      const [debutheure, debutminute] = heureDebut.split(':').map(Number);
      const [finheure, finminute] = heureFin.split(':').map(Number);

      const now = new Date();
      const timeDebut = new Date(now.getFullYear(), now.getMonth(), now.getDate(), debutheure, debutminute);
      const timeFin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), finheure, finminute);

      if (timeFin < timeDebut) {
        Display.alert(this.snackBar, 'End hour cannot be before start hour', "close", 5000);
        return;
      }
    }
    if(nb){
      if(nb<=0){
        Display.alert(this.snackBar, 'Number of people should be greater than 0', "close", 5000);
        return;
      }
    }

    if(service == '') {
      Display.alert(this.snackBar , 'cannot check because service is not complete',"close",5000);
      return;
    }

    if (nb == '') {
      Display.alert(this.snackBar , 'Nombre personne cannot be incomplete',"close",5000);
      return;
    }

    if (date == '' || heureDebut == '' || heureFin == '') {
      Display.alert(this.snackBar , 'cannot check because interval hour is not complete',"close",5000);
      return;
    }

    if (id_salle == '') {
      Display.alert(this.snackBar , 'Room is not setted',"close",5000);
      return;
    }

    const info = {
      debut: this.getTimestamp(date, heureDebut),
      fin: this.getTimestamp(date, heureFin),
      id_salle: id_salle,
      id_service : service,
      nb_personne: nb
    };

    const url = Constants.BACK_URL + '/resa/available';
    this.http.post(url, info).subscribe({
      next: (valiny: any) => {
        console.log(valiny);
        this.available = valiny.data.attributes.flag;
        this.canShow = true;
        if(this.available) {
          this.data = valiny.data.attributes;
        } else {
          const dtn = new Date(date);
          const message = (valiny.data.attributes.message)? valiny.data.attributes.message : 'Sorry! ' + dtn.toISOString() + ' [' + heureDebut + ' - ' + heureFin + '] is already reserved';
          this.dataError = {
            message: message
          };
        }

        this.scrollToBottom();
      },
      error: (err) => {
        Display.alert(this.snackBar , 'Internal Error, See log',"close",5000);
        console.error(err);
      }
    });
  }
  calendar() {
    const dialogRef = this.dialog.open(CalendrierComponent, {
      width: '900px',
      height: '500px',
      data: {vue: 'timeGridWeek'}
    });
  }

  getTimestamp(dt: string, heure: string): string {
    let date = new Date(dt);
    let [hours, minutes] = heure.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    return date.toISOString();
  }

  style: string = "";

  confirm() {

    const clientS = this.form.clientS;
    const service = this.form.service;
    const date = this.form.date;
    const heureDebut = this.form.debut;
    const heureFin = this.form.fin;

    console.log(this.data)

    const info = {
      client: {id_client: clientS},
      service: {id_comp_service: service},
      heure_debut: this.getTimestamp(date, heureDebut),
      heure_fin: this.getTimestamp(date, heureFin),
      prix: this.data.prix,
      theme: this.data.theme,
      salle: this.data.theme.salle,
      nb_personne: this.form.nombre,
      photograph: this.form.photograph
    }

    this.serve.sendData(info, '/resa/save').subscribe({
      next: (valiny: any) => {
        this.style = "merged";
        console.log(valiny);
      },
      error: (err) => {
        Display.alert(this.snackBar , 'Internal Error, See log',"close",5000);
        console.error(err);
      }
    });
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  scrollDown(): void {
    window.scrollBy({
      top: 500,
      behavior: 'smooth'
    });
  }

  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  shedule() {
    const dialogRef = this.dialog.open(SheduleComponent, {
      width: '900px',
      height: '500px',
      data: {date: this.form.date}
    });
  }

  facture() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Styles CSS pour la facture
    const styles = {
      header: {
        fontSize: 18,
        fontStyle: 'bold',
        marginBottom: 10,
        textColor: [31, 73, 125]
      },
      subheaderKey: {
        fontSize: 12,
        marginBottom: 5,
        textColor: [31, 73, 125]
      },
      subheaderValue: {
        fontSize: 12,
        marginBottom: 5,
        textColor: [50, 50, 50]
      },
      info: {
        fontSize: 10,
        marginBottom: 3,
        textColor: [50, 50, 50]
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        fillColor: [220, 220, 220]
      },
      tableBody: {
        fontSize: 10,
        textColor: [50, 50, 50]
      },
      total: {
        fontSize: 12,
        fontStyle: 'bold',
        textColor: [31, 73, 125]
      },
      message: {
        fontSize: 10,
        textColor: [50, 50, 50],
        marginBottom: 10
      },
      signature: {
        fontSize: 12,
        textColor: [31, 73, 125],
        alignment: 'right'
      }
    };

    // Logo de l'entreprise (remplacez par le chemin de votre logo)
    const logo = 'http://localhost:8080/files/logo.png';
    doc.addImage(logo, 'PNG', 14, 10, 40, 15);  // Ajoute le logo à la position spécifiée

    // Informations de l'entreprise
    const nomEntreprise = 'Nom de votre entreprise';
    const directeurGeneral = 'Nom du Directeur Général';
    const siegeSocial = 'Adresse du siège social';
    const contactEmail = 'contact@entreprise.com';
    const siteWeb = 'www.entreprise.com';

    // En-tête de la facture
    doc.setFontSize(styles.header.fontSize);
    doc.setTextColor(styles.header.textColor[0], styles.header.textColor[1], styles.header.textColor[2]);
    doc.text('Facture', 120, 20);

    // Sous-en-tête avec informations de l'entreprise
    let currentY = 30;

    // Nom de l'entreprise
    doc.setFontSize(styles.subheaderKey.fontSize);
    doc.setTextColor(styles.subheaderKey.textColor[0], styles.subheaderKey.textColor[1], styles.subheaderKey.textColor[2]);
    doc.text('Nom de l\'entreprise:', 120, currentY);

    doc.setFontSize(styles.subheaderValue.fontSize);
    doc.setTextColor(styles.subheaderValue.textColor[0], styles.subheaderValue.textColor[1], styles.subheaderValue.textColor[2]);
    doc.text(nomEntreprise, 160, currentY); // Ajustez la position pour éviter la superposition

    currentY += 5;

    // Directeur Général
    doc.setFontSize(styles.subheaderKey.fontSize);
    doc.setTextColor(styles.subheaderKey.textColor[0], styles.subheaderKey.textColor[1], styles.subheaderKey.textColor[2]);
    doc.text('Directeur Général:', 120, currentY);

    doc.setFontSize(styles.subheaderValue.fontSize);
    doc.setTextColor(styles.subheaderValue.textColor[0], styles.subheaderValue.textColor[1], styles.subheaderValue.textColor[2]);
    doc.text(directeurGeneral, 160, currentY); // Ajustez la position pour éviter la superposition

    currentY += 5;

    // Siège social
    doc.setFontSize(styles.subheaderKey.fontSize);
    doc.setTextColor(styles.subheaderKey.textColor[0], styles.subheaderKey.textColor[1], styles.subheaderKey.textColor[2]);
    doc.text('Siège social:', 120, currentY);

    doc.setFontSize(styles.subheaderValue.fontSize);
    doc.setTextColor(styles.subheaderValue.textColor[0], styles.subheaderValue.textColor[1], styles.subheaderValue.textColor[2]);
    doc.text(siegeSocial, 160, currentY); // Ajustez la position pour éviter la superposition

    currentY += 5;

    // Email
    doc.setFontSize(styles.subheaderKey.fontSize);
    doc.setTextColor(styles.subheaderKey.textColor[0], styles.subheaderKey.textColor[1], styles.subheaderKey.textColor[2]);
    doc.text('Email:', 120, currentY);

    doc.setFontSize(styles.subheaderValue.fontSize);
    doc.setTextColor(styles.subheaderValue.textColor[0], styles.subheaderValue.textColor[1], styles.subheaderValue.textColor[2]);
    doc.text(contactEmail, 160, currentY); // Ajustez la position pour éviter la superposition

    currentY += 5;

    // Site Web
    doc.setFontSize(styles.subheaderKey.fontSize);
    doc.setTextColor(styles.subheaderKey.textColor[0], styles.subheaderKey.textColor[1], styles.subheaderKey.textColor[2]);
    doc.text('Site Web:', 120, currentY);

    doc.setFontSize(styles.subheaderValue.fontSize);
    doc.setTextColor(styles.subheaderValue.textColor[0], styles.subheaderValue.textColor[1], styles.subheaderValue.textColor[2]);
    doc.text(siteWeb, 160, currentY); // Ajustez la position pour éviter la superposition

    // Date du jour et numéro de facture
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const numeroFacture = '001'; // Numéro de facture fictif pour l'exemple

    doc.setFontSize(styles.info.fontSize);
    doc.setTextColor(styles.info.textColor[0], styles.info.textColor[1], styles.info.textColor[2]);
    doc.text(`Date: ${date}`, 14, 70);
    doc.text(`Numéro de Facture: ${numeroFacture}`, 14, 75);

    // Liste des articles (exemple)
    const articles = [
      { label: 'Location de salle', prix: 200 },
      { label: 'Photographe', prix: 150 },
      { label: 'Décoration spéciale', prix: 100 },
    ];

    let startY = 120; // Position verticale du début du tableau

    // Tableau des articles
    const head = [['Description', 'Prix']];
    const data = articles.map(article => [article.label, `${article.prix} €`]);

    (doc as any).autoTable({
      startY: startY,
      head: head,
      body: data,
      theme: 'grid', // Style du tableau (optionnel)
      headStyles: {
        fillColor: styles.tableHeader.fillColor,
        textColor: [0, 0, 0],
        fontSize: styles.tableHeader.fontSize,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: styles.tableBody.fontSize,
        textColor: styles.tableBody.textColor
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    // Calculer le total
    const total = articles.reduce((acc, article) => acc + article.prix, 0);

    // Total à payer
    doc.setFontSize(styles.total.fontSize);
    doc.setTextColor(styles.total.textColor[0], styles.total.textColor[1], styles.total.textColor[2]);
    doc.text(`Total à payer: ${total} €`, 14, (doc as any).lastAutoTable.finalY + 10);

    // Message et remerciement
    doc.setFontSize(styles.message.fontSize);
    doc.setTextColor(styles.message.textColor[0], styles.message.textColor[1], styles.message.textColor[2]);
    doc.text('Nous vous remercions pour votre confiance!', 14, (doc as any).lastAutoTable.finalY + 20);

    // Signature ou tampon
    doc.setFontSize(styles.signature.fontSize);
    doc.setTextColor(styles.signature.textColor[0], styles.signature.textColor[1], styles.signature.textColor[2]);
    doc.text('Signature ou Tampon', doc.internal.pageSize.width - 50, (doc as any).lastAutoTable.finalY + 40);

    // Sauvegarder le document PDF avec un nom de fichier basé sur la date
    const fileName = `facture_${date}.pdf`;
    doc.save(fileName);
  }
}
