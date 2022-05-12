import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	

	let disposable = vscode.commands.registerCommand('codelabhub.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from codelabhub!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
