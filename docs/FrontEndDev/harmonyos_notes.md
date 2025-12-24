# 鸿蒙开发学习笔记

## 新技术开发要点

1. 样式书写   
2. 页面布局方式
3. 图片加载
4. 本地缓存
5. 组件定义
6. 父子组件数据通讯
7. 状态数据管理
8. 网络请求，数据渲染
9. 打包，发布上线
10. Canvas, WebGL
11. 动画效果
12. 页面路由
13. 启动页
14. 组件生命周期
15. 页面生命周期

## 个人总结

**UI渲染方式**：函数声明式渲染UI

**常用布局组件**：Row, Column, Flex, 　类似Flex布局

**数据类型声明方式**：以Class进行声明

**所有数据响应更新机制**：只会<mark>监听第一层</mark>级数据变化（对象，数组）

**页面入口规则**: 每个页面必需只能有一个`@Entry`修改，被`@Enty`修改的组件必需要有一个容器组件

**函数声明调用形式**：箭头函数

**组件如何复用**：

## UI渲染笔记

### 差异样式属性

`.LayoutWeight(1)` ,  定义如分配剩余宽高

`.aspectRatiio(1)`　　定义正比宽高

### 声明响应式数据

使用`@State`修饰数据

```ts
@State name: string = "Hello World."
```

### 声明自定义函数组件

使用`@Builder`修饰函数

**注意：该函数组件不会响应`@State`修饰的基础数据类型的变化，可以响应引用类型数据的变化（不能直接传入`@State`修饰的数据，要单独写一个`{obj: xxx}`数据），类似React中的`memo`方法**

```ts
@Builder function TextComp(){
    Row(){
        Text("Hello Text")
    }
}
```

### 声明复用样式

使用`@Style`修改样式函数

```ts
@Styles function textStyle(){
    .width(100)
    .height(50)
}
// 以继承的方式修改某类弄组件
@Extend(Button) function textStyle(){
    .width(120)
    .height(60)
    .borderRadius(30)
    .backgroundColor(Color.Brown)
}
```

### 状态样式

`stateStyles`

```ts
// way 2
@Styles pressStyle() {
    .width(200)
    .height(100)
    .backgroundColor(Color.Pink)
}


Button("Test2")
.stateStyles({
    pressed: {
        .width(100)
        .backgroundColor('red')
    },
    normal: pressStyle,
    focused: {

    },
    disabled: {

    }

})            
```

### 类似renderFunction(插槽)Prop声明

`@BuilderParam`修饰的Prop值需为`@Builder`修饰的方法

```ts
@Component
struct MyComp(){
    @BuilderParam
    getContent: () => void = () => {}

    build(){

    }
}
```

方式二：**尾随闭包**

当组件只有一个`@BuilderParam`修改的方法时，可以使用`MyComp(){...UIComp}`形式传入Prop

### 条件循环渲染

```ts
if...else...

ForEach(arr, itemGenerator, keyGenerator)
```

### 图片资源加载

1. 本地图片加载`Image(/assets/img.png)`

2. Resource资源加载`$r('app.media.img.png')`

3. rawfile资源加载`$rawfile('app.img.png')`

### 数据通讯

1. 父组件向子组件传递Prop数据，直接使用对象`{data: xxx}`传递到子组件，子组件中需要声明对应的属性值(只是单向数据传递，不会响应数据变化更新)
2. 父组件向子组件传递数据，子组件中用`@Prop`修改属性，会根据父组件数据变化重新渲染（数据为单向传递）
3. 父组件向子组件传递数据，子组件中用`@Link`修改属性，父组件传递数据用`$xxx_data`　进行传递（类似引用传递），会根据父组件数据变化重新渲染（数据为双向传递）
4. `@Provide, @Consume` 实现跨组件状态共享，可以给`@Provide("name"), @Consum("name")` 重命名
5. 可以使用`@Watch("funName")`来监听`@Prop, @Link, @Provide, @State`修饰数据的变化，组件第一次渲染不会执行
6. `@Observed, @ObjectLink`，实现数据双向绑定，数据变化可重新渲染UI

### 共享数据的管理

1. 页面级数据共享`LocalStorage`,  通过`LocalStorage`对象生成共享数据(可导出，内存级数据共享)，在页面`@Entry(localStorageData)`入口传入数据，在页面组件中使用`@LocalStorageProp("key")、@LocalStorageLink("key")`　修饰来获取数据，非本地持久存储。

2. 应用级数据共享`AppStorage`, 通过`AppStorage.SetOrCreate(key, val)`　来添加数据，通过`@StorageProp('key'), @StorageLink('key')`　来获取数据，也可以使用`AppStorage.Get<T>('key')`　来获取。

3. 持久化存储`PersistentStorage` ，可以使用`PersistentStorage.PersistProp('key')` ，来声明持久化`AppStorage`中存储的数据。

### 页面路由跳转

1. `router.pushUrl({url: "pages/xxx.ejs" })`
2. `router.replaceUrl({url: "pages/xxx.ejs" })`
3. `router.back()`　，带参数返回必须传`url`
4. `router.getParams()` 可以获取页面传递进来的参数
5. `router.RouterMode.Standard, router.RouterMode.Single`

### 页面生命周期

1. `aboutToAppear(){}`：　组件加载，类似`ComponentDidMount` ,可以在这里发送数据请求
2. `onPageShow(){}` ：当页面显示时执行该方法，只在被`@Entry` 修饰的组件生效
3. `onPageHide(){}` ：当页面隐藏时执行该方法，只在被`@Entry` 修饰的组件生效
4. `onBackPress(){}` ：当用户点击返回按钮时执行该方法，只在被`@Entry` 修饰的组件生效
5. `abouttoDisappear(){}` : 组件销毁，类似`ComponentDidUnmount` 

### UIAbility生命周期

1. `onCreate`

2. `onDestory`

3. `onWindowStageCreate`

4. `onnWindowStateDestory`

5. `onForeground`

6. `onBackground`

**调起一个Ability**

```ts
Button("去支付")
.onClick(() => {
    const context = getContext(this) as common.UIAbilityContext
    const want: Want = {
        bundleName: 'com.xxx.xxx',
        abilityName: 'xxxAbility'
    }
    context.startAbility(want, () => {

    })
})
```

    

### 

### 疑问

1. 　一个UIAbility 有何作用？一个应用多个UIAbility有何作用？（一个UIAbility对应一个后台任务）  
2.  `AppStorage.setAndLink()`  如何使用，作用是什么？ （可以设置并获得对应属性的双向绑定数据，可以进行`set`和`get`）
