import { NextResponse } from "next/server";

// Mocked database
const todos = [
    { id: "1", text: "Task 1" },
    { id: "2", text: "Task 2" },
];

export async function GET() {
    return NextResponse.json(todos);
}

export async function POST(request: Request) {
    const { text } = await request.json();
    const newTodo = { id: Date.now().toString(), text };
    todos.push(newTodo);

    return NextResponse.json(newTodo, { status: 201 });
}
