import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetcategoriesQuery,
  useAddcategoryMutation,
  useUpdatecategoryMutation,
  useDeletecategoryMutation,
} from "../../redux/services/categoryproductApi";
import {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/features/counter/cateSlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const { data } = useGetcategoriesQuery();
  const [createCategory] = useAddcategoryMutation();
  const [updateCategoryMutation] = useUpdatecategoryMutation();
  const [deleteCategoryMutation] = useDeletecategoryMutation();

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newCategory = { name: "New Category" }; // Change this to your data structure
    const response = await createCategory(newCategory);
    dispatch(addCategory(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updateCategoryMutation({ id, ...updates });
    dispatch(updateCategory(response));
  };

  const handleDelete = async (id) => {
    await deleteCategoryMutation(id);
    dispatch(deleteCategory(id));
  };
  return <></>;
};

export default CategoryList;
