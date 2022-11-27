import {Table} from 'antd'
import { Anchor } from 'antd';
const { Link } = Anchor;

const CrawlResultTableComponent = ({ results }) => {

  const columns = [
    {
      title: 'Job ID',
      dataIndex: 'job_id',
      key: 'job_id',
    },
    {
      title: 'Result Id',
      dataIndex: 'result_id',
      key: 'job_id',
    },
    {
      title: 'Product Title',
      dataIndex: 'title',
      key: 'job_id',
    },
    {
      title: 'Product Brand',
      dataIndex: 'brand',
      key: 'job_id',
    },
    {
      title: 'Product Image',
      dataIndex: 'image_url',
      key: 'job_id',
      render: (_, { image_url, title}) => {
        return (
          <Link href={image_url} title={title} target={"_blank"}/>
        )
      }
    },
  ];
  return <Table dataSource={results} columns={columns} pagination={{position: ['topLeft', 'bottomRight'],}} size={"middle"} sticky={true} scroll={{ y: 300, x: '100vw' }}/>;
}

export default CrawlResultTableComponent;