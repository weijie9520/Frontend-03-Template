学习笔记

## 作业：为什么 first-letter 可以设置 display: block; float 之类的，而 first-line 不行呢？

1. ::first-letter 是在 layout 之后，确定了一段文字中的第一个文字之后完成的，操作布局时性能开销较小。

2. ::first-line 在某块级元素的第一行应用样式。第一行的长度取决于很多因素，包括元素宽度，文档宽度和文本的文字大小,重新排版消耗性能大。 所以 first-letter 可以设置 display: block; float 之类的，而 first-line 不行。
