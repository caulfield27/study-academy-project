import '../../../app/globals.css'
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
import { useTheme } from '@/store/global/theme';
import { setToStorage } from '@/utils/useLocaleStorage';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';



const QuestSidebar = () => {
    const icons = [{logo: <HomeIcon/>},{logo: <LocalLibraryIcon/>},{logo:<QuizIcon/>},
    {logo: <SchoolIcon/>},{logo: <PersonIcon/>},{logo:<LoginIcon/>}]
    const {dropdown, setDropdown} = useBooks((state)=> state)
    const currentPage = usePathname()
    const toggleTheme = useTheme((state)=> state.toggleTheme)
    const theme = useTheme((state)=> state.theme)
    
    const handleTheme = ()=>{
        toggleTheme()
        setToStorage('theme', theme ? 'light' : 'dark')
    }
    
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
                    <button 
                    style={{marginTop:'10px'}}
                    className={!theme ? `${styles.theme_btn}` : `${styles.theme_btn} ${styles.theme_active}`} onClick={handleTheme}>
                        <img className={styles.theme_icon} src="/sun.png" alt="sun" />
                        <img className={styles.theme_icon} src="/moon.png" alt="moon" />
                    </button>
                    <div className={styles.x_wrap}>
                        <button className={styles.x} onClick={() => { setDropdown(false) }}>&#10006;</button>
                    </div>
                </div>

                <div className={styles.sidebar_header} style={{paddingRight: '40px'}}>
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
                    <button className={!theme ? `${styles.theme_btn}` : `${styles.theme_btn} ${styles.theme_active}`} onClick={handleTheme}>
                        <img className={styles.theme_icon} src="/sun.png" alt="sun" />
                        <img className={styles.theme_icon} src="/moon.png" alt="moon" />
                    </button>
                </div>

                    
                
                
            </div>
        </>
     );
}
 
export default QuestSidebar;