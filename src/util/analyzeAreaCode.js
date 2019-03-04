/**
 * Created by lzb on 2019-01-24.
 */
export function analyzeAreaCode(areaId = '') {
  // 101 01 01 01
  let areaAry = [];
  if (!areaId) return [];
  areaId = areaId + '';
  if (areaId.length > 7) {
    areaAry.unshift(areaId);
  }
  if (areaId.length > 5) {
    areaAry.unshift(areaId.slice(0, 7));
  }
  if (areaId.length > 3) {
    areaAry.unshift(areaId.slice(0, 5));
  }
  if (areaId.length > 0) {
    areaAry.unshift(areaId.slice(0, 3));
  }
  return areaAry.map(area => parseInt(area));
}
