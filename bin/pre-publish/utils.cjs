const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// 读取目录内容，返回目录下的文件和子目录数组
const readdir = promisify(fs.readdir);
// 读取文件内容
const readFile = promisify(fs.readFile);
// 写入文件内容
const writeFile = promisify(fs.writeFile);
// 创建目录，如果目录已存在则不报错
const mkdir = promisify(fs.mkdir);

// 复制单个文件
async function copyFile(source, target) {
    const data = await readFile(source);
    await writeFile(target, data);
}

// 递归复制目录
async function copyDir(sourceDir, targetDir) {
    const files = await readdir(sourceDir);
    await mkdir(targetDir, { recursive: true });
    for (const file of files) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        const stats = await promisify(fs.stat)(sourcePath);
        if (stats.isDirectory()) {
            await copyDir(sourcePath, targetPath);
        } else {
            await copyFile(sourcePath, targetPath);
        }
    }
}


module.exports = {
    copyDir,
    copyFile
}
