/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import "./CategoryPlaces.css";
import type { Category } from "../../Types/CategoryPlaces.types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCategory } from "../../redux/searchSlice";
const categoryImages: Record<string, string> = {
  apartment:
    "/images/CategoryPlacesImages/2bc92a3c-1c03-4aa6-8cfd-f9173f6324d4.png",

  villa:
    "/images/CategoryPlacesImages/0a8b3e4d-390d-47eb-93c3-ae64c6bb4b7e.png",

  cottage:
    "/images/CategoryPlacesImages/7fc11132-86a5-4851-b27e-807ea3ef73b7.png",

  ecolodge:
    "/images/CategoryPlacesImages/28ab97cf-22f0-4d54-b537-98f52a763a0e.png",

  suite:
    "/images/CategoryPlacesImages/28ab97cf-22f0-4d54-b537-98f52a763a0e.png",

  hotel:
    "/images/CategoryPlacesImages/e48c53a8-f3ee-413f-99ac-10128914c638.png",
};
const CategoryPlaces = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCategoryClick = (categoryId: number) => {
    dispatch(setCategory([categoryId]));
    router.push("/Allresidences");
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/category-list/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.results);
      })
      .catch((error) => {
        console.error("CATEGORY ERROR:", error);
      });
  }, []);
  return (
    <section className="category-places">
      <div className="category-places-container">
        {categories.map((category) => (
          <div
            className="category-item"
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-image">
              <img
                src={categoryImages[category.slug]}
                alt={category.category_name}
              />
            </div>

            <span className="category-title">{category.category_name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPlaces;
