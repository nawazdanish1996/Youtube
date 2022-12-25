import React, {useEffect, useState} from 'react';

const YtLive = () => {
    const [inpData, setInpData] = useState('');
    const [subs, setSubs] = useState('');
    const [videos, setVideos] = useState('');
    const [views, setViews] = useState('');

    const submitHandler = (e) =>{
        e.preventDefault();
        if(inpData === ""){
            alert("Invalid Input")
        }else{
            alert("Started");
            const interval = setInterval(()=>{
                // fetch method
                fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${inpData}&key=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    console.log("Subscribers "+result.items[0].statistics.subscriberCount);
                    console.log("Videos "+result.items[0].statistics.videoCount);
                    console.log("Views "+result.items[0].statistics.viewCount);
                    setSubs(result.items[0].statistics.subscriberCount);
                    setVideos(result.items[0].statistics.videoCount);
                    setViews(result.items[0].statistics.viewCount);
                    // console.log(result);
                })
            }, 1000);
            return () => clearInterval(interval);
        }
    }

    useEffect(()=>{
    })

  return (
    <div className='pt-5'>
    <div className='container bg-secondary pt-3'>
        <div className="row">
            <div className="col-md-12 text-white">
                <h1>YouTube Data API using React</h1>
            </div>

            <div className="col-md-4"></div>
            <div className="col-md-4 mt-5">
                <form onSubmit={submitHandler}>
                    <div className="input-group w-100">
                        <input onChange={(e)=> setInpData(e.target.value)} value={inpData} placeholder='Search...' className="form-control" />
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-md-4"></div>

            <div className="col-md-12 mt-5 pt-4 bg-dark">
                <h2 className='text-white'>Subscribers</h2>
                <h3 className='text-secondary'>{subs < 0 ? '0'+subs : subs === "" ? '0': subs}</h3>
            </div>
            <div className="col-md-6 lg-6 sm-6 sx-12 bg-dark">
                <h2 className='text-white'>Total Views</h2>
                <h3 className='text-secondary'>{views < 0 ? '0'+views : views === "" ? '0': views}</h3>
            </div>
            <div className="col-md-6 lg-6 sm-6 sx-12 bg-dark">
                <h2 className='text-white'>Videos Uploaded</h2>
                <h3 className='text-secondary'>{videos < 0 ? '0'+videos : videos === "" ? '0': videos}</h3>
            </div>


            <div className="col-md-12 bg-dark p-4">
                <p className='text-white'>
                    Subscribe to my Channel: <button className='btn btn-success'><a href="wsef" target='_blank'>yjuy</a></button>
                </p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default YtLive;