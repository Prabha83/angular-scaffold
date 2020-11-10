import { Component, OnInit  } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { <%= classify(name)%> } from "../<%= dasherize(name)%>-model";

@Component({
    selector: 'create-<%= dasherize(name)%>',
    templateUrl: 'create-<%= dasherize(name)%>-component.html',
})
export class Create<%= classify(name)%>Component implements OnInit {
    
    <%= dasherize(name)%>: <%= classify(name) %>;
    <%= formName(name)%>: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm() {
        this.<%= dasherize(name)%>Form = this.formBuilder.group({
            <% for(let val in inputs){ %>
            <%=inputs[val].name%> : ["", Validators.required], <%}%>
        });
    }

    onSubmit({ value, valid }: { value: <%= classify(name) %>, valid: boolean }) {
        console.log(value, valid);
    }
}