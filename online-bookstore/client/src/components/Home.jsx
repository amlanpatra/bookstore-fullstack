import Navbar from "./NavBar";
import Card from "./Card";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:8080/api";

export default function Home({ userId }) {
  const [search, setSearch] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const [cartItemIds, setCartItemIds] = useState([]);

  // changing search keyword will trigger a fetch
  useEffect(() => {
    let timer1 = setTimeout(() => {
      setSearch(true);

      if (searchKey.length == 0) {
        fetch(`${apiUrl}/allbooks`)
          .then((resp) => resp.json())
          .then((jsonArr) => setData(jsonArr))
          .catch((err) => console.log(err));
      } else {
        fetch(`${apiUrl}/search/?query=${searchKey}`)
          .then((resp) => resp.json())
          .then((jsonArr) => setData(jsonArr))
          .catch((err) => console.log(err));
      }
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [searchKey]);

  // getting cartItemIds for once, first time
  useEffect(() => {
    fetch(`${apiUrl}/cartitems/?userid=${userId}`)
      .then((resp) => resp.json())
      .then((jsonArr) => {
        var userCartItemIds = [];
        jsonArr.forEach((e) => userCartItemIds.push(e.id));
        setCartItemIds(userCartItemIds);
      })
      .catch((err) => console.log(err));
  }, []);

  // all details related to the cards
  // card button handler
  const cardButtonOnClickHandler = (id) => {
    if (!cartItemIds.includes(id)) {
      alert("Added to cart!");
      fetch(`${apiUrl}/addtocart/?userid=${userId}&bookid=${id}`, {
        method: "POST",
      }).then((resp) => {
        fetch(`${apiUrl}/cartitems/?userid=${userId}`)
          .then((resp) => resp.json())
          .then((jsonArr) => {
            var userCartItemIds = [];
            jsonArr.forEach((e) => userCartItemIds.push(e.id));
            setCartItemIds(userCartItemIds);
          })
          .catch((err) => console.log(err));
      });
    } else {
      // implies already, added to cart, so redirecting to /cart
      // window.location.replace(window.location.hostname + "/cart");
      window.location.replace("/cart");
    }
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
        buttonText={
          cartItemIds.includes(singleCard.id)
            ? "In Cart -> Go to Cart"
            : "Add to cart"
        }
        buttonOnClickHandler={() => cardButtonOnClickHandler(singleCard.id)}
      />
    );
  });

  return (
    <div className="dashboard">
      <Navbar setSearchKey={setSearchKey} />
      <div className="flex flex-wrap justify-center">
        {cards}
        <div
          className={`emptyCart grid place-items-center h-screen text-2xl font-extralight`}
        >
          {data.length == 0 ? "Loading books..." : ""}
        </div>
      </div>
    </div>
  );
}
