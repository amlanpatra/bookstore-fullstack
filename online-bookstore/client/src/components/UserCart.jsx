import Card from "./Card";
import Navbar from "./NavBar";
import { useState, useEffect } from "react";

const apiUrl = "http://localhost:8080/api";

export default function UserCart({ userId }) {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // getting cartItemIds for once, first time
  useEffect(() => {
    fetch(`${apiUrl}/cartitems/?userid=${userId}`)
      .then((resp) => resp.json())
      .then((jsonArr) => {
        var userCartItems = [];
        jsonArr.forEach((e) => userCartItems.push(e));
        setData(userCartItems);
        setDataLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // all details related to the cards
  // card button handler
  const removeFromCartHandler = (id) => {
    // if (!cartItemIds.includes(id)) {
    if (window.confirm("Remove item from cart?") == false) return;
    fetch(`${apiUrl}/removefromcart/?userid=${userId}&bookid=${id}`, {
      method: "POST",
    }).then((resp) => {
      fetch(`${apiUrl}/cartitems/?userid=${userId}`)
        .then((resp) => resp.json())
        .then((jsonArr) => {
          var userCartItems = [];
          jsonArr.forEach((e) => userCartItems.push(e.id));
          setData(userCartItems);
        })
        .catch((err) => console.log(err));
    });
  };

  const cards = data.map((singleCard, index) => {
    return (
      <Card
        key={index}
        id={singleCard.id}
        title={singleCard.title}
        author={singleCard.author}
        description={singleCard.description}
        cover_image={singleCard.cover_image}
        price={singleCard.price}
        rating={singleCard.rating}
        category={singleCard.category}
        genre={singleCard.genre}
        publication_date={singleCard.publication_date}
        buttonText={"Remove from Cart"}
        buttonOnClickHandler={() => removeFromCartHandler(singleCard.id)}
      />
    );
  });
  return (
    <div className="cart">
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {cards}
        <div
          className={`emptyCart grid place-items-center h-screen text-2xl font-extralight`}
        >
          {dataLoading
            ? "Loading..."
            : data.length == 0
            ? "Cart is Empty! Visit Book Store to add books"
            : ""}
        </div>
      </div>
    </div>
  );
}
