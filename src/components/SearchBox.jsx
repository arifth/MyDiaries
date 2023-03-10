import React from "react";
import { Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { WORD_TYPED } from "../redux/searchSlice";

export default function SearchBox() {
  const dispatch = useDispatch();

  return (
    <Input
      variant="filled"
      placeholder="Search note"
      width="90%"
      onChange={(e) => dispatch(WORD_TYPED(e.target.value))}
    />
  );
}
