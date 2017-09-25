import { Base } from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }
  /*首页广告*/
  /*banner图片信息*/
  getBannerData(callback) {
    var that = this;
    var param = {
      url: 'advert',
      sCallback: function (data) {
        data = data;
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Home };