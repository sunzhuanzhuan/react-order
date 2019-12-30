/**
 * Created by lzb on 2019-12-24.
 */
import { createHttpAction } from 'redux-action-extend'
import Interface from '../constants/Interface';
import { createAction } from "redux-actions";

// 资质模糊查询
export const {
  TPQueryQualificationByName,
} = createHttpAction('TPQueryQualificationByName', Interface.attribute.queryQualificationByName, {
  method: 'post'
});


