
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createGroceryItem, deleteGroceryItem, getGroceryListAPI, updateGroceryItem } from "../api/grocery";

export const useQueryGetGrocery = () => {
  return useQuery({
    queryKey: ['getGroceryList'],
    queryFn: getGroceryListAPI,
  })
}

export const useMutationCreateGrocery = () => {
  const client: any = useQueryClient()

  return useMutation({
    mutationFn: createGroceryItem,
    onSuccess: () => {
      client.invalidateQueries(['getGroceryList']);
    },
  })
}

export const useMutationEditGrocery = () => {
  const client: any = useQueryClient()

  return useMutation({
    mutationFn: updateGroceryItem,
    onSuccess: () => {
      client.invalidateQueries(['getGroceryList']);
    },
  })
}

export const useMutationDeleteGrocery = () => {
  const client: any = useQueryClient()
  return useMutation({
    mutationFn: deleteGroceryItem,
    onSuccess: () => {
      client.invalidateQueries(['getGroceryList']);
    },
  })
}