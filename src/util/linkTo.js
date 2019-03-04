/**
 * Created by lzb on 2019-01-16.
 */
export const linkTo = (href = '/') => {
  if(!(/^\//.test(href))){
    href = '/' + href
  }
  if (process.env.NODE_ENV === 'development') {
    window.location.replace(process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS + href);
  } else {
    window.location.replace(href);
  }
}
