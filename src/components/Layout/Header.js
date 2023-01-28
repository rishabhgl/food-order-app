import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import styles from './Header.module.css';
import mealImage from '../../assets/meals.jpg';

const Header = () => {
    return ( <Fragment>
        <header className={styles.header}>
            <h2> Dummy Meals</h2>
            <HeaderCartButton />
        </header>
        <div className={styles['main-image']}>
            <img src={mealImage} alt="Delicious meals, at your doorstep!" />
        </div>
    </Fragment> );
}
 
export default Header;