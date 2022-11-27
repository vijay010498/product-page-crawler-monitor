import BarChartComponent from "../chart/bar/bar-chart.component";

const CrawlQueueChartComponent = ({enqueuedJobs, in_progressJobs, completedJobs, failedJobs}) => {
  const chartData = [
    {
      jobStatus: 'enqueued',
      totalCount: enqueuedJobs.length,
    },
    {
      jobStatus: 'inProgress',
      totalCount: in_progressJobs.length,
    },
    {
      jobStatus: 'completed',
      totalCount: completedJobs.length,
    },
    {
      jobStatus: 'failed',
      totalCount: failedJobs.length,
    },
  ];

  const patternMap = {
    enqueued: {
      type: 'dot',
      cfg: {
        backgroundColor: 'rgba(117,79,99,0.85)'
      }
    },
    inProgress: {
      type: 'line',
      cfg: {
        backgroundColor: 'rgba(15,225,187,0.88)'
      }
    },
    completed: {
      type: 'square',
      cfg: {
        backgroundColor: 'rgba(93,238,12,0.85)'
      }
    },
    failed: {
      type: 'line',
      cfg: {
        spacing: 6,
        lineWidth: 2,
        rotation: 90,
        backgroundColor: 'rgba(229,7,15,0.85)'
      },
    },
  };

  return <BarChartComponent chartData={chartData} patternMap={patternMap} yField='jobStatus' xField='totalCount'
                            seriesField='jobStatus' bordered={true}/>

}

export default CrawlQueueChartComponent