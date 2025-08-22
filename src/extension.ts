import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

function count(text: string): number {
	return [...text.replace(/^#.*$/gm, '').replace(/\r?\n|\r/g, '')].length;
}

function update(editor?: vscode.TextEditor) {
	if (!editor) {
		statusBarItem.text = '$(book) 0';
		return;
	}

	const length = count(editor.document.getText());
	statusBarItem.text = `$(book) ${length}`;
}

export function activate(context: vscode.ExtensionContext) {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'wordsCount.update';
	statusBarItem.show();

	const disposable = vscode.Disposable.from(
		vscode.window.onDidChangeActiveTextEditor(update),
		vscode.workspace.onDidChangeTextDocument(e =>
			update(vscode.window.activeTextEditor)
		)
	);

	context.subscriptions.push(statusBarItem, disposable);

	update(vscode.window.activeTextEditor);
}

export function deactivate() {
	statusBarItem?.dispose();
}
