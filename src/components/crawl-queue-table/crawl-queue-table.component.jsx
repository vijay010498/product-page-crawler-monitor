import {Table, Tag} from 'antd'
import QueueStatus from "../../constants/queue-status";
import {DateTime} from "luxon";

const CrawlQueueTableComponent = ({queueJobs}) => {
  const jobs = [...queueJobs.enqueuedJobs, ...queueJobs.in_progressJobs, ...queueJobs.completedJobs, ...queueJobs.failedJobs]
  const getStatusColor = (status) => {
    switch (status) {
      case QueueStatus.enqueued:
        return 'blue';
      case QueueStatus.in_progress:
        return 'yellow';
      case QueueStatus.completed:
        return 'green';
      default:
        return 'red';
    }
  }

  const columns = [
    {
      title: 'Job ID',
      dataIndex: 'job_id',
      key: 'job_id',
    },
    {
      title: 'Job Name',
      dataIndex: 'job_name',
      key: 'job_id',
    },
    {
      title: 'Job Status',
      dataIndex: 'status',
      key: 'job_id',
      render: (_, {status}) => {
        const color = getStatusColor(status);
        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        )
      }
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'job_id',
      render: (_, {created_at, status}) => {
        const date = DateTime.fromISO(created_at);
        const color = getStatusColor(status);
        return (
          <Tag color={color}>
            {date.toLocaleString(DateTime.DATE_MED)}
          </Tag>
        )
      }
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'job_id',
      render: (_, {updated_at, status}) => {
        const date = DateTime.fromISO(updated_at);
        const color = getStatusColor(status);
        return (
          <Tag color={color}>
            {date.toLocaleString(DateTime.DATE_MED)}
          </Tag>
        )
      }
    },
    {
      title: 'Lock Status',
      dataIndex: 'locked',
      key: 'job_id',
      render: (_, {locked}) => {
        const color = locked ? 'red' : 'green'
        const displayText = locked ? 'LOCKED' : 'FREE'
        return (
          <Tag color={color}>
            {displayText}
          </Tag>
        )
      }
    },
  ];

  return <Table dataSource={jobs} columns={columns} pagination={{position: ['topLeft', 'bottomRight'],}} size={"small"} sticky={true} scroll={{ y: 300, x: '100vw' }} />;
}

export default CrawlQueueTableComponent