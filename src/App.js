import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState('');
  const [allGrocery, setAllGrocery] = useState([]);

  const fetchHello = async () => {
    const helloFetch = await fetch(`/functions/hello`);
    const helloTxt = await helloFetch.json();
    setMessage(helloTxt.message);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (items) {
      try {
        await fetch(`/functions/grocery?input=${items}`)
          .then((res) => res.text())
          .then((text) => setAllGrocery([...allGrocery, text]));
        setItems('');
      } catch {
        console.log('Items not added');
      }
    } else {
      console.log('You have not added item name.');
    }
  };

  useEffect(() => {
    fetchHello();
  }, []);

  return (
    <div className="App mt-5">
      <div className="container">
        <h2 className="fw-bold">{message}</h2>
        <section className="grocery-form">
          <h4 className="pb-3">Add some groceries to your list items.</h4>
          <form onSubmit={handelSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="mb-3">
              <label htmlFor="name-address">Grocery Name</label>
              <br />
              <input
                id="name-address"
                name="name"
                type="text"
                autoComplete="name"
                className="form-control"
                value={items}
                onChange={(e) => setItems(e.currentTarget.value)}
              />
            </div>

            <div>
              <button className="btn btn-primary mt-3" type="submit">
                Add Groceries
              </button>
            </div>
          </form>
        </section>
        <section className="grocery-list">
          <ul>
            {allGrocery.map((item, index) => (
              <li key={`${index}`}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
