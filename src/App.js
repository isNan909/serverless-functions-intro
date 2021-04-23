import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchHello = async () => {
    const helloFetch = await fetch(`/functions/hello`);
    const helloTxt = await helloFetch.json();
    setMessage(helloTxt.message);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const encodedName = encodeURIComponent(name);
      const encodedEmail = encodeURIComponent(email);
      const sentEmail = await fetch(
        `/functions/email?name=${encodedName}&email=${encodedEmail}`
      );
      const linkFormat = await sentEmail.json();
      console.log(linkFormat);
      setMailSent(true);
    } catch {
      console.log('Email not sent!');
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
          <h4 className="pb-3">Fill details below to send email.</h4>
          <form onSubmit={handelSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="mb-3">
              <label htmlFor="name-address">Person Name</label>
              <br />
              <input
                id="name-address"
                name="name"
                type="text"
                autoComplete="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name-address">Person Email</label>
              <br />
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="name"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>

            <div>
              <button className="btn btn-primary mt-3" type="submit">
                Send Email
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default App;
