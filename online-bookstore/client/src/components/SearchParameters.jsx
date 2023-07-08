export default function SearchParameters() {
  return (
    <div className="parameters flex items-center px-2">
      <div className="genre">Dropdown Genre</div>
      <div className="publicationDate flex items-center px-1">
        <div className="startDate">
          {/* <label> */}
          From
          <input type="date" id="startDate" />
          {/* </label> */}
        </div>
        <div className="endDate">
          To
          <input type="date" />
        </div>
      </div>

      <button
        onClick={() => {
          var d = String(document.getElementById("startDate").value);
          console.log("--" + d + "--");
        }}
      >
        Filter
      </button>
    </div>
  );
}
