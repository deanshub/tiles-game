/// <reference path="../typings/_custom.d.ts" />

/*
 * Angular 2 decorators and services
 */
import {Directive, Component, View, ElementRef} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

/*
 * Angular Directives
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';


/*
 * Directive
 * XLarge is a simple directive to show how one of made
 */
@Directive({
  selector: '[x-large]'//, // using [ ] means selecting attributes

})
class XLarge {
  constructor(element: ElementRef) {
    // simple DOM manipulation to set font size to x-large
    // `nativeElement` is the direct reference to the DOM element
    element.nativeElement.style.fontSize = 'x-large';
  }
}


/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'tile' // <app></app>
})
@View({
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  // directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, XLarge ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .myTile {
      flex:1;
      width:100%;
      height:200px;
      border: 2px solid black;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <div class="myTile" (click)="changeColor()"></div>
  `
})
class Tile {
  private tileColor: number = 0;
  private isClickable: boolean = true;
  private colorList:string[] = ['white', 'blue', 'orange'];
  private element:ElementRef;

  constructor(element: ElementRef) {
    // simple DOM manipulation to set font size to x-large
    // `nativeElement` is the direct reference to the DOM element
    this.element = element;
  }

  changeColor(){
    if (this.isClickable) {
      this.tileColor = (this.tileColor + 1) % this.colorList.length;
      this.element.nativeElement.children[0].style['background-color'] = this.colorList[this.tileColor];
    }
  }
}

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'board' // <app></app>
})
@View({
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  // directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, XLarge ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .board{
      display:flex;
    }
    .row {
      width:100%;
      flex:1;
      display:flex;
      flex-direction:column;
    }
    tile{
      width:100%;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  directives : [Tile, CORE_DIRECTIVES],
  template: `
  <div class="board">
    <div *ng-for="#row of [ ['', '', ''], ['', '', ''], ['', '', ''] ]; #x=index" class="row">
      <tile *ng-for="#col of row; #y=index"></tile>
    </div>
  </div>
  `
})
class Board{
  constructor(element: ElementRef){

  }
}


/*
 * Please review the examples/ folder for more angular app examples
 * For help or questions please contact us at @AngularClass on twitter
 * or via chat on gitter at https://gitter.im/angular-class/angular2-webpack-starter
 */


 @Component({
   // The selector is what angular internally uses
   // for `document.querySelectorAll(selector)` in our index.html
   // where, in this case, selector is the string 'app'
   selector: 'app' // <app></app>
 })
 @View({
   // We need to tell Angular's compiler which directives are in our template.
   // Doing so will allow Angular to attach our behavior to an element
   directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, XLarge, Tile, Board ],
   // Our list of styles in our component. We may add more to compose many styles together
   styles: [`
     .title {
       font-family: Arial, Helvetica, sans-serif;
     }
     main {
       padding: 1em;
     }
   `],
   // Every Angular template is first compiled by the browser before Angular runs it's compiler
   template: `
   <header>
     <h1 class="title">This is the awesome tiles game!</h1>
   </header>

   <main>
     <board></board>
   </main>

   <button (click)="createNewGame()">Create new game!</button>
   <footer>
     Written by Lior Bentov and Dean Shub
   </footer>
   `
 })
 export class App {
   // These are member type
   title: string;
   data: Array<any> = []; // default data
   constructor(public http: Http) {
     this.title = 'Angular 2';

     // Our API
     // npm run express-install
     // npm run express

     const BASE_URL = 'http://localhost:3000';
     const TODO_API_URL = '/api/todos';
     const JSON_HEADERS = new Headers({
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     });

     this.http
       .get(BASE_URL + TODO_API_URL, {
         headers: JSON_HEADERS
       })
       .toRx()
       .map(res => res.json())
       .subscribe(
         // onNext callback
         data => this.serverData(data),
         // onError callback
         err  => this.errorMessage(err)
       );//end http
   }

   serverData(data) {
     console.log('data', data);
     this.data = data;
   }//serverData

   errorMessage(err) {
     if (err && (/Unexpected token/).test(err.message) || err.status === 0) {
       console.info(`${'\n'
         } // You must run these commands for the Http API to work in another process ${'\n'
         } npm run express-install ${'\n'
         } npm run express
       `);
     }//end err.message
   }//errorMessage

   createNewGame(){
    //  while the board isnt filled with colors
    //    randomly select a white tile and color it (also randomly)
    //    fill out all tiles that can be automatilcaly built, based on these rules:
    //        1. if two are same color color around with different color
    //        2. if on a row\column h
    //  color white all automatically filled tiles
   }
 }
