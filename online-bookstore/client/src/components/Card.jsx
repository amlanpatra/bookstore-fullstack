import { redirect } from "react-router-dom";

export default function Card({
  id,
  title,
  author,
  description,
  cover_image,
  price,
  rating,
  category,
  genre,
  publication_date,
  buttonText,
  buttonOnClickHandler,
}) {
  title = title || "Book Title";
  author = author || "Book author ";
  description =
    description ||
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore praesentium expedita sapiente hic quas, voluptate sint eligendi eaque nisi, delectus, dolore neque quo provident ipsum? Dolore voluptatum a excepturi deserunt";
  cover_image =
    cover_image ||
    "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg";
  price = price || 100;
  rating = rating || 4;
  category = category || "fiction";
  genre = genre || "fiction";
  publication_date = publication_date || "12-Jan-2023";

  return (
    <div className="base">
      <div className="cardLayout w-[200px] h-[300px] m-2 p-2 border-slate-200 border-[0.05rem] rounded-md overflow-hidden bg-slate-300">
        <div className="headers w-[182px] h-[108px] pb-1">
          <div className="title text-lg overflow-hidden font-bold max-h-8">
            {title}
          </div>
          <div className="author text-sm overflow-hidden font-bold max-h-6">
            {author}
          </div>
          <div className="description overflow-hidden text-xs font-thin max-h-12">
            {description}
          </div>
        </div>
        {/* <div className="coverImage overflow-hidden w-[182px] h-[121px]"> */}
        <div className="coverImage">
          <img
            src={cover_image}
            className="object-cover rounded-md w-[182px] h-[121px]"
            alt="cover_image"
          />
        </div>
        <div className="priceAndRating flex px-3 justify-between">
          <div className="price">Rs.{price}</div>
          <div className="category font-light overflow-hidden">{category}</div>
          <div className="rating">{rating}&#9733;</div>
        </div>
        <div className="addToCart">
          <button
            onClick={() => buttonOnClickHandler()}
            className="w-full h-7 item-center rounded-md bg-green-400"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
