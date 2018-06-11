import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-timeline2',
  templateUrl: './timeline2.component.html',
  styleUrls: ['./timeline2.component.css']
})
export class Timeline2Component implements OnInit {
post: string = "";


elemento: any;
  constructor( public _ps:PostService ) {
    this._ps.getPost().subscribe( ()=>{
      // setTimeout( ()=>{this.elemento.style.backgroundColor="white"},40);
    });
    console.log("eeee: ",this._ps)

  }

  ngOnInit() {
    // this.elemento = document.getElementById('visto');

    $(document)
        .one('focus.autoExpand', 'textarea.autoExpand', function(){
            var savedValue = this.value;
            this.value = '';
            this.baseScrollHeight = this.scrollHeight;
            this.value = savedValue;
        })
        .on('input.autoExpand', 'textarea.autoExpand', function(){
            var minRows = this.getAttribute('data-min-rows')|0, rows;
            this.rows = minRows;
            rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 25);
            this.rows = minRows + rows;
        });

  }

  enviar_post(){    
    if( this.post.length === 0){
      return;
    }
    this._ps.addPost( this.post )
            .then( ()=>this.post="")
            .catch( (err)=>console.error('Error al enviar', err));
  }

}
