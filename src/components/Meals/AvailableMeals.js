import { useState,useEffect } from 'react';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';

const AvailableMeals = () => {
    const [mealsData, setMealsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMeals = async () => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://dummy-api-c9a0e-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Could not fetch data');
            }
            const data = await response.json();
            let fetchedMeals = [];

            for (const mealKey in data)
            {
                fetchedMeals.push({
                    id: mealKey,
                    name: data[mealKey].name,
                    description: data[mealKey].description,
                    price: data[mealKey].price
                });
            }

            setMealsData(fetchedMeals);
        }
        catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchMeals();
    },[])

    let meals = <p>We are not serving at the moment!</p>

    if (mealsData.length > 0) {
        meals = mealsData.map(meal => <MealItem key={meal.id} description={meal.description} name={meal.name} price={meal.price} id={meal.id} />);
    }

    if (isLoading) {
        meals = <p>Fetching meals, please wait...</p>
    }

    if (error) {
        meals = <p>{error}</p>
    }

    return (<Card className={styles.meals}>
        <ul>
            {meals}
        </ul>
    </Card>);
}

export default AvailableMeals;