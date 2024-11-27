"use client";
import AddTack from "@/components/AddTask";
import { Provider } from 'react-redux';
import TodoLish from "@/components/TodoLish";
import { store } from "@/store/store";


export default function Home() {
  return (
    <Provider store={store}>
      <main className="max-w-4xl mx-auto mt-4">
        <TodoLish />
      </main>
    </Provider>

  )
}
