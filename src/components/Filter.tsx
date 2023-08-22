import Select from "react-select";
import { useRouter } from "next/router";

const Filter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  page,
  SSR,
}) => {
  const router = useRouter();

  return (
    <div  className="w-[50%] m-auto my-3">
      <p className="mb-3">filter by category</p>
      <Select
        classNamePrefix="react-select"
        options={categories}
        value={selectedCategory}
        name="category"
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.category_id}
        onChange={(e) => {
          setSelectedCategory(e);
          SSR && router.push(`/SSR?page=${page}&category=${e.category_id}`);
        }}
      />
    </div>
  );
};

export default Filter;
