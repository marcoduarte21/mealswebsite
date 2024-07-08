interface RecipesProps {
  children: React.ReactNode;
}

export const Recipes: React.FC<RecipesProps> = ({ children }) => {
  return (
    <section>
      <h3 className="titleContainers" id="titleRecipes">
        <i className="fa-solid fa-utensils"></i> Recipes
      </h3>
      <div className="recipes">{children}</div>
    </section>
  );
};
