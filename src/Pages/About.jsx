import React,{useState} from 'react'
function About() {
  const [items, setItems] = useState(
  //   [
  //   {
  //     id: 1,
  //     checked: false,
  //     item: "Uno ci sarà per tutti",
  //   },
  //   {
  //     id: 2,
  //     checked: false,
  //     item: "item 2",
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     item: "Item 3",
  //   },
  // ]
  );

  const handleClick = (id) => {
    //nuovo array creato da elementi di stato
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem('list', JSON.stringify(listItems));
    console.log(`key: ${id}`);
  };

   const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    //Cancellazione dei dati salvati precedentemente in locale
    localStorage.setItem("list", JSON.stringify(listItems));
  };

  return (
    <>
      <main>
        <h1>TO DO LIST</h1>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                onChange={() => handleClick(item.id)}
                checked={item.checked}
              />
              <label
              style={(item.checked) ? {textDecoration: 'line-through'} : null}
              onDoubleClick={() => handleClick(item.id)}>{item.item}</label>
              <button style={{background:'red'}} onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
        ) : (
            <p style={{ marginTop: "2rem", color: "red", fontSize: "30px" }}>
              La tua lista è vuota
            </p>
          )}
      </main>
    </>
  );
}

export default About