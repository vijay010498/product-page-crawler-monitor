import './App.css';
import CrawlQueueChartComponent from "./components/crawl-queue-chart/crawl-queue-chart.component";
import {useState, useEffect} from "react";
import axios from "axios";
import QueueStatus from "./constants/queue-status";
import {Button} from 'antd'
import CrawlQueueTableComponent from "./components/crawl-queue-table/crawl-queue-table.component";
import CrawlResultTableComponent from "./components/crawl-result-table/crawl-result-table.component";

const App = () => {
    const [queueJobs, setQueueJobs] = useState({
        enqueuedJobs: [],
        in_progressJobs: [],
        completedJobs: [],
        failedJobs: []
    });
    const [crawlResults, setCrawlResults] = useState([]);

    console.log('render, App.js', queueJobs);

    const getQueueStatus = () => Object.values(QueueStatus);

    const getQueueStatusCalls = (QueueStatues = []) => QueueStatues.map((status) => {
        const getQueueByStatusAPI = `http://crawling-queue-service:5000/jobs/${status}`;
        return axios.get(getQueueByStatusAPI);
    });

    const fetchQueueJobs = async () => {
        console.log('jobs-api-call')
        const [{data: {jobs: enqueuedJobs}}, {data: {jobs: in_progressJobs}}, {data: {jobs: completedJobs}}, {data: {jobs: failedJobs}}] = await Promise.all(getQueueStatusCalls(getQueueStatus()));
        const jobs = {enqueuedJobs, in_progressJobs, completedJobs, failedJobs};
        setQueueJobs(jobs);
    }

    const fetchCrawlResults = async () => {
        console.log('results-api-call')
        const { data : { results }  } = await axios.get('http://crawling-queue-service:5000/results');
        setCrawlResults(results);
    }

    useEffect(() => {
        console.log('use-effect');
        fetchQueueJobs();
        fetchCrawlResults();

        const fetchQueueJobsInterval = setInterval(() => {
            fetchQueueJobs();
        }, 1200);

        const fetchCrawlResultsInterval = setInterval(() => {
          fetchCrawlResults();
        }, 1500);

        return () => {
            clearInterval(fetchQueueJobsInterval);
            clearInterval(fetchCrawlResultsInterval);
        }
    }, []);

    const randomJobsEnqueueClickHandler = async () => {
        console.log('Random API');
        await axios.get('http://crawling-queue-service:5000/random/enqueued');
        return fetchQueueJobs();
    }

    return (
        <div className="App">
            <h1>Live Crawl Queue</h1>
            <Button
                shape='round'
                size='middle'
                onClick={randomJobsEnqueueClickHandler}>
                Enqueue Random Jobs
            </Button>
            <div className='queue-overview-chart'>
                <CrawlQueueChartComponent enqueuedJobs={queueJobs.enqueuedJobs}
                                          in_progressJobs={queueJobs.in_progressJobs}
                                          completedJobs={queueJobs.completedJobs}
                                          failedJobs={queueJobs.failedJobs}/>
                <h1>Live Queue in Table View</h1>
                <CrawlQueueTableComponent queueJobs={queueJobs}/>
                <h1>Crawled Results</h1>
                <CrawlResultTableComponent results={crawlResults}/>
            </div>
        </div>
    );
}

export default App;
