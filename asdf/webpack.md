module.exports = {
    mode: 'development',
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // 从右往左
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'], // 从右往左
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader', // 从右往左
            },
            {
                // 图片处理loader配置
                test: /\.(png|jpg|gif)$/i, // 正则匹配图片文件
                //遇到图片文件就交给如下loader处理
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit:设定大小阈值
                            // a.被处理图片大小 大于阈值，就通过无力文件重新生成图片
                            // a.被处理图片大小 小于等于阈值，就把图片变为字符串（嵌入到应用文档中，好处是节省一个http资源）
                            limit： 8192,
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
    }
}
url-loader:负责把大小小于等于阈值的图片变为字符串
file-loader:负责把大小大于阈值的图片重新以物理文件形式生成在dist目录
图片loader只能处理css文件的背景图片，而index.html模板中通过img标签做的图片不给处理（只把其当做标签的普通属性了）

style-loader, cee-loader, less-loader
style-loader 负责生成style标签，把css样式体现出来，之后该标签嵌入到应用文档中去
css-loader 使得css文件可以通过import引入，并合并到main.js中
less-loader 该loader负责把less文件内容转变为css内容