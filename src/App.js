import './App.css';
import CrawlQueueChartComponent from "./components/crawl-queue-chart/crawl-queue-chart.component";
import {useState, useEffect} from "react";
import axios from "axios";
import QueueStatus from "./constants/queue-status";

const App = () => {
    const [queueJobs, setQueueJobs] = useState({
        enqueuedJobs: [],
        in_progressJobs: [],
        completedJobs: [],
        failedJobs: []
    });
    console.log('render', queueJobs);

    const getQueueStatus = () => Object.values(QueueStatus);

    const getQueueStatusCalls = (QueueStatues = []) => QueueStatues.map((status) => {
        const getQueueByStatusAPI = `http://localhost:5000/jobs/${status}`;
        return axios.get(getQueueByStatusAPI);
    });

    const fetchQueueJobs = async () => {
        const [{data: {jobs: enqueuedJobs}}, {data: {jobs: in_progressJobs}}, {data: {jobs: completedJobs}}, {data: {jobs: failedJobs}}] = await Promise.all(getQueueStatusCalls(getQueueStatus()));
        const jobs = {enqueuedJobs, in_progressJobs, completedJobs, failedJobs};
        setQueueJobs(jobs);
    }

    useEffect(() => {
        fetchQueueJobs();
        const fetchQueueJobsInterval = setInterval(() => {
            fetchQueueJobs();
        }, 1500);
        return () => {
            clearInterval(fetchQueueJobsInterval);
        }
    }, []);

    const randomJobsEnqueueClickHandler = async () => {
        console.log('Random API');
        await axios.get('http://localhost:5000/random/enqueued');
        return fetchQueueJobs();
    }

    return (
        <div className="App">
            <h1>Live Crawl Queue</h1>
            <button
                className='random-enqueuedJobs-button'
                onClick={randomJobsEnqueueClickHandler}>
                Enqueue Random Jobs
            </button>
            <div className='queue-overview-chart'>
                <CrawlQueueChartComponent enqueuedJobs={queueJobs.enqueuedJobs}
                                          in_progressJobs={queueJobs.in_progressJobs}
                                          completedJobs={queueJobs.completedJobs}
                                          failedJobs={queueJobs.failedJobs}/>
            </div>
        </div>
    );
}

export default App;
