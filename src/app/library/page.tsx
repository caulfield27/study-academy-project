
import styles from './page.module.css'
import { books } from "@/store/books/booksTypes";
import BooksModal from "@/components/booksModal/booksModal";
import PostModal from "@/components/postModal/postModal";
import LibraryHeader from "@/components/libraryHeader/libraryHeader";
import { Book } from "@/components/book/book";
import { Wrapper } from '@/components/wrapper/wrapper';
import { fetchData } from '@/utils/api';
import { CircularProgress, circularProgressClasses } from '@mui/material';


const Library = async (
    { searchParams }: { searchParams?: { _search?: string, _page?: string, } }
) => {

    const data = await fetchData(`${process.env.BASED_URL}/api/books?_page=${searchParams?._page??'1'}&_search=${searchParams?._search??''}`)
    return (
        <>
            <BooksModal />
            <Wrapper>
                <div className={styles.library_header}>
                    <h1>Programming books recommended by<br />Humo Academy</h1>

                </div>
                <div className={styles.header_container}>
                    <LibraryHeader pages={data.total} currentPage={searchParams?._page} search={searchParams?._search??''}/>
                    <PostModal/>
                </div>

                <div className={styles.library_container}>
                    {!process.env.BASED_URL ?
                        <CircularProgress/> :
                        data.data.map((book: books) => {
                            return <Book book={book} key={book.id} />
                        })
                    }

                    


                </div>

            </Wrapper>




        </>
    )
}

export default Library;