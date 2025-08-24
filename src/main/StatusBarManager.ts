/*
 * MIT License
 *
 * Copyright (c) 2025 LeqiJishu, Org. <legal@leqi.jishu>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Project: https://github.com/leqijishu/WordsCount.git
 */

import * as vscode from 'vscode';
import { WordCounter } from "./WordCounter";

export class StatusBarManager {
    private readonly _item: vscode.StatusBarItem;
    private readonly _counter = new WordCounter();

    constructor() {
        this._item = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        this._item.command = 'wordsCount.update';
        this._item.text = '$(book) 0';
        this._item.show();
    }
    
    public refresh(editor?: vscode.TextEditor): void {
        const count = editor ? this._counter.count(editor.document.getText()) : 0;
        this._item.text = `$(book) ${count}`;
    }

    public dispose(): void {
        this._item.dispose();
    }
}
