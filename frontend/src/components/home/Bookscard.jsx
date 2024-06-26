import BookSinglecard from "./BookSinglecard"

const Bookscard = ({ books }) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {books.map((item) => (
               <BookSinglecard key={item._id} book={item} />
            ))}
        </div>
    )
}
export default Bookscard