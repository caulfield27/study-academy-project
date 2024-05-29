"use client"
import { useState } from 'react'
import styles from './postModal.module.css'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { books } from '@/store/books/booksTypes'
import Swal from 'sweetalert2'
import { isLInk } from '@/utils/checkValidation'
import { useBooks } from '@/store/books/books'
import { useRouter } from 'next/navigation'
import { postData } from '@/utils/api'

const PostModal = () => {
    const router = useRouter()
    const postModal = useBooks((state)=> state.postModal)
    const setPostModal = useBooks((staet)=> staet.setPostModal)
    const [postedData, setPosterData] = useState<books>({
        name: '',
        author: '',
        image: '',
        pdf: '',
        rating: null,
        released: '',
        description: '',
        id: Date.now()
    })
    const [validation, setValidation] = useState({
        name: false,
        author: false,
        image: false,
        pdf: false,
        rating: false,
        released: false,
        description: false

    })
    function handleDataChange(e: any) {
        setPosterData({ ...postedData, [e.target.name]: e.target.value })

    }

    function handlePost() {
        setPostModal(false)
        Swal.fire({
            text: 'Your book is added to humo library',
            icon: 'success',
            confirmButtonText: 'ok'
        }).then((result) => {
            if (result.isConfirmed) {
                // postData(``, postedData)
            }
        })
        document.body.classList.remove('open_modal')

    }

    const handlePostModal = () => {
        setPostModal(true)
        document.body.classList.add('open_modal')
    }


    function handleModalClose() {
        setPostModal(false)
        document.body.classList.remove('open_modal')
    }

    const isDataComplede = postedData.name.trim() !== '' && postedData.author.trim() !== '' && postedData.image.trim() !== ''
        && postedData.pdf.trim() !== '' && postedData.rating !== null && postedData.released.trim() !== ''
        && postedData.description.trim() !== '' && isLInk(postedData.image) && isLInk(postedData.pdf)
        && postedData.rating < 6;

    return (
        <>
            <Button
                onClick={handlePostModal}
                variant='outlined'
                color='success'>
                ADD YOUR FAVORITE BOOK
            </Button>
            {postModal ?
                <div className={styles.postModal_container}>
                    <div className={styles.postModal_content}>
                        <div className={styles.postModal_header}>

                            <button onClick={handleModalClose}>&#215;</button>

                        </div>

                        <form className={styles.postModal_body} onSubmit={handlePost}>
                            <TextField id="outlined-basic" name="name" label="name" variant="outlined" onChange={handleDataChange}
                                style={{ position: 'relative' }}
                                onFocus={() => setValidation({ ...validation, name: false })}
                                onBlur={() => setValidation({ ...validation, name: true })} />
                            {postedData.name === '' && validation.name &&
                                <span>required field</span>
                            }
                            <TextField id="outlined-basic" name="author" label="author" variant="outlined" onChange={handleDataChange}
                                style={{ position: 'relative' }}
                                onFocus={() => setValidation({ ...validation, author: false })}
                                onBlur={() => setValidation({ ...validation, author: true })} />
                            {postedData.author === '' && validation.author &&
                                <span>required field</span>
                            }
                            <TextField id="outlined-basic" name="image" label="poster src" variant="outlined" onChange={handleDataChange}
                                style={{ position: 'relative' }}
                                onFocus={() => setValidation({ ...validation, image: false })}
                                onBlur={() => setValidation({ ...validation, image: true })}>

                            </TextField>
                            {postedData.image === '' && validation.image &&
                                <span>required field</span>
                            }
                            {postedData.image === '' ? '' : !isLInk(postedData.image) && validation.pdf && <span>field is not link</span>}
                            <TextField id="outlined-basic" name="pdf" label="pdf link" variant="outlined" onChange={handleDataChange}
                                style={{ position: 'relative' }}
                                onFocus={() => setValidation({ ...validation, pdf: false })}
                                onBlur={() => setValidation({ ...validation, pdf: true })} />
                            {postedData.pdf === '' && validation.pdf &&
                                <span>required field</span>
                            }
                            {postedData.pdf === '' ? '' : !isLInk(postedData.pdf) && validation.pdf && <span>field is not link</span>}
                            <TextField type='number' name='rating' id="outlined-basic" label="rating" variant="outlined" onChange={handleDataChange}
                                onFocus={() => setValidation({ ...validation, rating: false })}
                                onBlur={() => setValidation({ ...validation, rating: true })} />
                            {postedData.rating === null && validation.rating &&
                                <span>required field</span>
                            }
                            {postedData.rating === null ? '' :
                                postedData.rating > 5 && validation.rating && <span>rating can&apos;t be higher then 5</span>}
                            <TextField id="outlined-basic" name="released" label="released" variant="outlined" onChange={handleDataChange}
                                onFocus={() => setValidation({ ...validation, released: false })}
                                onBlur={() => setValidation({ ...validation, released: true })} />
                            {postedData.released === '' && validation.released &&
                                <span>required field</span>
                            }
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                name="description"
                                onChange={handleDataChange}
                                defaultValue=""
                                onFocus={() => setValidation({ ...validation, description: false })}
                                onBlur={() => setValidation({ ...validation, description: true })} />
                            {postedData.description === '' && validation.description &&
                                <span>required field</span>
                            }
                            <Button disabled={!isDataComplede} variant='contained' color='success' type='submit'>
                                ADD TO LIBRARY
                            </Button>
                        </form>
                    </div>
                </div>
                : null}
        </>

    )
}

export default PostModal