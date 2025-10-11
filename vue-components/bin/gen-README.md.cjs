const fs = require('fs');
const util = require('util');

const path = require('path');
const webTypes  = require("../web-types.json")

// 生成 README 内容
let readme = `
# 组件文档

基于element-plus封装的常见的一些组件

## 组件列表

| 组件名 | 描述 |
|--------|------|
`;

const components = webTypes?.contributions?.html?.['vue-components'] || [];

components.forEach(component => {
    readme += `| [${component.name}](#${component.name}) | ${component.description || '无描述'} |\n`;
});

readme += `\n\n`;

// 组件详情
components.forEach(component => {
    readme += `## ${component.name}\n\n`;
    readme += `${component.description || '无描述'}\n\n`;

    // Props
    if (component.props && component.props.length) {
        readme += `### 属性（Props）\n\n`;
        readme += `| 名称 | 类型 | 默认值 | 描述 |\n`;
        readme += `|------|------|--------|------|\n`;
        component.props.forEach(prop => {
            const type = Array.isArray(prop.type)
                ? prop.type.map(t => typeof t === 'string' ? t : t.name).map(item => item.split('|')).flat(1).map(item => item.trim()).join('，')
                : prop.type;
            readme += `| \`${prop.name}\` | \`${type}\` | ${prop.default || '-'} | ${prop.description || '-'} |\n`;
        });
        readme += `\n`;
    }

    // Events
    if (component.js?.events && component.js.events.length) {
        readme += `### 事件（Events）\n\n`;
        readme += `| 名称 | 描述 |\n`;
        readme += `|------|------|\n`;
        component.js.events.forEach(event => {
            readme += `| \`${event.name}\` | ${event.description || '-'} |\n`;
        });
        readme += `\n`;
    }

    // Slots
    if (component.slots && component.slots.length) {
        readme += `### 插槽（Slots）\n\n`;
        readme += `| 名称 | 描述 |\n`;
        readme += `|------|------|\n`;
        component.slots.forEach(slot => {
            readme += `| \`${slot.name}\` | ${slot.description || '-'} |\n`;
        });
        readme += `\n`;
    }

    // Slots
    if (component.js?.exposed && component.js.exposed.length) {
        readme += `### 暴露的方法/属性（exposed）\n\n`;
        readme += `| 名称 | 描述 | 类型 | \n`;
        readme += `|------|------|------|\n`;
        component.js.exposed.forEach(item => {
            let type = '%s'
            const parameters = (item.parameters || []);
            const isMethod = item.description && item.description.endsWith('方法')
            if (isMethod) {
                type = `(%s)`
            }
            let str = ''
            for (const param of parameters) {
                str += `${param.name}: ${(param.type || []).join("，")}    `
            }
            type = util.format(type, str).trim()
            readme += `| \`${item.name}\` | ${item.description ||  '-'} | ${type || '-'}  |\n`;
        });
        readme += `\n`;
    }
});

// 保存 README.md
fs.writeFileSync('README.md', readme, 'utf-8');
if (!fs.existsSync("../vitepress-docs/vue-components/")) {
    fs.mkdirSync("../vitepress-docs/vue-components/");
}
fs.writeFileSync('../vitepress-docs/vue-components/index.md', readme, 'utf-8');

console.log('✅ README.md 生成完成');
