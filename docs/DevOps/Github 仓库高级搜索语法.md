

## 搜索语法

可以使用 `>`、`>=`、`<` 和 `<=` 搜索大于、大于等于、小于以及小于等于另一个值的值。

| 查询         | 示例                                                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `>*n*`     | **[cats vue:>1000](https://github.com/search?utf8=%E2%9C%93&q=vue+stars%3A%3E1000&type=Repositories)** 匹配含有 "vue" 字样、星标超过 1000 个的仓库。                        |
| `>=*n*`    | **[vue topics:>=5](https://github.com/search?utf8=%E2%9C%93&q=vue+topics%3A%3E%3D5&type=Repositories)** 匹配含有 "vue" 字样、有 5 个或更多主题的仓库。                        |
| `<*n*`     | **[vue size:\<10000](https://github.com/search?utf8=%E2%9C%93&q=vue+size%3A%3C10000&type=Code)** 匹配小于 10 KB 的文件中含有 "vue" 字样的代码。                              |
| `<=*n*`    | **[vue stars:\<=50](https://github.com/search?utf8=%E2%9C%93&q=vue+stars%3A%3C%3D50&type=Repositories)** 匹配含有 "vue" 字样、星标不超过 50 个的仓库。                        |
| `*n*..*`   | **[vue stars:10..*](https://github.com/search?utf8=%E2%9C%93&q=vue+stars%3A10..*&type=Repositories)** 等同于 `stars:>=10` 并匹配含有 "vue" 字样、有 10 个或更多星号的仓库。       |
| `*..*n*`   | **[vue stars:*..10](https://github.com/search?utf8=%E2%9C%93&q=vue+stars%3A%22*..10%22&type=Repositories)** 等同于 `stars:\<=10` 并匹配含有 "vue" 字样、有不超过 10 个星号的仓库。 |
| `*n*..*n*` | **[vue stars:10..50](https://github.com/search?utf8=%E2%9C%93&q=cats+stars%3A10..50&type=Repositories)** 匹配含有 "vue" 字样、有 10 到 50 个星号的仓库。                    |

### 添加日期查询

|查询|示例|
|---|---|
|`>*YYYY*-*MM*-*DD*`|**[vue created:>2016-04-29](https://github.com/search?utf8=%E2%9C%93&q=vue+created%3A%3E2016-04-29&type=Issues)** 匹配含有 "vue" 字样、在 2016 年 4 月 29 日之后创建的议题。|
|`>=*YYYY*-*MM*-*DD*`|**[vue created:>=2017-04-01](https://github.com/search?utf8=%E2%9C%93&q=vue+created%3A%3E%3D2017-04-01&type=Issues)** 匹配含有 "vue" 字样、在 2017 年 4 月 1 日或之后创建的议题。|
|`<*YYYY*-*MM*-*DD*`|**[vue pushed:\<2012-07-05](https://github.com/search?q=vue+pushed%3A%3C2012-07-05&type=Code&utf8=%E2%9C%93)** 匹配在 2012 年 7 月 5 日之前推送的仓库中含有 "vue" 字样的代码。|
|`<=*YYYY*-*MM*-*DD*`|**[vue created:\<=2012-07-04](https://github.com/search?utf8=%E2%9C%93&q=vue+created%3A%3C%3D2012-07-04&type=Issues)** 匹配含有 "vue" 字样、在 2012 年 7 月 4 日或之前创建的议题。|
|`*YYYY*-*MM*-*DD*..*YYYY*-*MM*-*DD*`|**[vue pushed:2016-04-30..2016-07-04](https://github.com/search?utf8=%E2%9C%93&q=vue+pushed%3A2016-04-30..2016-07-04&type=Repositories)** 匹配含有 "vue" 字样、在 2016 年 4 月末到 7 月之间推送的仓库。|
|`*YYYY*-*MM*-*DD*..*`|**[vue created:2012-04-30..*](https://github.com/search?utf8=%E2%9C%93&q=vue+created%3A2012-04-30..*&type=Issues)** 匹配在 2012 年 4 月 30 日之后创建、含有 "vue" 字样的议题。|
|`*..*YYYY*-*MM*-*DD*`|**[vue created:*..2012-04-30](https://github.com/search?utf8=%E2%9C%93&q=vue+created%3A*..2012-07-04&type=Issues)** 匹配在 2012 年 7 月 4 日之前创建、含有 "vue" 字样的议题。|

### 排除特定结果

|       |                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NOT` | **[hello NOT world](https://github.com/search?q=hello+NOT+world&type=Repositories)** 匹配含有 "hello" 字样但不含有 "world" 字样的仓库。                                                         |
| -     | **[vue stars:>10 -language:javascript](https://github.com/search?q=vue+stars%3A%3E10+-language%3Ajavascript&type=Repositories)** 匹配含有 "vue" 字样、有超过 10 个星号但并非以 JavaScript 编写的仓库。 |


## 高级的搜索

### 按仓库名称、说明或自述文件内容搜索

| 限定符                    | 示例                                                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `in:name`              | [**vue in:name**](https://github.com/search?q=vue+in%3Aname&type=Repositories) 匹配其名称中含有 "jquery" 的仓库。                                                                                                  |
| `in:description`       | [**vue in:name,description**](https://github.com/search?q=vue+in%3Aname%2Cdescription&type=Repositories) 匹配其名称或说明中含有 "vue" 的仓库。                                                                        |
| `in:readme`            | [**vue in:readme**](https://github.com/search?q=vue+in%3Areadme&type=Repositories) 匹配其自述文件中提及 "vue" 的仓库。                                                                                               |
| `repo:owner/name`      | [**repo:biaochenxuying/blog**](https://github.com/search?q=repo%3Abiaochenxuying%2Fblog) 匹配特定仓库名称，比如：用户为 biaochenxuying 的 blog 项目。                                                                     |
| `user:*USERNAME*`      | [**user:biaochenxuying forks:>=100**](https://github.com/search?q=user%3Abiaochenxuying+forks%3A%3E%3D100&type=Repositories) 匹配来自 [@biaochenxuying](https://github.com/biaochenxuying)、拥有超过 100 复刻的仓库。 |
| `org:*ORGNAME*`        | [**org:github**](https://github.com/search?utf8=%E2%9C%93&q=org%3Agithub&type=Repositories) 匹配来自 GitHub 的仓库。                                                                                           |
| `size:*n*`             | [**size:1000**](https://github.com/search?q=size%3A1000&type=Repositories) 匹配恰好为 1 MB 的仓库。                                                                                                             |
| `followers:*n*`        | [**node followers:>=10000**](https://github.com/search?q=node+followers%3A%3E%3D10000) 匹配有 10,000 或更多关注者提及文字 "node" 的仓库。                                                                               |
| `forks:*n*`            | [**forks:5**](https://github.com/search?q=forks%3A5&type=Repositories) 匹配只有 5 个复刻的仓库。                                                                                                                  |
| `stars:*n*`            | [**stars:500**](https://github.com/search?utf8=%E2%9C%93&q=stars%3A500&type=Repositories) 匹配恰好具有 500 个星号的仓库。                                                                                           |
| `created:*YYYY-MM-DD*` | [**vue created:\<2020-01-01**](https://github.com/search?q=vue+created%3A%3C2020-01-01&type=Repositories) 匹配具有 "vue" 字样、在 2020 年之前创建的仓库。                                                                |
| `pushed:*YYYY-MM-DD*`  | [**css pushed:>2020-02-01**](https://github.com/search?utf8=%E2%9C%93&q=css+pushed%3A%3E2020-02-01&type=Repositories) 匹配具有 "css" 字样、在 2020 年 1 月之后收到推送的仓库。                                             |
| `language:*LANGUAGE*`  | [**vue language:javascript**](https://github.com/search?q=vue+language%3Ajavascript&type=Repositories) 匹配具有 "vue" 字样、以 JavaScript 编写的仓库。                                                               |
| `topic:*TOPIC*`        | [**topic:algorithm**](https://github.com/search?utf8=%E2%9C%93&q=topic%3Aalgorithm&type=Repositories&ref=searchresults) 匹配已归类为 "algorithm" 主题的仓库。                                                      |
| `topics:*n*`           | [**topics:5**](https://github.com/search?utf8=%E2%9C%93&q=topics%3A5&type=Repositories&ref=searchresults) 匹配具有五个主题的仓库。                                                                                 |
