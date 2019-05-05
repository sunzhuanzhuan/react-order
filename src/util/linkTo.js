/**
 * Created by lzb on 2019-01-16.
 */
export const linkTo = (href = '/', type = 'replace') => {
  if (!(/^\//.test(href))) {
    href = '/' + href
  }
  if (process.env.NODE_ENV === 'development') {
    href = process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS + href
  }
  if (type === 'push') {
    window.location.href = href;
  } else if (type === '_blank') {
    let a = document.createElement('a');
    a.href = href
    a.target = type
    let e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    setTimeout(() => {
      a.dispatchEvent(e)
    }, 500);
  } else {
    window.location[type](href);
  }
  return null
}
