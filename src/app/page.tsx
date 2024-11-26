"use client";
import AddTack from "@/components/AddTask";
import { Provider } from 'react-redux';
import TodoLish from "@/components/TodoLish";
import { store } from "@/store/store";


export default function Home() {
  return (
    <Provider store={store}>
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">TODO LISH APP</h1>
          <AddTack />
        </div>
        <TodoLish />
      </main>
    </Provider>

  )
}
