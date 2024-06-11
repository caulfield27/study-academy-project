"use client"
import '../../app/globals.css'
import { books } from "@/store/books/booksTypes"
import styles from './book.module.css'
import { Button } from "@mui/material"
import { useBooks } from "@/store/books/books"
import { useTheme } from '@/store/global/theme'


export const Book = ({ book }: { book: books, }) => {

    const setCurrentBook = useBooks((state) => state.setCurrentBook)
    const booksModal = useBooks((state) => state.booksModal)
    const setBooksModal = useBooks((state) => state.setBooksModal)
    const theme = useTheme((state)=> state.theme)

    function handleRead(e: any) {
        window.open(e.target.value, '_blank')
    }

    function handleModal(books: books) {

        setBooksModal(true)
        setCurrentBook(books)
        document.body.classList.add('open_modal')

    }


    return (
        <>
            <div className={styles.book_card}>
                <img src={book.image} alt={book.name} />
                <div className={styles.card_content}>
                    <div className={styles.card_text}>
                        <span className={styles.name}>{book.name}</span>
                        <span className={styles.author}>{book.author}</span>
                    </div>
                    <div className={styles.card_button}>
                        <Button
                            value={book.pdf}
                            onClick={handleRead}
                            variant={!theme ? `outlined` : 'contained'}
                            color='success'>
                            read
                        </Button>
                        <Button
                            onClick={() => handleModal(book)}
                            variant={!theme ? `outlined` : 'contained'}
                            color='primary'>
                            show more
                        </Button>
                    </div>
                </div>
            </div>
        </>

    )
}