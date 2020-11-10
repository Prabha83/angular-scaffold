import { Component } from "@angular/core";

@Component({
    selector: 'list-<%= dasherize(name)%>'
})
export class <%= classify(name)%>Component {
    
}