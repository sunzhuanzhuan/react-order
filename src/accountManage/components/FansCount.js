import React from 'react';
import PropTypes from 'prop-types';
// import { WBYDetailTable } from 'wbyui';
import { Form } from 'antd';
import WBYDetailTable from './detailTable'
const FormItem = Form.Item

const _columns = [
	{
		"title": "真粉率",
		dataIndex: "trueFansRate",
		key: "trueFansRate"
	},
	{
		"title": "snbt",
		dataIndex: "snbt",
		key: "snbt"
	},
	{
		"title": "视频数",
		dataIndex: "mediaCount",
		key: "mediaCount"
	},
	{
		"title": "作品数",
		dataIndex: "mediaCount",
		key: "mediaCount"
	},
	{
		"title": "笔记数",
		dataIndex: "mediaCount",
		key: "mediaCount"
	},
	{
		"title": "直发微博平均评论数",
		dataIndex: "directMediaCommentAvg",
		key: "directMediaCommentAvg"
	},
	{
		"title": "直发微博平均转发数",
		dataIndex: "directMediaRepostAvg",
		key: "directMediaRepostAvg"
	},
	{
		"title": "直发微博平均点赞数",
		dataIndex: "directMediaLikeAv",
		key: "directMediaLikeAv"
	},
	{
		"title": "转发微博平均评论数",
		dataIndex: "indirectMediaCommentAvg",
		key: "indirectMediaCommentAvg"
	},
	{
		"title": "转发微博平均转发数",
		dataIndex: "indirectMediaRepostAvg",
		key: "indirectMediaRepostAvg"
	},
	{
		"title": "转发微博平均点赞数",
		dataIndex: "indirectMediaLikeAv",
		key: "indirectMediaLikeAv"
	},
	{
		"title": "平均点赞数",
		dataIndex: "mediaLikeAvg",
		key: "mediaLikeAvg"
	},
	{
		"title": "视频平均点赞数",
		dataIndex: "mediaLikeAvg",
		key: "mediaLikeAvg"
	},
	{
		"title": "平均评论数",
		dataIndex: "mediaCommentAvg",
		key: "mediaCommentAvg"
	},
	{
		"title": "视频平均评论数",
		dataIndex: "mediaCommentAvg",
		key: "mediaCommentAvg"
	},
	{
		"title": "平均播放数",
		dataIndex: "mediaPlayAvg",
		key: "mediaPlayAvg"
	},
	{
		"title": "平均观看数",
		dataIndex: "mediaPlayAvg",
		key: "mediaPlayAvg"
	},
	{
		"title": "场均观看",
		dataIndex: "mediaPlayAvg",
		key: "mediaPlayAvg"
	},
	{
		"title": "视频平均观看数",
		dataIndex: "mediaPlayAvg",
		key: "mediaPlayAvg"
	},
	{
		"title": "平均收藏数",
		dataIndex: "mediaCollectAvg",
		key: "mediaCollectAvg"
	},
	{
		"title": "平均弹幕数",
		dataIndex: "mediaBarrageAvg",
		key: "mediaBarrageAvg"
	},
	{
		"title": "总被赞数",
		dataIndex: "likeCount",
		key: "likeCount"
	},
	{
		"title": "历史直播数",
		dataIndex: "liveCount",
		key: "liveCount"
	},
	{
		"title": "直播平均观众数",
		dataIndex: "liveOnlineAvg",
		key: "liveOnlineAvg"
	},
	{
		"title": "直播最高观众数",
		dataIndex: "liveOnlineMax",
		key: "liveOnlineMax"
	},
	{
		"title": "多图文第一条平均阅读数",
		dataIndex: "mediaIndex1AvgReadNum",
		key: "mediaIndex1AvgReadNum"
	},
	{
		"title": "多图文第一条平均点赞数",
		dataIndex: "mediaIndex1AvgLikeNum",
		key: "mediaIndex1AvgLikeNum"
	},
	{
		"title": "多图文第二条平均阅读数",
		dataIndex: "mediaIndex2AvgReadNum",
		key: "mediaIndex2AvgReadNum"
	},
	{
		"title": "多图文第二条平均点赞数",
		dataIndex: "mediaIndex2AvgLikeNum",
		key: "mediaIndex2AvgLikeNum"
	},
	{
		"title": "多图文第3-N条平均阅读数",
		dataIndex: "mediaOtherDeSingularAvgReadNum",
		key: "mediaOtherDeSingularAvgReadNum"
	},
	{
		"title": "多图文第3-N条平均点赞数",
		dataIndex: "mediaOtherDeSingularAvgLikeNum",
		key: "mediaOtherDeSingularAvgLikeNum"
	},
	{
		"title": "视频平均分享数",
		dataIndex: "mediaRepostAvg",
		key: "mediaRepostAvg"
	},
	{
		"title": "平均转发数",
		dataIndex: "mediaRepostAvg",
		key: "mediaRepostAvg"
	},
	{
		"title": "视频平均收藏数",
		dataIndex: "mediaCollectAvg",
		key: "mediaCollectAvg"
	},
	{
		"title": "文章平均点赞数",
		dataIndex: "pictureLikeAvg",
		key: "pictureLikeAvg"
	},
	{
		"title": "文章平均收藏数",
		dataIndex: "pictureCollectAvg",
		key: "pictureCollectAvg"
	},
	{
		"title": "文章平均评论数",
		dataIndex: "pictureCommentAvg",
		key: "pictureCommentAvg"
	},
	{
		"title": "最近30条平均阅读数",
		dataIndex: "mediaAvgReadNum",
		key: "mediaAvgReadNum"
	},
	{
		"title": "最近30条平均点赞数",
		dataIndex: "mediaAvgLikeNum",
		key: "mediaAvgLikeNum"
	}
]
const defaultColumnsMap = _columns.reduce((obj, next) => {
	obj[next.title] = next;
	return obj;
}, {});

export const FansCount = (props) => {
	const { formItemLayout, columnsKeys } = props;
	const dataSource = props.data.accountInfo || {};
	const _columns = columnsKeys.map(item => defaultColumnsMap[item]).filter(item => item);
	return <div>
		<FormItem {...formItemLayout} label='统计数据：'>
			<WBYDetailTable dataSource={dataSource} columns={_columns} columnCount={8} />
		</FormItem>
	</div>
}

FansCount.propTypes = {
	columnsKeys: PropTypes.array.isRequired,	//需要显示的统计项
	formItemLayout: PropTypes.object.isRequired,		//layout
	data: PropTypes.shape({
		accountInfo: PropTypes.object.isRequired
	})
}
