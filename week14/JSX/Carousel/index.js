import createElement, { Component } from "../framework";
import styles from "./index.css";

class Carousel extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    const { imgList } = props;
    //  0 - N
    this.current = 0;
    this.maxIndex = imgList.length;
    this.canDrag = true;
    this.imgList = [imgList[imgList.length - 1], ...imgList, imgList[0]];
    this.root = this.render();
  }

  mounted() {
    this.handleMouse();
    // this.handleLoop();
  }

  render() {
    return (
      <div class={styles["wrapper"]}>
        <div
          class={styles["wrapper-img"]}
          style={{
            width: `${this.imgList.length * 400}px`,
            transform: `translate(${(this.current - 1) * 400}px)`,
          }}
        >
          {this.imgList.map((item) => {
            console.log(item);
            return (
              <div
                class={styles["img"]}
                style={{
                  "background-image": `url(${item})`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }

  handleMouse() {
    const dom = this.getDom();
    if (!dom) return;
    const listWrap = dom.childNodes[0];
    listWrap.addEventListener("mousedown", (e) => {
      if (!this.canDrag) return;
      this.canDrag = false;
      const { clientX: startX, clientY: startY } = e;

      const transform = listWrap.style.transform.match(
        /translate\((-?\d+)px\)/
      );
      const transformX = transform ? Number(transform[1]) : 0;
      listWrap.style.transition = "none";

      const move = (e) => {
        const { clientX, clientY } = e;

        const translate = clientX - startX + transformX;
        listWrap.style.transform = `translate(${translate}px)`;
      };

      const up = (e) => {
        const { clientX, clientY } = e;
        listWrap.style.transition = "";
        console.log("transformX:", transformX);
        console.log("transformX:", this.current);
        if (clientX - startX >= 80) {
          this.current -= 1;
        } else if (clientX - startX <= -80) {
          this.current += 1;
        }
        setTimeout(() => {
          listWrap.style.transform = `translate(${
            (-this.current - 1) * 400
          }px)`;
        }, 16);

        listWrap.addEventListener(
          "transitionend",
          (e) => {
            if (this.current < 0 || this.current >= this.maxIndex) {
              listWrap.style.transition = "none";
              setTimeout(() => {
                listWrap.style.transform = `translate(${
                  (-this.current - 1) * 400
                }px)`;
                this.canDrag = true;
              }, 16);
            } else {
              this.canDrag = true;
            }
            this.current = (this.maxIndex + this.current) % this.maxIndex;
          },
          {
            once: true,
          }
        );
        document.removeEventListener("mouseup", up);
        document.removeEventListener("mousemove", move);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  }

  handleStop() {}
  handleLoop() {
    const dom = this.getDom();
    if (!dom) return;
    const listWrap = dom.childNodes[0];

    const handleTransitionEnd = (e) => {
      if (this.current >= this.maxIndex - 1) {
        listWrap.style.transition = "none";
        listWrap.style.transform = `translate(0px)`;
      }
    };

    listWrap.addEventListener("transitionend", handleTransitionEnd);

    const timerId = setInterval(() => {
      this.current = (this.current + 1) % this.maxIndex;
      if (this.current === 0) {
        listWrap.style.transition = "";
      } else {
        listWrap.style.transition = "all 0.3s";
      }

      listWrap.style.transform = `translate(${(-this.current - 1) * 400}px)`;
    }, 2000);

    this.handleStop = () => {
      clearInterval(timerId);
      listWrap.removeEventListener("transitionend", handleTransitionEnd);
    };
  }
}

export default Carousel;
