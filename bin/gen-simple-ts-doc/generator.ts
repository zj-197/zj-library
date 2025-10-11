import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { addTitle } from './markdown.ts';
import { getContent } from './utils.ts';

export interface Options {
    out: string;
    src: string;
    titleMap?: Record<string, string>;
    isOutputSingle?: boolean;
    outputSingleConfig?: {
        fileName?: string;
        h1?: string;
        desc?: string
    }

}
function collectionFiles (src: Options['src']) {
    const files: string [] = []
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        let fullPath = path.join(src, entry.name);
        // 这点递归一级
        if (entry.isDirectory()) {
            files.push(path.join(fullPath, 'index.d.ts'));
        } else if (entry.isFile()) {
            const baseName = path.basename(fullPath, '.d.ts');
            files.push(fullPath);
        }
    }
    return files
}

export function generate(options: Options): void {
    const { out, src, titleMap, isOutputSingle, outputSingleConfig } = options;
    let content: string = '';
    if (isOutputSingle && outputSingleConfig?.h1) {
        content += addTitle(outputSingleConfig.h1, 1)
    }
    if (isOutputSingle && outputSingleConfig?.desc) {
        content += ('\n' + outputSingleConfig.desc + '\n\n')
    }
    collectionFiles(src).forEach((filePath) => {
        if (/.d.ts$/.test(filePath)) {
            let markdownName = path.basename(filePath, '.d.ts');
            if (markdownName === 'index') {
                markdownName = path.basename(path.dirname(filePath));
            }
            const buffer = fs.readFileSync(filePath);
            const code = buffer.toString();
            const ast = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest);
            let fileBody: string = '';
            ast.forEachChild((node) => {
                fileBody = fileBody + getContent(node, code);
            });
            if (isNotEmptyContent(fileBody)) {
                if (titleMap) {
                    let title = titleMap[markdownName]
                        ? titleMap[markdownName]
                        : markdownName;
                    content = content + addTitle(title, 2);
                }
                content = content + fileBody;
            }
            if (!isOutputSingle) {
                writeMarkdown(content, out, markdownName);
                content = ''
            }
        }
    });
    if (isOutputSingle) {
        writeMarkdown(content, out, outputSingleConfig?.fileName || 'README');
    }
}

function writeMarkdown(content: string, out: string, markdownName: string): void {
    if (isNotEmptyContent(content)) {
        const fullName = path.resolve(out, markdownName) + '.md';
        if (!fs.existsSync(out)) {
            fs.mkdirSync(out);
        }
        if (fs.existsSync(fullName)) {
            fs.unlinkSync(fullName);
        }
        fs.writeFileSync(fullName, content);
    }
}
function isNotEmptyContent(content: string): boolean {
    return content.trim().length > 0;
}
