import { strings, experimental, normalize } from "@angular-devkit/core";
import {
    apply,
    move,
    mergeWith,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url,
} from "@angular-devkit/schematics";
import { InputType } from "./input-type";
import { Schema } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function scaffold(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const workspaceConfig = tree.read("/angular.json");
        if (!workspaceConfig) {
            throw new SchematicsException(
                "Could not find Angular workspace configuration"
            );
        }

        // convert workspace to string
        const workspaceContent = workspaceConfig.toString();

        // parse workspace string into JSON object
        const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(
            workspaceContent
        );

        if (!_options.project) {
            _options.project = workspace.defaultProject;
        }

        const projectName = _options.project as string;

        const project = workspace.projects[projectName];

        const projectType =
            project.projectType === "application" ? "app" : "lib";

        if (_options.path === undefined) {
            _options.path = `${project.sourceRoot}/${projectType}`;
        }

        const { fields } = _options;
        _options.inputs = [];
        const fieldArr = fields.split(",");
        fieldArr.map((x) => {
            const vals = x.split(":");
            const inputType: InputType = { name: vals[0], type: vals[1] };
            _options.inputs.push(inputType);
        });

        console.log(_options.inputs);
        const sourceTemplates = url("./files");
        const sourceParameterizeTemplate = apply(sourceTemplates, [
            template({
                ..._options,
                ...strings,
                formName(name: string) {
                    return strings.dasherize(name) + "Form";
                },
                putInputType(input: InputType) {
                    if (input.name.indexOf("email") > -1) {
                        return "email";
                    } else if (input.type === "number") {
                        return "number";
                    } else {
                        return "text";
                    }
                },
            }),
            move(normalize(_options.path as string)),
        ]);

        return mergeWith(sourceParameterizeTemplate)(tree, _context);
    };
}
