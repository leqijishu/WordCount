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

export class WordCounter {
    clean(text: string): string {
        return text.replace(/^#.*$/gm, '').trim();
    }

    public count(text: string): number {
        const cleaned = this.clean(text);
        if (cleaned.length === 0) {
            return 0;
        }

        const enRegex = new RegExp(/\b[A-Za-z0-9]+['-_]?[A-Za-z0-9]*\b/g);
        const enWords = (cleaned.match(enRegex) || []).length;
        const cjkRegex = new RegExp(/[\u4E00-\u9FFF\u3000-\u303F\uFF01-\uFF65\u2010-\u2013\u2016-\u205F\uFE10-\uFE4F\u00B7\u2E80-\u2EFF]/gu);
        const cjkWords = (cleaned.match(cjkRegex) || []).length;
        const dashRegex = new RegExp(/——/g);
        const dashWords = (cleaned.match(dashRegex) || []).length;

        return cjkWords + enWords + dashWords;
    }
}
