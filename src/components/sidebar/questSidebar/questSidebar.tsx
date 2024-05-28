import styles from '../sidebar.module.css'
import { navLinks } from './questRoutes';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBooks } from '@/store/books/books';


const QuestSidebar = () => {
    const icons = [{logo: <HomeIcon/>},{logo: <LocalLibraryIcon/>},{logo:<QuizIcon/>},
    {logo: <SchoolIcon/>},{logo: <PersonIcon/>},{logo:<LoginIcon/>}]
    const router = useRouter()
    const {dropdown, setDropdown} = useBooks((state)=> state)
    const currentPage = usePathname()
    

    
    return (
        <>  
            
            <div className={styles.sidebar_container}>
                <div className={dropdown ? styles.dropdown_active : styles.dropdown}>
                    {navLinks.map((link, ind) => {
                        const isActive = currentPage === link.path;
                        return <Link key={link.path} className={isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item}
                            href={link.path}>
                            {icons[ind].logo} {link.name}
                        </Link>
                    })}
                    <div className={styles.x_wrap}>
                        <button className={styles.x} onClick={() => { setDropdown(false) }}>&#10006;</button>
                    </div>
                </div>

                <div className={styles.sidebar_header}>
                    <div className={styles.logo_wrap}>
                        <img src='/humoLogo.png' />
                        <h3>Humo Academy</h3>
                    </div>
                    <div className={styles.dropdown_btn} onClick={() => { setDropdown(true) }}>
                        &#9776; Menu
                    </div>


                </div>
                <hr />
                <div className={styles.navigation_wrap}>
                    {navLinks.map((link, key) => {
                        const isActive = currentPage === link.path;
                        return <Link key={link.path} className={isActive ? 
                            `${styles.nav_item} ${styles.active}` : styles.nav_item}
                            href={link.path}>
                            {icons[key].logo}{link.name}
                        </Link>
                    
                    })}
                </div>
            </div>
        </>
     );
}
 
export default QuestSidebar;