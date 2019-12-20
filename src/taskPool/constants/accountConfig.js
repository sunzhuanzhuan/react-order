export default {
  auditState: [
    { value: 1, name: "待审核" },
    { value: 2, name: "未通过" },
    { value: 3, name: "已通过" }
  ]
  , estimateState: [
    { value: 1, name: "待评估" },
    { value: 2, name: "已评估" },
  ]
  , estimateGrade: [
    { value: "A", name: "A" },
    { value: "B", name: "B" },
    { value: "C", name: "C" },
    { value: "D", name: "D" },
    { value: "E", name: "E" },

  ]
  , shelfState: [
    { value: 1, name: "上架" },
    { value: 2, name: "下架" },
  ]
  , seckillState: [
    { value: 1, name: "正常" },
    { value: 2, name: "异常" },
  ]
  , biddingState: [
    { value: 1, name: "正常" },
    { value: 2, name: "异常" },
  ],
  genderProportion: [
    { value: 1, name: "男性多" },
    { value: 2, name: "女性多" },
  ],
  isVerified: [
    { value: 1, name: "是" },
    { value: 2, name: "否" },
  ],
}

