
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
export default function App() {  
  // https://jsonplaceholder.typicode.com/users
  // 1) Show api data in table
  // 2) Add Search input and filter table data by Name, tyr to use the usMemo

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [usersFiltered, setUsersFiltered] = useState([]);

  useEffect(() => {
    const dataFetch = async() => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setUsersFiltered(response.data);
        
      } catch (error) {
        console.error(error);
      }
    }

    dataFetch();
  }, []);

  const inputSearch = (event) => {
    const val = event.target.value;

    const filteredSearch = users.filter(user => 
      user.name.toLowerCase().includes(val.toLowerCase())
    );

    setUsersFiltered(filteredSearch);

    setSearch(val);    
  }

  return (
    <div className="App">
      <input onChange={inputSearch} value={search} />
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>City</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
        {usersFiltered.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.company.name}</td>
            <td>{user.address.city}</td>
            <td>{user.website}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
