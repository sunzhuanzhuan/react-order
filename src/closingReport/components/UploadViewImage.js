import React, { Component } from 'react';
import {} from 'antd';
import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';


/**
 * 获取图片详细信息
 * @param src 图片链接
 * @returns {Promise<any>}
 */
function getImageInfos(src) {
  return new Promise((resolve) => {
    let img_url = src;
    // 创建对象
    let img = new window.Image();
    // 改变图片的src
    img.src = img_url;
    // 加载完成执行
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
  });
}

const options = {
  history: false,
  escKey: false,
  closeEl: false,
  captionEl: false,
  shareEl: false,
  tapToClose: false,
  clickToCloseNonZoomable: false,
  pinchToClose: false,
  closeOnScroll: false,
  closeOnVerticalDrag: false,
  modal: false,
  closeElClasses: [],
  fullscreenEl: false,
  focus: false
  //http://photoswipe.com/documentation/options.html
};

export default class UploadViewImage extends Component {
  state = { items: [], loading: true, result: {} };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let data = ['https://zmage.caldis.me/imgSet/childsDream/7.jpg','https://zmage.caldis.me/imgSet/childsDream/6.jpg'];
    this.setState({ result: data });
    const imgList = data || [];
    Promise.all(imgList.map(url => getImageInfos(url))).then(result => {
      let items = result.filter(Boolean).map((img, n) => ({
        src: img.src,
        w: img.width,
        h: img.height,
        title: 'Image ' + n
      }));
      this.setState({
        items,
        loading: false
      });
    });
  }

  render() {
    const { loading } = this.state;
    return loading ? 'loading...' : <main>
      <section className='page-main'>
        <h2>
          数据截图
        </h2>
        <div className='photo-swipe-container'>
          {this.state.items.length ?
            <PhotoSwipe isOpen={true} items={this.state.items} options={options} onClose={this.handleClose}/> : '暂无截图'}
        </div>
      </section>
    </main>;
  }
}
