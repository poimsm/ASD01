import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {
allImages = "";
width:any;
height:any;
key=true;
h=true;
showVendedor=true;
showDescription=false;
showBusqueda=false;
Tog="content2";
// Get the modal
 modal:any = document.getElementById('myModal');

// Get the button that opens the modal
 btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
 span = document.getElementsByClassName("close")[0];

getRandomSize = function(min:number, max:number){
      return Math.round(Math.random() * (max - min) + min);
    };



  constructor() {}

  ngOnInit() {

    for (var i = 0; i < 25; i++) {

      this.width = this.getRandomSize(200, 400);
      this.height =  this.getRandomSize(200, 400);
      this.allImages += '<img  src="https://placekitten.com/'+this.width+'/'+this.height+'" alt="pretty kitty">';
    }
    $('#photos').append(this.allImages);
  }

hola(){console.log("hoooo")}

// When the user clicks on the button, open the modal
step1(){
    this.modal.style.display = "block";
}

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// };
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };
toggle(){
  if (this.Tog==="content1") {
    return this.Tog="content2";
  }
  if (this.Tog==="content2") {
    return this.Tog="content1";
  }
}
toggleBusqueda(){
  if (this.showBusqueda) {
    return this.showBusqueda=false;
  }
  if (!this.showBusqueda) {
    return this.showBusqueda=true;
  }
}
}
