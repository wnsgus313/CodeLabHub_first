import { Console } from 'console';
import * as vscode from 'vscode';
import { LabProvider, Dependency } from './lab';

export function activate(context: vscode.ExtensionContext) {
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined; // 워크 스페이스 경로

	// 트리 등록
	const labProvider = new LabProvider(rootPath);
	console.log('aaaa');
	vscode.window.registerTreeDataProvider('labView', labProvider);
	console.log('aaa');


	vscode.commands.registerCommand('codelabhub.refreshLab', () => {
		console.log('aaaa');

		labProvider.refresh();
	});



}

export function deactivate() {}
