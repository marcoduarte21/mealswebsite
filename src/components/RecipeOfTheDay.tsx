interface RecipeOfTheDayProps{
    children: any;
}

export const RecipeOfTheDay: React.FC<RecipeOfTheDayProps> = ({children}) =>{

    return (
        <section>
        <div className="recipes">
            {children}
        </div>

    </section>
    );
}