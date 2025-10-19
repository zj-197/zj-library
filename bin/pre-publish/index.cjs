const { execSync } = require('child_process')
const path = require('path')
const { copyDir, copyFile } = require('./utils.cjs')
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
async function genDocs() {
    const sourceDir = path.join(__dirname, '../../', 'vitepress-docs/.vitepress/dist')
    const targetDir = path.join(__dirname, '../../', 'docs')
    try {
        await copyDir(sourceDir, targetDir)
        console.log('生成docs文档成功')
    } catch (err) {
        console.error('生成docs文档失败', err)
    }
}

async function genGlobalDTs() {
    const sourceDir = path.join(__dirname, '../../', 'vue-components/global.d.ts')
    const targetDir = path.join(__dirname, '../../', 'global.d.ts')
    try {
        await copyFile(sourceDir, targetDir)
        console.log('global.d.ts复制成功')
    } catch (err) {
        console.error('global.d.ts复制失败', err)
    }
}

async function main() {
    try {
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim()
        try {
            execSync('clear', { stdio: 'inherit' })
        } catch (e) {
            console.error(e.message)
        }
        execSync('git checkout dev', { stdio: 'inherit' })
        // 选择更新包
        execSync('pnpm cs', { stdio: 'inherit' })
        try {
            execSync('clear', { stdio: 'inherit' })
        } catch (e) {}
        // 更新版本
        execSync('pnpm update:version', { stdio: 'inherit' })

        execSync('git add .')

        execSync('git commit --amend --no-edit --no-verify', { stdio: 'inherit' })
        try {
            execSync('clear', { stdio: 'inherit' })
        } catch (e) {}

        // 切换到main分支
        execSync('git checkout main', { stdio: 'inherit' })

        // 合并dev分支，使用theirs策略（冲突时优先采用dev分支的修改）
        console.log('执行 git merge dev -Xtheirs...')
        execSync('git merge dev -Xtheirs --no-edit', { stdio: 'inherit' })

        // 打包
        console.log('开始打包...')
        execSync('pnpm build:all', { stdio: 'inherit' })
        try {
            execSync('clear', { stdio: 'inherit' })
        } catch (e) {}

        await sleep(200)
        // 增加components.d.ts文件
        await genGlobalDTs()
        // 登录
        console.log('开始登录...')

        execSync('npm login', { stdio: 'inherit' })
        try {
            console.log('开始发包...')
            // 发包
            execSync('npm run publish', { stdio: 'inherit' })
        } catch (e) {}
        // 生成docs
        console.log('开始生成docs目录')
        await genDocs()

        // 添加文件
        execSync('git add .', { stdio: 'inherit' })

        execSync('git commit -m 更新文档', { stdio: 'inherit' })

        // 将本地main分支推送到远程仓库github的main分支
        console.log('main分支 推送到github')
        execSync('git push github main', { stdio: 'inherit' })

        // 更新到gitee/main
        console.log('main分支 推送到gitee')
        execSync('git push gitee main', { stdio: 'inherit' })

        // 切换回dev分支
        execSync('git checkout dev', { stdio: 'inherit' })

        // 更新到gitee/dev
        console.log('dev分支 推送到gitee')
        execSync('git push gitee dev', { stdio: 'inherit' })

        console.log('dev分支 推送到github')
        execSync('git push github dev', { stdio: 'inherit' })

        console.log('所有Git操作执行完成！')
    } catch (error) {
        console.error('执行过程中发生错误：', error.message)
    }
}

main()
