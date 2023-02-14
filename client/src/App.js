import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';




function App() {

 

  const [main_ip,setIP] = useState('');
  const [data,setData] = useState([])
  const [ipList,setIpList] = useState([])

  
    
  //creating function to load ip address from the API
  const getData = async()=>{
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
    const res2 = await axios.get('http://localhost:8081/api/values')
    // const temp = res2.data
    // console.log("Got data "+temp)
    // setData(temp)
    let flag=true
    for(let temp=0;temp< res2.data.length;temp++){
      const ip = res2.data[temp].ip
      const count = res2.data[temp].count
      console.log("in for, got data "+ip+" "+count+" main ip: "+res.data.IPv4)
        if(ip===res.data.IPv4){
            axios.post('http://localhost:8081/api/updatevalue',{"ip":ip,"count":count+1})
            res2.data[temp].count = res2.data[temp].count +1
            flag=false
            break
        }
    }
    setData(res2.data)
    if(flag){
      axios.post('http://localhost:8081/api/setvalue',{"ip":res.data.IPv4,"count":1})
      setData([{ip:res.data.IPv4,count:1}])
    }
  }
    
  useEffect(()=>{
      //passing getData method to the lifecycle method
      console.log("getData useffect");
      getData()// eslint-disable-next-line
  },[])
    
  
  const renderValues = ()=>{
    const entries = []
    console.log("renderValues data is "+data)
    for(let temp=0;temp< data.length;temp++){
      const ip = data[temp].ip
      const count = data[temp].count
      entries.push(
        <div key={ip}>
            IP: {ip} Visited {count} times
        </div>
    )
    }
    setIpList(entries)
  }
   
  useEffect(()=>{
    console.log("renderValues useffect");
    if(data.length>0){
      renderValues()
    }
  },[data.length,data[0]])

 

  return (
    <div className="App">
      <header className="App-header">
        <p>Visits Chart</p>
        {ipList}
     <p>Your ip {main_ip}</p>
      </header>
    </div>
  );
}

export default App;
