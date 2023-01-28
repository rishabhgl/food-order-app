import DUMMY_MEALS from "./dummy-meals";
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';

const AvailableMeals = () => {

    const meals = DUMMY_MEALS.map(meal => <MealItem key = {meal.id} description = {meal.description} name = {meal.name} price = {meal.price} />);

    return ( <Card className = {styles.meals}>
        <ul>
            {meals}
        </ul>
    </Card>);
}
 
export default AvailableMeals;