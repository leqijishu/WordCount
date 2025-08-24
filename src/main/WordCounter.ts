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
        return text
            .replace(/^#.*$/gm, '')
            .replace(/\r?\n|\r/g, ' ')
            .replace(/\s+/g, '')
            .trim();
    }

    public count(text: string): number {
        const cleaned = this.clean(text);

        const cjkRegex = new RegExp([
            '[',
            '\\p{Script=Han}',
            '\\p{Script=Hiragana}',
            '\\p{Script=Katakana}',
            '\\p{Script=Hangul}',
            '\\u3000-\u303F',
            '\\uFF00-\uFFEF',
            '\\u2018\u2019\u201C\u201D',
            ']',
        ].join(''),
            'gu'
        );
        const cjk = (cleaned.match(cjkRegex) || []).length;

        const enRegex = new RegExp(
            '[' +
            'A-Za-z0-9' +
            '!@#$%^&*()_+\\-=' +
            '{}\
            $$\$$ ;:\'"\\\\|,.<>/?' +
            ']',
            'g'
        );
        const enWords = (cleaned.match(enRegex) || []).length;

        return cjk + enWords;
    }
}
