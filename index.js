// 百度翻译模块
const baidu = require("baidu-translate-api");

// 谷歌翻译模块
const google = require('translate-google');

// 必应翻译模块
const {translate:bing} = require('bing-translate-api');

// 将英文转换成变量名的模块
const change = require("change-case");

// 从命令行获取参数
const args = process.argv.splice(2)
const engine = args[0];
const char = args[1];
const option = args[2];




const engineType = {

    baidu:async function (string){
        let res = await baidu(string, {to: 'en'} );
        return res.trans_result.dst
    },

    bing:async function (string){
        let res = await bing(string, null, 'en', true)
        return res.translation
    },

    google:function(string){
        return google(string, {to: 'en',tld: "cn"})
    },

    change:function(word,option){
        let data = '';
        let funs = `data = change.${option}('${word}')`;
        eval(funs)
        return data;
    }

    
};



async function main(engine,char,option=null){
    let data = (option == null) ? await engineType[engine](char) : await engineType[engine](char,option)
    console.log(data)
}

// main(engine,char,option);
// main('google','你好')
// main('change','get data','camelCase')



























