import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class LabProvider implements vscode.TreeDataProvider<Dependency> {
    private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | void> = new vscode.EventEmitter<Dependency | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | void> = this._onDidChangeTreeData.event;
    private labJson;

    constructor(private workspaceRoot: string | undefined) {
        if(workspaceRoot){
            if(fs.existsSync(workspaceRoot)){
                this.labJson = JSON.parse(fs.readFileSync(workspaceRoot, 'utf-8'));
            }
        }
	}

    refresh(): void {
		this._onDidChangeTreeData.fire();
	}

    getTreeItem(element: Dependency): vscode.TreeItem {
        // console.log("🚀 ~ file: lab.ts ~ line 24 ~ LabProvider ~ getTreeItem ~ element", element);

        // if(element.label === 'lab'){            
        //     this.getFunction();
        // }
        // else if(element.label === 'problems'){
        //     this.getProblems();
        // }

		return element;
    }
    // getProblems() {
    //     throw new Error('Method not implemented.');
    // }
    // getFunction() {
    //     throw new Error('Method not implemented.');
    // }


    getChildren(element?: Dependency): Thenable<Dependency[]> {
        console.log('aa');
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No workspace');
			return Promise.resolve([]);
		}

        if (element) {
            console.log("🚀 ~ file: lab.ts ~ line 26 ~ LabProvider ~ getChildren ~ element", element);    
			return Promise.resolve([]);
		} else {
            console.log('aa');
			return Promise.resolve(this.makeLab(path.join(this.workspaceRoot, 'labs.json')));
		}
    }

	private makeLab(labPath: string): Dependency[] {
        if (fs.existsSync(labPath)) {

            const makeTreeLabs = (labName: string): Dependency => {
                return new Dependency(labName, vscode.TreeItemCollapsibleState.Collapsed);
            };

            let res:any = [], labname = [];
            if(this.labJson['labs']){
                for(let i=0; i<Object.keys(this.labJson.labs).length; i++){
                    labname.push(this.labJson['labs'][i]['lab']);
                }
                res = labname.map(lab => makeTreeLabs(lab));
            }
            else{
                res = [];
            }
            console.log("🚀 ~ file: lab.ts ~ line 41 ~ LabProvider ~ makeLab ~ res", res);

            return res;
        } else{
            return [];
        };

    }

}

export class Dependency extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	) {
		super(label, collapsibleState);
		this.contextValue = "labItem";
	}
}