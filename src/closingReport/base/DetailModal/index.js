import React  from 'react';
import DataDetailsModalEdit from '../../containers/DataDetailsModalEdit';
import DataDetailsModalView from '../../containers/DataDetailsModalView';
import DataDetailsModalCheck from '../../containers/DataDetailsModalCheck';

const DetailModal = (props) => {
  let C;
  switch (props.type) {
    case 'edit':
      C = DataDetailsModalEdit;
      break;
    case 'view':
      C = DataDetailsModalView;
      break;
    case 'check':
      C = DataDetailsModalCheck;
      break;
    default :
      return null;
  }
  return props.show && <C {...props} />;
};
export default DetailModal
