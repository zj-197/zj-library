import ts from 'typescript';
import { addCode, addTitle } from './markdown.ts';

export function isArrowFunction(node: ts.Node, sourceCode: string): boolean {
    return (
        ts.isVariableStatement(node) &&
        sourceCode.slice(node.pos, node.end).includes('=>')
    );
}

export function getJsDoc(node: ts.Node): string {
    let comment: string = '';
    if (ts.isFunctionDeclaration(node)) {
        if (node.name) {
            comment = node.name.escapedText.toString();
        }
    } else if (ts.isVariableStatement(node)) {
        let variable = node.declarationList.declarations[0];
        if (
            ts.isVariableDeclaration(variable) &&
            ts.isIdentifier(variable.name)
        ) {
            comment = variable.name.escapedText.toString();
        }
    } else if (ts.isClassDeclaration(node)) {
        if (node.name) {
            comment = node.name.escapedText.toString();
        }
    }
    if (hasJsDoc(node)) {
        const doc = parserJsDoc(node);
        if (doc) {
            comment += (`（${doc}）`)
        }
    }
    return comment;
}
interface JsDoc {
    comment: string;
}
function parserJsDoc(node: ts.Node): string {
    // @ts-ignore
    const jsDocs: Array<JsDoc> = node['jsDoc'] as Array<JsDoc>;
    const lastJsDoc = jsDocs[jsDocs.length - 1];
    const comment = lastJsDoc.comment
    if (comment) {
        return comment.trim().split('\n')[0];
    }
    return ''
}
export function hasJsDoc(node: ts.Node): boolean {
    // @ts-ignore
    return Array.isArray(node['jsDoc']) && node['jsDoc'].length > 0;
}
export function getContent(node: ts.Node, code: string): string {
    let result: string = '';
    const statement = code.slice(node.pos, node.end).trim();
    if (statement && !ts.isExportDeclaration(node) && !ts.isImportDeclaration(node)) {
        if (!ts.isTypeAliasDeclaration(node) && !ts.isInterfaceDeclaration(node)) {
            result += addTitle(getJsDoc(node));
        }
        result += addCode(statement);
    }
    return result;
}
