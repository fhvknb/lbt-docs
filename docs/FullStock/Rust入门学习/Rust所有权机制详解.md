# Rust所有权机制详解

## 1. 什么是所有权？
- **所有权** 是 Rust 中独特的内存管理方式
- 每个值在 Rust 中都有一个所有者（owner）
- 同一时间一个值只能有一个所有者
- 当所有者离开作用域时，值会被自动释放（内存回收）

## 2. 所有权的核心规则
1. 每个值都有一个所有者
2. 同一时间只能有一个所有者
3. 当所有者离开作用域时值会被自动清理（`drop`）

## 3. 作用域与释放
```rust
{
    let s = String::from("hello"); // s 是 String 类型
    // s 在此有效
} // 作用域结束，s 被释放
```
当变量离开作用域时，Rust 自动调用 `drop` 函数释放内存。

## 4. 所有权转移（Move）
```rust
let s1 = String::from("hello");
let s2 = s1; // 所有权转移至 s2

// println!("{}", s1); // 错误：s1 已失效
```
### 转移原因
防止多个指针指向同一内存，避免悬挂指针问题。

## 5. 克隆（Clone）
```rust
let s1 = String::from("hello");
let s2 = s1.clone(); // 深拷贝堆数据

println!("{}", s1); // 有效
println!("{}", s2); // 有效
```

## 6. 栈数据的Copy特性
```rust
let x = 5;
let y = x; // 栈值复制

println!("{}", x); // 有效
println!("{}", y); // 有效
```
### 实现Copy的类型
- 基本类型：`i32`, `f64`, `bool`, `char` 等
- 所有字段都实现Copy的元组
- 实现Drop特性的类型不能自动实现Copy

## 7. 引用与借用
### 不可变引用
```rust
let s1 = String::from("hello");
let len = calculate_length(&s1);

fn calculate_length(s: &String) -> usize {
    s.len()
}
```
### 可变引用
```rust
let mut s = String::from("hello");
change(&mut s);

fn change(s: &mut String) {
    s.push_str(", world");
}
```
### 引用规则
1. 同一时刻只能有一个可变引用或多个不可变引用
2. 引用必须始终有效

## 8. 悬垂引用
```rust
let r;
{
    let x = 5;
    r = &x; // 错误：x离开作用域
}
```

## 9. 切片（Slice）
```rust
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];
```

## 10. 核心优势总结
1. 单一所有权保证内存安全
2. 移动/借用机制管理资源
3. 编译期检查所有权规则
4. 无GC实现高效内存管理