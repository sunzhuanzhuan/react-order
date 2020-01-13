/**
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Input, message } from 'antd';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';
import CertificateGroupsList from '../components/Attribute/CertificateGroupsList';
import BusinessScopesList from '../components/Attribute/BusinessScopesList';
import { useParams, useHistory } from 'react-router-dom'

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  labelAlign: "left",
  colon: false
}

const handleGroups = (_groups = []) => {
  return Object.values(_groups).map(item => {
    return {
      groupQualificationMappingReqList: item.certificates,
      id: item.id
    }
  })
}
const handleScopes = (_scopes = []) => {
  return Object.values(_scopes).map(item => {
    return {
      id: item.id,
      scopeName: item.scopeName,
      qualificationsGroupList: handleGroups(item._groups)
    }
  })
}

// 创建二级行业
const CreateIndustryBySecond = (props) => {
  const { getFieldDecorator } = props.form
  const [ scopes, setScopes ] = useState([])
  const [ groups, setGroups ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const { name, pid } = useParams()
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let group = handleGroups(values._groups)
        let scope = handleScopes(values._scopes)
        const body = {
          industryLevel: 2,
          industryName: values.industryName,
          parentId: pid,
          remark: values.remark,
          businessScopeList: scope,
          qualificationsGroupList: group
        }
        setLoading(true)
        props.actions.TPAddOrUpdateIndustryInfo(body)
          .then(() => {
            message.success("添加成功")
            history.back()
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })
      }
    });
  };
  return (
    <>
      <h3>添加二级行业</h3>
      <Form {...formLayout} className='task-pool-page-container create-attribute-page'
            onSubmit={handleSubmit}>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;一级行业名称</span>}>
          {name}
        </Form.Item>
        <Form.Item label="二级行业名称">
          {
            getFieldDecorator(`industryName`,
              {
                rules: [ { required: true, message: '行业名称不能为空' } ]
              })(
              <Input placeholder='请输入行业名称' />
            )
          }
        </Form.Item>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;所需资质</span>}>
          <CertificateGroupsList
            form={props.form}
            groups={groups}
            search={props.actions.TPQueryQualificationByName}
            fieldPrefix="_groups"
            onChange={d => setGroups(d)}
          />
        </Form.Item>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;经营内容</span>}>
          <BusinessScopesList
            form={props.form}
            search={props.actions.TPQueryQualificationByName}
            fieldPrefix="_scopes"
            scopes={scopes}
            onChange={d => setScopes(d)}
          />
        </Form.Item>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;备注</span>}>
          {getFieldDecorator('remark', {
            rules: []
          })(
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              placeholder="请输入"
            />
          )}
        </Form.Item>
        <Form.Item label=' '>
          <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
        </Form.Item>
      </Form>
    </>
  );
};


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CreateIndustryBySecond));
