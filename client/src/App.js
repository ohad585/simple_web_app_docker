import './App.css';
import React,{useState,useEffect} from 'react';
import { useTable } from 'react-table';
import axios from 'axios';




function App() {

  const [ip,setIP] = useState('');
    
    //creating function to load ip address from the API
    const getData = async()=>{
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
    }
    
    useEffect(()=>{
        //passing getData method to the lifecycle method
        getData()
    },[])
    

  const data = React.useMemo(
       () => [
         {
           col1: 'Hello',
           col2: 'World',
         },
         {
           col1: 'react-table',
           col2: 'rocks',
         },
         {
           col1: 'whatever',
           col2: 'you want',
         },
       ],
       []
     )
   
     const columns = React.useMemo(
       () => [
         {
           Header: 'IP',
           accessor: 'col1', // accessor is the "key" in the data
         },
         {
           Header: 'Visits',
           accessor: 'col2',
         },
       ],
       []
     )
   
     const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       rows,
       prepareRow,
     } = useTable({ columns, data })


  return (
    <div className="App">
      <header className="App-header">
        <p>Visits Chart</p>
        
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                //  style={{
                //    borderBottom: 'solid 3px red',
                //    background: 'aliceblue',
                //    color: 'black',
                //    fontWeight: 'bold',
                //  }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                    //  style={{
                    //    padding: '10px',
                    //    border: 'solid 1px gray',
                    //    background: 'papayawhip',
                    //  }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     <p>Your ip {ip}</p>
      </header>
    </div>
  );
}

export default App;
