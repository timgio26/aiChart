import { useState } from "react";
import { getRecipeFromAi } from "./Ai";

export default function CookingAI() {
  const [list, setList] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string>("");
  function addToList() {
    if (ingredient.trim() !== "") {
      setList((curState) => [...curState, ingredient]);
      setIngredient("");
    }
  }
  function removeFromList(indexToRemove:number){
    setList((curState) => curState.filter((_,index)=>index!==indexToRemove));
  }
  async function generateRecipe() {
    try {
      const resp = await getRecipeFromAi(list);
      console.log(resp);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("unkown error:", error);
      }
    }
  }
  return (
    <div className="flex gap-1 flex-col px-5">
      <h1 className="text-3xl text-blue-600 text-center py-5">What to Cook</h1>
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="flex gap-1.5 w-full">
          <input
            type="text"
            name=""
            id=""
            placeholder="ingredient"
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
            className="border w-full px-2 rounded border-gray-300"
          />
          <button onClick={addToList} className="rounded bg-green-300 px-2">
            add
          </button>
        </div>
      </div>
      <div>
        <div className="grid text-center grid-cols-2 sm:grid-cols-4">
          {list.map((each,index) => (
            <div className="flex flex-row justify-around" key={index}>
              <span>{each}</span>
              <button onClick={()=>removeFromList(index)}>❌</button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        {list.length > 0 && (
          <button
            className="rounded bg-blue-300 px-2 w-full"
            onClick={generateRecipe}
          >
            generate recipe
          </button>
        )}
      </div>
    </div>
  );
}
