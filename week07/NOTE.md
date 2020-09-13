学习笔记


## 导航类操作

1. node

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

2. Element

- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- perviousElementSibling

## 修改操作

- appendChild
- insertBefore
- removeChild (需要父节点才能删除)
- replaceChild

## 高级操作

- compareDocumentPosition 
- contains 检查元素是否包含的关系
- isEqualNode 两个节点是否完全相同
- isSameNode 两个节点是否为同一个节点
- cloneNode 克隆节点， 如果传入 true 的参数，会将子节点也克隆一份


## 事件

捕获 -> 触发 -> 冒泡

## Range API