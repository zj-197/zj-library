import ts from 'typescript';
export declare function isArrowFunction(node: ts.Node, sourceCode: string): boolean;
export declare function getJsDoc(node: ts.Node): string;
export declare function hasJsDoc(node: ts.Node): boolean;
export declare function getContent(node: ts.Node, code: string): string;
