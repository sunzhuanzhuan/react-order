/**
 * Created by lzb on 2019-01-16.
 */
export const linkTo = (href = '/', type = 'replace') => {
  if (!(/^\//.test(href))) {
    href = '/' + href
  }
  if (process.env.NODE_ENV === 'development') {
    window.location[type](process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS + href);
  } else {
    window.location[type](href);
  }
}
