const fs =  require('node:fs');
const webJson = require("../web-types.json")

// 这里替换成你的 vue-components 数组
const vueComponents = webJson.contributions.html["vue-components"]

const tagsJson = {};



for (const comp of vueComponents) {
    const props = comp.props?.map(p => p.name) || [];
    const events = comp.js?.events?.map(e => e.name) || [];

    tagsJson[comp.name] = {
        attributes: [...props, ...events],
        description: comp.description || ''
    };
}

fs.writeFileSync('tags.json', JSON.stringify(tagsJson, null, 2), 'utf-8');
console.log('tags.json 生成完成');
