学习笔记

### float

1. float 只会会影响其所在高度的其他元素
2. float 元素自身内部的文字会随着 float 元素的偏移而偏移
3. 多个 float 元素会产生堆叠影响， 即后续的 float 元素 ，不会占用其他 float 元素的位置，会自动左右偏移
4. clear: left | rigth; 是让 float 元素找一个干净的空间去排布自身

### margin

1. margin边距折叠（堆叠）， 显示最大的 margin 值， 只会发生在 BFC（block format context）


### Block Container 

1. block
2. inline-block
3. table-cell
4. flex item
5. grid cell
6. table-caption

### Block-level Box

- Block level

1. display:block
2. display:flex
3. display:table
4. display:grid


- Inline level

1. display:inline-block
2. display:inline-flex
3. display:inline-table
4. display:inline-grid

- display: run-in 

继承上一个元素的display 属性

### BFC合并

1. BFC合并后，元素处于同一个上下文，会发生文字环绕float元素的情况，和margin合并的情况
2. 创建BFC有如下方式：

- floats，浮动元素
- absolutly positioned elements ，绝对定位元素
- block containers  
- overflow 非 visible 属性的元素


### flex排版


### 动画（Animation）

- animation-name 时间曲线
- animation-deration 动画时长
- animation-timing-function 动画的时间曲线
- animation-delay 动画开始前的延迟
- animation-iteration-count 动画播放次数
- animation-direction 动画的方向

### Trasition
- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-timing-function 时间曲线
- transition-delay 延迟时间

### 三次贝塞尔曲线
cubic-bezier.com