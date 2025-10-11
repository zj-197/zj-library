const { execSync } = require('child_process')

try {
    // 更新版本
    console.log('执行 pnpm update:version...')
    execSync('pnpm update:version', { stdio: 'inherit' })

    // 切换到main分支
    console.log('执行 git checkout main...')
    execSync('git checkout main', { stdio: 'inherit' })

    // 合并dev分支，使用theirs策略（冲突时优先采用dev分支的修改）
    console.log('执行 git merge dev -Xtheirs...')
    execSync('git merge dev -Xtheirs', { stdio: 'inherit' })

    // 从远程仓库github拉取main分支的最新代码
    console.log('执行 git pull github main...')
    execSync('git pull github main', { stdio: 'inherit' })

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
