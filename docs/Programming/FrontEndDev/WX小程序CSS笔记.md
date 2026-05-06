## CSS环境变量

safe-area-inset-top：用于设置顶部安全区域的内边距。  
safe-area-inset-right：用于设置右侧安全区域的内边距。  
safe-area-inset-left：用于设置左侧安全区域的内边距。  
safe-area-inset-bottom：用于设置底部安全区域的内边距，你已经提到。 
safe-area-inset：这是一个简写属性，可以同时设置上下左右的安全区域。

此外，还有一些与屏幕尺寸和位置相关的CSS变量，虽然它们不直接与安全区域相关，但在布局时也可能很有用：

screen-width 和 screen-height：分别表示屏幕的宽度和高度。  
window-width 和 window-height：分别表示当前窗口的宽度和高度。  
viewport-width 和 viewport-height：分别表示视口的宽度和高度。  

## 自定义CSS全局环境变量：

**方法一：使用 app.wxss 文件**

创建或编辑 app.wxss 文件： 在小程序的根目录下创建或编辑 app.wxss 文件。这个文件会被应用到小程序的所有页面上。

定义全局变量： 使用CSS自定义属性（也称为CSS变量）来定义全局变量。例如：

```css
:root {
  --primary-color: #1AAD19;
  --secondary-color: #FF0000;
}
```

在样式中使用这些变量： 在任何页面的 .wxss 文件中，你可以这样使用这些变量：

```css
.button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

```
**方法二：使用 wx.setTabBarStyle 动态设置样式**

虽然 wx.setTabBarStyle 主要用于动态设置底部tab栏的样式，但它也可以间接影响全局样式。例如：

```js
wx.setTabBarStyle({
  color: '#FF0000',
  selectedColor: '#00FF00',
  backgroundColor: '#0000FF',
  borderStyle: 'white'
})
```

**方法三：使用 styleIsolation 和 externalClasses**

在自定义组件中，你可以使用 styleIsolation 和 externalClasses 来控制样式的隔离和外部样式的应用。

设置 styleIsolation：

```js
Component({
  options: {
    styleIsolation: 'apply-shared'
  }
})
```

定义外部样式类：

```js
Component({
  externalClasses: ['my-class']
})
```

在页面中使用这些外部样式类：

`<custom-component class="my-class">这段文本的颜色由组件外的 class 决定</custom-component>`

**注意事项**

样式隔离：确保在使用全局变量时，考虑到样式隔离的影响，避免不同页面或组件之间的样式冲突。   
版本兼容性：某些功能（如 styleIsolation）可能需要特定版本的基础库支持，请确保你的小程序基础库版本符合要求。    
通过以上方法，你可以在微信小程序中有效地管理和使用全局CSS变量，从而提高样式的灵活性和可维护性。   


## 小程序UI库

Vant Weapp.  
Lin UI.  
ColorUI.   

