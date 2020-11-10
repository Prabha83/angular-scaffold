import { Component } from "@angular/core";

@Component({
    selector: 'edit-<%= dasherize(name)%>'
})
export class Edit<%= classify(name)%>Component {
    
}