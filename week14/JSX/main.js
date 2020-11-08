import createElement, { Component } from "./framework";
import Carousel from "./Carousel";

// class Div extends Component {
//   render() {
//     console.log(this);
//     return <div></div>;
//   }
// }

// class Col extends Component {
//   render() {
//     const { span } = this.props;
//     return <p class={span}>时代峻峰苦上加苦</p>;
//   }
// }

// function Div() {
//   return <div></div>;
// }
// const a = (
//   <Div id="1">
//     <Col span={1} />
//     <span>1</span>
//     <span>2</span>
//     <span>3</span>
//   </Div>
// );
// document.body.appendChild(a);

// a.mountTo(document.body);

const imgList = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

const b = <Carousel imgList={imgList} />;

b.mountTo(document.body);
