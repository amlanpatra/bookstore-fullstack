from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import dao
from fastapi.middleware.cors import CORSMiddleware


dao.executeQuery("drop table books")
dao.executeQuery("drop table users")
dao.executeQuery("drop table cartitems")
dao.createTablesAndAddDummyData()

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"])


@app.get("/api/allbooks")
def get_all():
    return dao.executeQuery("select * from books")


@app.get("/api/search/")
def searchby(query: str):
    return dao.executeQuery(
        f"select * from books where title like '%{query}%' or author like '%{query}%' or category like '%{query}%'"
    )


@app.get("/api/cartitems/")  # ?userid=101
def getUserCartItemIds(userid: int):
    return dao.executeQuery(
        f"select * from books where id in (select distinct bookid from cartitems where userid={userid})"
    )


@app.post("/api/addtocart/")  # ?userid=101&bookid=12
def addItemIdToCart(userid: int, bookid: int):
    # TODO: should remove return ?
    dao.executeQuery(
        f"insert into cartitems (userid, bookid) values ({userid}, {bookid})"
    )


@app.post("/api/removefromcart/")  # ?userid=101&bookid=12
def removeBookIdsFromCart(userid: int, bookid: int):
    # TODO: should remove return ?
    dao.executeQuery(f"delete from cartitems where userid={userid} and bookid={bookid}")


uvicorn.run(app, host="0.0.0.0", port=8080)  # type: ignore
