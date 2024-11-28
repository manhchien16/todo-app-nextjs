// pages/api/auth/login.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Đọc dữ liệu từ file db.json
const getUsersFromFile = () => {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData).users;
};

// API đăng nhập
export async function POST(request: Request) {
    const { email, password } = await request.json();

    const users = getUsersFromFile(); // Đọc dữ liệu users từ db.json
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const accessToken = jwt.sign({ id: user.id }, "secret-key", { expiresIn: "1h" });
    return NextResponse.json({ accessToken, user });
}