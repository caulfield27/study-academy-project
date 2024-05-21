
import styles from './page.module.css'
import { books } from "@/store/books/booksTypes";
import BooksModal from "@/components/booksModal/booksModal";
import { getApi } from "@/utils/api";
import PostModal from "@/components/postModal/postModal";
import LibraryHeader from "@/components/libraryHeader/libraryHeader";
import { Book } from "@/components/book/book";
import { Wrapper } from '@/components/wrapper/wrapper';

const Library = async (
    {searchParams}:{searchParams?: {query?: string;_page?: string;}}
) => {
    console.log(searchParams) 
    const data = await getApi(`http://localhost:3001/books?_page=${searchParams?._page ?? '1'}`)

    

    return (
        <>
            <BooksModal />
            <Wrapper>
                <div className={styles.library_header}>
                    <h1>Programming books recommended by<br />Humo Academy</h1>

                </div>
                <div style={{
                    display: "flex", flexDirection: "row", gap: '20px', justifyContent: 'center', alignItems: 'center',
                    marginTop: '65px'
                }}>
                    <LibraryHeader pages={data.items}/>
                    <PostModal page={Number(searchParams?._page)} />
                </div>

                <div className={styles.library_container}>

                    {data.data.map((book: books) => {
                        return <Book book={book} key={book.id} />
                    })}


                </div>

            </Wrapper>
                
           


        </>
    )
}

export default Library;