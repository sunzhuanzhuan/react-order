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
import LoadingWrapped from '@/base/LoadingWrapped';

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  labelAlign: "left",
  colon: false
}
/*[
{
  "id": "culpa",
  "scopeName": "irure labore amet in",
  "isContainsQualifications": "fugiat exercitation amet mollit",
  "qualificationsGroupList": [
    {
      "groupQualificationMappingReqList": [
        {
          "qualificationId": 81924413.69033054,
          "qualificationName": "adipisicing"
        }
      ]
    },
    {
      "groupQualificationMappingReqList": [
        {
          "qualificationId": 67740272.55666697,
          "qualificationName": "proident"
        },
        {
          "qualificationId": 95082469.91043901,
          "qualificationName": "Lorem fugiat id ex"
        },
        {
          "qualificationId": 808148.265889436,
          "qualificationName": "reprehenderit in eu laboris veniam"
        },
        {
          "qualificationId": -44952203.24123279,
          "qualificationName": "deserunt Lorem proident"
        },
        {
          "qualificationId": 59708877.96718669,
          "qualificationName": "in tempor a"
        }
      ]
    },
    {
      "groupQualificationMappingReqList": [
        {
          "qualificationId": 57427188.56540319,
          "qualificationName": "dolore sunt"
        }
      ]
    },
    {
      "groupQualificationMappingReqList": [
        {
          "qualificationId": -66589732.4744714,
          "qualificationName": "voluptate nostrud ad"
        },
        {
          "qualificationId": -59699756.16261789,
          "qualificationName": "Lorem dolor elit enim"
        },
        {
          "qualificationId": 48720158.77379301,
          "qualificationName": "aliqua Excepteur do i"
        },
        {
          "qualificationId": -79829143.32640822,
          "qualificationName": "exercitation"
        }
      ]
    }
  ]
},
  {
    "id": "ullamco sunt tempor",
    "scopeName": "aliqua des",
    "isContainsQualifications": "laborum",
    "qualificationsGroupList": [
      {
        "groupQualificationMappingReqList": [
          {
            "qualificationId": -25028496.972448796,
            "qualificationName": "minim nisi dolore ea"
          },
          {
            "qualificationId": -5086694.918402255,
            "qualificationName": "dolor"
          },
          {
            "qualificationId": -46388125.12494726,
            "qualificationName": "veniam ut cillum velit in"
          },
          {
            "qualificationId": -3198601.56321083,
            "qualificationName": "aute consequat voluptate pariatur"
          }
        ]
      },
      {
        "groupQualificationMappingReqList": [
          {
            "qualificationId": 16419178.385034218,
            "qualificationName": "sed velit Dui"
          }
        ]
      },
      {
        "groupQualificationMappingReqList": [
          {
            "qualificationId": -43989425.8688867,
            "qualificationName": "nulla"
          }
        ]
      },
      {
        "groupQualificationMappingReqList": [
          {
            "qualificationId": 1616418.810274884,
            "qualificationName": "adipisicing"
          }
        ]
      },
      {
        "groupQualificationMappingReqList": [
          {
            "qualificationId": 16904365.917884335,
            "qualificationName": "sit minim qui"
          }
        ]
      }
    ]
  },
  {
    "id": "aliquip nostrud sunt",
    "scopeName": "officia fugiat ex cul",
    "isContainsQualifications": "ad Lorem exercitation qui",
    "qualificationsGroupList": [
      {
        "groupQualificationMappingReqList": [
          {
            "qualificationId": 86256645.53394318,
            "qualificationName": "do"
          },
          {
            "qualificationId": -38459822.20872197,
            "qualificationName": "fugiat"
          }
        ]
      },
      {
        "groupQualificationMappingReqList": [
          {
            "qualificationId": 43905020.53416023,
            "qualificationName": "in aute"
          }
        ]
      }
    ]
  }
]*/

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

// 编辑二级行业
const UpdateIndustryBySecond = (props) => {
  const { getFieldDecorator } = props.form
  const [ scopes, setScopes ] = useState([])
  const [ groups, setGroups ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ details, setDetails ] = useState({})
  const [ detailsLoading, setDetailsLoading ] = useState(true)

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = () => {
    props.actions.TPGetIndustryInfo({ industryId: id }).then(({ data }) => {
      setDetails(data)
      setGroups(data.qualificationsGroupList)
      setScopes(data.businessScopeList)
      setDetailsLoading(false)
    }).catch((err) => {
      setDetailsLoading(err)
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let group = handleGroups(values._groups)
        let scope = handleScopes(values._scopes)
        const body = {
          industryLevel: 2,
          industryName: values.industryName,
          parentId: id,
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
    <LoadingWrapped loading={detailsLoading}>
      <h3>编辑二级行业</h3>
      <Form {...formLayout} className='task-pool-page-container update-attribute-page'
            onSubmit={handleSubmit}>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;一级行业名称</span>}>
          {details.parentName}
        </Form.Item>
        <Form.Item label="二级行业名称">
          {
            getFieldDecorator(`industryName`,
              {
                initialValue: details.industryName,
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
        <Form.Item label=' '>
          <Button type="primary" htmlType="submit" loading={loading}>确定</Button>
        </Form.Item>
      </Form>
    </LoadingWrapped>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UpdateIndustryBySecond));
