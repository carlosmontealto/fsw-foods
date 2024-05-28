"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar Restaurantes"
        onChange={handleChange}
        className="border-none"
      />
      <Button type="submit" size="icon">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
