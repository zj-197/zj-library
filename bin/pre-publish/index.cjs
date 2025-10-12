const { execSync } = require('child_process')
const path = require('path');
const {copyDir} = require('./utils.cjs')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function genDocs() {
    const sourceDir = path.join(__dirname, "../../", 'vitepress-docs/.vitepress/dist');
    const targetDir = path.join(__dirname, "../../", 'docs');
    try {
        await copyDir(sourceDir, targetDir);
        console.log('目录复制成功');
    } catch (err) {
        console.error('复制过程中出现错误:', err);
    }
}
async function main () {
    const message = process.argv[2]
    try {
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim()
        if (currentBranch === 'dev') {
            execSync('git add .', { stdio: 'inherit' })
            execSync(`git commit -m  ${message}`, { stdio: 'inherit' })
            await sleep(2000)
        } else {
            execSync('git checkout dev', { stdio: 'inherit' })
        }
        // execSync('pnpm cs', { stdio: 'inherit' })
        // 更新版本
        execSync('pnpm update:version', { stdio: 'inherit' })

        // 切换到main分支
        execSync('git checkout main', { stdio: 'inherit' })

        // 合并dev分支，使用theirs策略（冲突时优先采用dev分支的修改）
        console.log('执行 git merge dev -Xtheirs...')
        execSync('git merge dev -Xtheirs', { stdio: 'inherit' })

        // 打包
        console.log('打包')
        execSync('pnpm build:all', { stdio: 'inherit' })

        // 登录
        execSync('npm login', { stdio: 'inherit' })

        // 发包
        execSync("pnpm publish", { stdio: 'inherit' })

        // 生成docs
        await genDocs()

        // 添加文件
        execSync("git add .", { stdio: 'inherit' })

        execSync("git commit --amend --no-edit", { stdio: 'inherit' })

        // 将本地main分支推送到远程仓库github的main分支
        console.log('执行 git push github main...')
        execSync('git push github main', { stdio: 'inherit' })

        // 更新到gitee/main
        console.log('执行 git push gitee main...')
        execSync('git push gitee main', { stdio: 'inherit' })

        // 切换回dev分支
        console.log('执行 git checkout dev...')
        execSync('git checkout dev', { stdio: 'inherit' })

        // 更新到gitee/dev
        console.log('执行 git push gitee dev...')
        execSync('git push gitee dev', { stdio: 'inherit' })

        console.log('所有Git操作执行完成！')
    } catch (error) {
        console.error('执行过程中发生错误：', error.message)
    }
}

main()
