const { execSync } = require('child_process')

// 获取当前分支
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim()

// 定义允许执行钩子的目标分支（可配置多个，如 ['main', 'dev']）
const targetBranches = ['dev']

if (targetBranches.includes(currentBranch)) {
    // 分支匹配，执行钩子逻辑（如 ESLint 检查）
    execSync('pnpm lintfix', { stdio: 'inherit' })
    execSync('git add .', { stdio: 'inherit' })
} else {
    // 分支不匹配，跳过钩子逻辑
    console.log(`当前分支 ${currentBranch} 不匹配目标分支 ${targetBranches.join('、')}，跳过 pre-commit 检查`)
}
