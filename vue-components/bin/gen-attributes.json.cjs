const fs = require('fs');
const path = require('path');
const webJson = require("../web-types.json")

// 2. 生成 attributes.json 数据
const attributes = {};

// 遍历所有组件
const components = webJson?.contributions?.html?.['vue-components'] || [];
components.forEach(component => {
    const componentName = component.name;

    // 处理 Props
    (component.props || []).forEach(prop => {
        const key = `${componentName}/${prop.name}`;
        const type = Array.isArray(prop.type)
            ? prop.type.map(t => typeof t === 'string' ? t : t.name).join(' | ')
            : prop.type;

        let description = prop.description || '';
        if (prop['doc-url']) {
            description += `\n\n[Docs](${prop['doc-url']})`;
        }
        attributes[key] = { type, description };
    });

    // 处理 Events（在 Volar 中事件也会作为属性提示）
    (component.js?.events || []).forEach(event => {
        const key = `${componentName}/${event.name}`;
        let description = event.description || '';
        if (event['doc-url']) {
            description += `\n\n[Docs](${event['doc-url']})`;
        }
        attributes[key] = {
            type: 'Function',
            description
        };
    });
});

fs.writeFileSync("attributes.json", JSON.stringify(attributes, null, 2), 'utf-8');

console.log(`✅ 已生成 attributes.json`);
